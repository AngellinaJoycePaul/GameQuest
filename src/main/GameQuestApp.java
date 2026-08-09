package main;

import characters.Character;
import characters.Warrior;
import characters.Mage;
import characters.Archer;
import characters.Ability;

public class GameQuestApp {

    public static void main(String[] args) {

        // Creating objects
        Warrior warrior = new Warrior("Ragnar", 150, 1, 80);
        Mage mage = new Mage("Elyra", 100, 1, 90);
        Archer archer = new Archer("Kael", 120, 1, 85);

        // Displaying character details
        warrior.displayWarriorDetails();

        // Method Overloading
        System.out.println("\nWarrior stats using overloaded method:");
        warrior.displayStats(true);

        System.out.println();

        mage.displayMageDetails();
        System.out.println();

        archer.displayArcherDetails();
        System.out.println();

        // Objects as Parameters
        warrior.challenge(mage);
        mage.challenge(archer);

        // Returning Objects
        Character selectedOpponent = warrior.selectOpponent(mage);
        System.out.println("Selected opponent: " + selectedOpponent.getName());

        System.out.println();

        // Dynamic Method Dispatch
        Character character;

        character = warrior;
        character.attack();

        character = mage;
        character.attack();

        character = archer;
        character.attack();

        System.out.println();

        // Interface demonstration
        Ability ability;

        ability = warrior;
        ability.useAbility();

        ability = mage;
        ability.useAbility();

        ability = archer;
        ability.useAbility();

        System.out.println();

        // Inner Class demonstration
        System.out.println("Warrior inner class statistics:");
        Character.Stats warriorStats = warrior.getStats();
        warriorStats.display();

        System.out.println();

        // Final method demonstration
        System.out.println("Final method demonstration:");
        warrior.displayCharacterType();
        mage.displayCharacterType();
        archer.displayCharacterType();

        System.out.println();

        // Static member
        System.out.println(
            "Total characters created: " + Character.getTotalCharacters()
        );
    }
}