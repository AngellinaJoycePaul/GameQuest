package characters;

/**
 * Warrior character - high health, rage-based attacks.
 * Demonstrates inheritance, method overriding, and interface implementation.
 */
public class Warrior extends Character {

    private int rage;

    /**
     * Constructor for Warrior.
     * @param name warrior's name
     */
    public Warrior(String name) {
        super(name, 150, 25);
        this.rage = 50;
    }

    /**
     * Warrior-specific attack using rage bonus.
     * @param target the character being attacked
     */
    @Override
    public void attack(Character target) {
        int damage = baseAttack + (rage / 5);
        System.out.println(getName() + " swings a sword at " + target.getName()
                + " for " + damage + " damage!");
        target.setHealth(target.getHealth() - damage);
    }

    /**
     * Warrior's special ability - Berserk mode.
     * @param target the character receiving the ability effect
     */
    @Override
    public void useAbility(Character target) {
        System.out.println(getName() + " enters Berserk mode! Massive damage!");
        target.setHealth(target.getHealth() - (baseAttack * 2));
    }

    /**
     * Returns the name of the Warrior's ability.
     */
    @Override
    public String getAbilityName() {
        return "Berserk";
    }
}