// ============================================================
// GAMEQUEST - Web Visualizer (Turn-Based Battle Edition)
// Mirrors Java OOP: Character (abstract), Warrior/Mage/Archer
// subclasses, Ability interface. Includes Web Audio API sound.
// ============================================================

// ============ WEB AUDIO SOUND ENGINE ============
let audioCtx = null;

function ensureAudio() {
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      audioCtx = null;
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playSound(kind) {
  ensureAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const gain = audioCtx.createGain();
  gain.connect(audioCtx.destination);

  switch (kind) {
    case "sword": {
      const osc = audioCtx.createOscillator();
      osc.type = "square";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.15);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.2);
      break;
    }
    case "magic": {
      const osc = audioCtx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.35);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.4);
      break;
    }
    case "arrow": {
      const osc = audioCtx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.12);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.15);
      break;
    }
    case "ability": {
      const osc1 = audioCtx.createOscillator();
      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(200, now);
      osc1.frequency.exponentialRampToValueAtTime(800, now + 0.3);
      const osc2 = audioCtx.createOscillator();
      osc2.type = "square";
      osc2.frequency.setValueAtTime(400, now);
      osc2.frequency.exponentialRampToValueAtTime(1600, now + 0.3);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc1.connect(gain);
      osc2.connect(gain);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.5);
      osc2.stop(now + 0.5);
      break;
    }
    case "victory": {
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.15);
        g.gain.setValueAtTime(0.2, now + i * 0.15);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.4);
        osc.connect(g);
        g.connect(audioCtx.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.4);
      });
      break;
    }
    case "defeat": {
      const osc = audioCtx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.6);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
      osc.connect(gain);
      osc.start(now);
      osc.stop(now + 0.7);
      break;
    }
  }
}

// ============ CHARACTER (abstract base) ============
class Character {
  constructor(name, health, baseAttack, type) {
    if (new.target === Character) {
      throw new Error("Cannot instantiate abstract Character class directly");
    }
    this._name = name;
    this._health = health;
    this._maxHealth = health;
    this._baseAttack = baseAttack;
    this._type = type;
    Character._totalCharacters++;
  }
  get name() { return this._name; }
  get health() { return this._health; }
  get maxHealth() { return this._maxHealth; }
  get baseAttack() { return this._baseAttack; }
  get type() { return this._type; }
  setHealth(v) { this._health = Math.max(0, v); }
  attack(target) { throw new Error("attack() must be implemented"); }
  useAbility(target) { throw new Error("useAbility() must be implemented"); }
  getAbilityName() { throw new Error("getAbilityName() must be implemented"); }
  displayCharacterType() { return this._type; }
  displayStats(prefix = "") {
    return `${prefix}${this._name} | HP: ${this._health}/${this._maxHealth} | ATK: ${this._baseAttack}`;
  }
  static getTotalCharacters() { return Character._totalCharacters; }
}
Character._totalCharacters = 0;

class Warrior extends Character {
  constructor(name) {
    super(name, 150, 25, "Warrior");
    this._rage = 50;
  }
  attack(target) {
    const damage = this._baseAttack + Math.floor(this._rage / 5);
    target.setHealth(target.health - damage);
    return { damage, message: `${this._name} swings a sword at ${target.name} for ${damage} damage!`, sound: "sword" };
  }
  useAbility(target) {
    const damage = this._baseAttack * 2;
    target.setHealth(target.health - damage);
    return { damage, message: `${this._name} enters BERSERK mode! ${damage} damage dealt!`, sound: "ability" };
  }
  getAbilityName() { return "Berserk"; }
}

class Mage extends Character {
  constructor(name) {
    super(name, 100, 20, "Mage");
    this._mana = 120;
  }
  attack(target) {
    const damage = this._baseAttack + 10;
    target.setHealth(target.health - damage);
    return { damage, message: `${this._name} casts Fireball at ${target.name} for ${damage} damage!`, sound: "magic" };
  }
  useAbility(target) {
    if (this._mana >= 50) {
      this._mana -= 50;
      const damage = this._baseAttack * 3;
      target.setHealth(target.health - damage);
      return { damage, message: `${this._name} unleashes METEOR STORM for ${damage} damage!`, sound: "ability" };
    }
    return { damage: 0, message: `${this._name} has insufficient mana!`, sound: null };
  }
  getAbilityName() { return "Meteor Storm"; }
}

