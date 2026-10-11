# ゲームクエスト | GameQuest

RPG Character Builder — Object Oriented Programming Project

Angellina Joyce Paul | U24CS402
Kaadambari M

---

## Overview

GameQuest is a Java-based RPG character system that demonstrates core Object-Oriented Programming concepts through a practical character creation and combat system.

Three character types — Warrior, Mage, and Archer — share a common abstract base and implement a unified ability interface.

---

## Project Structure
```
GameQuest/
├── java/
│   └── src/
│       ├── characters/
│       │   ├── Ability.java        (interface)
│       │   ├── Character.java      (abstract base class)
│       │   ├── Warrior.java
│       │   ├── Mage.java
│       │   └── Archer.java
│       └── main/
│           └── GameQuestApp.java   (entry point)
├── web/                            (live visualizer — coming soon)
└── README.md
```
---

## OOP Concepts Demonstrated
```
| Concept | Implementation |
|---------|----------------|
| Abstraction | abstract class Character |
| Inheritance | Warrior, Mage, Archer extends Character |
| Interface | Ability interface implemented by all characters |
| Encapsulation | Private fields with controlled getters/setters |
| Method Overloading | displayStats() with and without prefix |
| Method Overriding | attack() and useAbility() in each subclass |
| Polymorphism | List<Character> holding different character types |
| Dynamic Method Dispatch | Runtime resolution of overridden methods |
| Static Members | totalCharacters counter |
| Inner Class | Stats inner class inside Character |
| Final Method | displayCharacterType() |
```
---

## How to Compile and Run

From the GameQuest folder:

    javac -d bin java/src/characters/*.java java/src/main/GameQuestApp.java
    java -cp bin main.GameQuestApp

---

## Sample Output
```
    =========================================
          GAMEQUEST - RPG CHARACTER BUILDER
    =========================================

    [Characters Created]
    >> Ragnar | HP: 150 | ATK: 25
    Type: Warrior
    Ability: Berserk

    >> Elyra | HP: 100 | ATK: 20
    Type: Mage
    Ability: Meteor Storm

    >> Kael | HP: 110 | ATK: 22
    Type: Archer
    Ability: Piercing Shot

    Total characters created: 3
```
---

## Team

Angellina Joyce Paul — U24CS402
Kaadambari M

Department of Information Technology
Object Oriented Programming with Java