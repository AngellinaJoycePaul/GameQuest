package main;

import characters.Character;
import characters.Warrior;
import characters.Mage;
import characters.Archer;

public class GameQuestApp {

    public static void main(String[] args) {

        // Creating objects
        Warrior warrior = new Warrior("Ragnar", 150, 1, 80);
        Mage mage = new Mage("Elyra", 100, 1, 90);
        Archer archer = new Archer("Kael", 120, 1, 85);

        // Displaying character details
        warrior.displayWarriorDetails();
        System.out.println();

        mage.displayMageDetails();
        System.out.println();

        archer.displayArcherDetails();
        System.out.println();

        // Dynamic Method Dispatch
        Character character;

        character = warrior;
        character.attack();

        character = mage;
        character.attack();

        character = archer;
        character.attack();
    }
}