class Archer extends Character {
  constructor(name) {
    super(name, 110, 22, "Archer");
    this._arrows = 30;
  }
  attack(target) {
    if (this._arrows > 0) {
      this._arrows--;
      const damage = this._baseAttack;
      target.setHealth(target.health - damage);
      return { damage, message: `${this._name} fires an arrow at ${target.name} for ${damage} damage!`, sound: "arrow" };
    }
    return { damage: 0, message: `${this._name} is out of arrows!`, sound: null };
  }
  useAbility(target) {
    const damage = this._baseAttack + 15;
    target.setHealth(target.health - damage);
    return { damage, message: `${this._name} fires a PIERCING SHOT through ${target.name} for ${damage} damage!`, sound: "ability" };
  }
  getAbilityName() { return "Piercing Shot"; }
}

// ============ GAME STATE ============
const state = {
  party: [],
  selectedType: "Warrior",
  stats: { damage: 0, abilities: 0, attacks: 0 },
  battleOver: false,
  turnInProgress: false,
  playerAttackerIdx: 0,
  playerTargetIdx: 1
};

// ============ INIT ============
function init() {
  state.party.push(new Warrior("Ragnar"));
  state.party.push(new Mage("Elyra"));
  state.party.push(new Archer("Kael"));
  bindEvents();
  renderAll();
  document.body.addEventListener("click", ensureAudio, { once: true });
}

function bindEvents() {
  document.querySelectorAll(".type-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      state.selectedType = btn.dataset.type;
    });
  });
  document.querySelector('.type-btn[data-type="Warrior"]').classList.add("selected");

  document.getElementById("createBtn").addEventListener("click", createCharacter);
  document.getElementById("attackBtn").addEventListener("click", () => performBattle("attack"));
  document.getElementById("abilityBtn").addEventListener("click", () => performBattle("ability"));
  document.getElementById("resetBtn").addEventListener("click", resetBattle);

  document.getElementById("attackerSelect").addEventListener("change", (e) => {
    state.playerAttackerIdx = parseInt(e.target.value);
    updateStageFighters();
  });
  document.getElementById("targetSelect").addEventListener("change", (e) => {
    state.playerTargetIdx = parseInt(e.target.value);
    updateStageFighters();
  });

  document.getElementById("victoryClose").addEventListener("click", () => {
    document.getElementById("victoryOverlay").classList.remove("show");
    resetBattle();
  });
}

// ============ RENDER ============
function renderAll() {
  renderRoster();
  renderDropdowns();
  updateStageFighters();
  renderStats();
}

function renderRoster() {
  const grid = document.getElementById("rosterGrid");
  grid.innerHTML = "";
  state.party.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = `char-card ${c.type.toLowerCase()}`;
    const hpPct = (c.health / c.maxHealth) * 100;
    card.innerHTML = `
      <span class="char-type-tag">${c.type.toUpperCase()}</span>
      <h4 class="char-name">${c.name}</h4>
      <div class="stat-line"><span>HP</span><strong>${c.health}/${c.maxHealth}</strong></div>
      <div class="hp-bar-wrap"><div class="hp-bar" style="width:${hpPct}%"></div></div>
      <div class="stat-line"><span>ATK</span><strong>${c.baseAttack}</strong></div>
      <div class="stat-line"><span>Index</span><strong>#${i}</strong></div>
      <span class="ability-tag">✦ ${c.getAbilityName()}</span>
    `;
    card.addEventListener("click", () => {
      if (state.turnInProgress || state.battleOver) return;
      document.getElementById("attackerSelect").value = i;
      state.playerAttackerIdx = i;
      updateStageFighters();
    });
    grid.appendChild(card);
  });
}

function renderDropdowns() {
  const a = document.getElementById("attackerSelect");
  const t = document.getElementById("targetSelect");
  a.innerHTML = "";
  t.innerHTML = "";
  state.party.forEach((c, i) => {
    const optA = document.createElement("option");
    optA.value = i;
    optA.textContent = `${c.name} (${c.type})`;
    a.appendChild(optA);
    const optT = document.createElement("option");
    optT.value = i;
    optT.textContent = `${c.name} (${c.type})`;
    t.appendChild(optT);
  });
  a.value = state.playerAttackerIdx;
  t.value = state.playerTargetIdx;
}

function spriteHTML(type) {
  const t = type.toLowerCase();
  return `
    <div class="sprite ${t}">
      <div class="head"></div>
      <div class="body"></div>
      <div class="arm left"></div>
      <div class="arm right"></div>
      <div class="leg left"></div>
      <div class="leg right"></div>
    </div>
  `;
}

function updateStageFighters() {
  const aIdx = state.playerAttackerIdx;
  const tIdx = state.playerTargetIdx;
  const attacker = state.party[aIdx];
  const target = state.party[tIdx];

  document.getElementById("spriteLeft").innerHTML = attacker ? spriteHTML(attacker.type) : '<div class="placeholder">No fighter</div>';
  document.getElementById("spriteRight").innerHTML = target ? spriteHTML(target.type) : '<div class="placeholder">No fighter</div>';

  document.getElementById("nameLeft").textContent = attacker ? attacker.name : "—";
  document.getElementById("nameRight").textContent = target ? target.name : "—";

  document.getElementById("statsLeft").textContent = attacker
    ? `HP ${attacker.health}/${attacker.maxHealth} • ATK ${attacker.baseAttack}`
    : "HP — / —";
  document.getElementById("statsRight").textContent = target
    ? `HP ${target.health}/${target.maxHealth} • ATK ${target.baseAttack}`
    : "HP — / —";

  document.getElementById("hpLeft").style.width = attacker ? `${(attacker.health / attacker.maxHealth) * 100}%` : "0%";
  document.getElementById("hpRight").style.width = target ? `${(target.health / target.maxHealth) * 100}%` : "0%";
}

function renderStats() {
  document.getElementById("statTotal").textContent = Character.getTotalCharacters();
  document.getElementById("statDamage").textContent = state.stats.damage;
  document.getElementById("statAbilities").textContent = state.stats.abilities;
  document.getElementById("statAttacks").textContent = state.stats.attacks;
}

function setTurnIndicator(text, isEnemy) {
  const el = document.getElementById("turnIndicator");
  el.textContent = text;
  el.classList.toggle("enemy", !!isEnemy);
}

// ============ CREATE CHARACTER ============
function createCharacter() {
  if (state.turnInProgress) return;
  const nameInput = document.getElementById("newName");
  const name = nameInput.value.trim();
  if (!name) { pushLog("Name cannot be empty!", false); return; }
  if (name.length > 15) { pushLog("Name too long (max 15 characters)!", false); return; }

  try {
    let character;
    switch (state.selectedType) {
      case "Warrior": character = new Warrior(name); break;
      case "Mage":    character = new Mage(name);    break;
      case "Archer":  character = new Archer(name);  break;
      default: throw new Error("Unknown character type");
    }
    state.party.push(character);
    nameInput.value = "";
    pushLog(`✦ ${name} the ${character.type} has joined the quest!`, true);
    renderAll();
  } catch (e) {
    pushLog(`Error: ${e.message}`, false);
  }
}

// ============ BATTLE (TURN-BASED) ============
function performBattle(mode) {
  if (state.battleOver || state.turnInProgress) return;

  const aIdx = state.playerAttackerIdx;
  const tIdx = state.playerTargetIdx;

  if (aIdx === tIdx) { pushLog("A character cannot attack themselves!", false); return; }

  const attacker = state.party[aIdx];
  const target = state.party[tIdx];

  if (!attacker || !target) { pushLog("Invalid selection!", false); return; }
  if (attacker.health <= 0) { pushLog(`${attacker.name} is already defeated!`, false); return; }
  if (target.health <= 0) { pushLog(`${target.name} is already defeated!`, false); return; }

  state.turnInProgress = true;
  setButtonsDisabled(true);
  setTurnIndicator("YOUR TURN", false);

  const result = mode === "attack" ? attacker.attack(target) : attacker.useAbility(target);

  if (mode === "attack") state.stats.attacks++;
  else state.stats.abilities++;
  state.stats.damage += result.damage;

  playSound(result.sound);

  const slotL = document.getElementById("slotLeft");
  const slotR = document.getElementById("slotRight");

  slotL.classList.add("attacking-left");
  if (result.damage > 0) {
    setTimeout(() => {
      triggerImpact();
      slotR.classList.add("hit");
      showFloatingDamage(result.damage, "right");
    }, 200);
  }

  pushLog(result.message, true);
  renderStats();
  renderRoster();
  updateStageFighters();

  if (target.health <= 0) {
    setTimeout(() => {
      slotR.classList.add("defeated");
      playSound("victory");
      setTurnIndicator("VICTORY", false);
      showVictory(attacker.name, target.name, true);
      state.turnInProgress = false;
      setButtonsDisabled(false);
    }, 800);
    return;
  }

  setTimeout(() => {
    slotL.classList.remove("attacking-left");
    slotR.classList.remove("hit");

    setTurnIndicator("ENEMY TURN", true);

    const counterMode = Math.random() < 0.3 ? "ability" : "attack";
    const counterResult = counterMode === "ability"
      ? target.useAbility(attacker)
      : target.attack(attacker);

    if (counterMode === "ability") state.stats.abilities++;
    else state.stats.attacks++;
    state.stats.damage += counterResult.damage;

    playSound(counterResult.sound);

    slotR.classList.add("attacking-right");
    if (counterResult.damage > 0) {
      setTimeout(() => {
        triggerImpact();
        slotL.classList.add("hit");
        showFloatingDamage(counterResult.damage, "left");
      }, 200);
    }

    pushLog(counterResult.message, false);
    renderStats();
    renderRoster();
    updateStageFighters();

    setTimeout(() => {
      slotR.classList.remove("attacking-right");
      slotL.classList.remove("hit");

      if (attacker.health <= 0) {
        slotL.classList.add("defeated");
        playSound("defeat");
        setTurnIndicator("DEFEATED", true);
        showVictory(target.name, attacker.name, false);
        state.turnInProgress = false;
        setButtonsDisabled(false);
        return;
      }

      state.turnInProgress = false;
      setButtonsDisabled(false);
      setTurnIndicator("YOUR TURN", false);
    }, 800);
  }, 1100);
}

function setButtonsDisabled(disabled) {
  document.getElementById("attackBtn").disabled = disabled;
  document.getElementById("abilityBtn").disabled = disabled;
  document.getElementById("resetBtn").disabled = disabled;
  document.getElementById("attackerSelect").disabled = disabled;
  document.getElementById("targetSelect").disabled = disabled;
}

function triggerImpact() {
  const flash = document.getElementById("impactFlash");
  flash.classList.remove("fire");
  void flash.offsetWidth;
  flash.classList.add("fire");
}

function showFloatingDamage(dmg, side) {
  const el = document.getElementById("floatingDmg");
  el.textContent = `-${dmg}`;
  const slot = document.getElementById(side === "left" ? "slotLeft" : "slotRight");
  const rect = slot.getBoundingClientRect();
  el.style.left = (rect.left + rect.width / 2 - 40) + "px";
  el.style.top = (rect.top + 20) + "px";
  el.classList.remove("show");
  void el.offsetWidth;
  el.classList.add("show");
}

function pushLog(message, isPlayer) {
  const log = document.getElementById("battleLog");
  const bubble = document.createElement("div");
  bubble.className = "log-bubble" + (isPlayer ? " player" : "");
  bubble.textContent = message;
  log.appendChild(bubble);
  log.scrollTop = log.scrollHeight;
}

function showVictory(winnerName, loserName, playerWon) {
  state.battleOver = true;
  const titleEl = document.getElementById("victoryTitle");
  const nameEl = document.getElementById("victoryName");

  if (playerWon) {
    titleEl.textContent = "VICTORY";
    titleEl.classList.remove("defeat");
    nameEl.textContent = `${winnerName} has defeated ${loserName}!`;
  } else {
    titleEl.textContent = "DEFEAT";
    titleEl.classList.add("defeat");
    nameEl.textContent = `${loserName} was defeated by ${winnerName}...`;
  }

  document.getElementById("victoryOverlay").classList.add("show");
}

function resetBattle() {
  state.battleOver = false;
  state.turnInProgress = false;
  state.party.forEach(c => c.setHealth(c.maxHealth));
  state.stats = { damage: 0, abilities: 0, attacks: 0 };

  document.querySelectorAll(".fighter-slot").forEach(s => {
    s.classList.remove("defeated", "attacking-left", "attacking-right", "hit");
  });

  document.getElementById("battleLog").innerHTML =
    '<div class="log-bubble">The arena awaits combatants...</div>';

  setTurnIndicator("YOUR TURN", false);
  setButtonsDisabled(false);
  renderAll();
}

window.addEventListener("DOMContentLoaded", init);