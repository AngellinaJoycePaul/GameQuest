package main;

import characters.Warrior;
import characters.Mage;
import characters.Archer;
import java.util.ArrayList;
import java.util.List;

/**
 * GameQuest main application.
 * Demonstrates polymorphism, objects as parameters, and dynamic method dispatch.
 *
 * Note: We use fully-qualified names for characters.Character to avoid
 * a naming clash with java.lang.Character.
 */
public class GameQuestApp {

    public static void main(String[] args) {

        System.out.println("=========================================");
        System.out.println("      GAMEQUEST - RPG CHARACTER BUILDER");
        System.out.println("=========================================");

        // Polymorphic list of characters - variable named 'party' to avoid clash
        List<characters.Character> party = new ArrayList<>();

        // Create characters
        characters.Character warrior = new Warrior("Ragnar");
        characters.Character mage = new Mage("Elyra");
        characters.Character archer = new Archer("Kael");

        party.add(warrior);
        party.add(mage);
        party.add(archer);

        // Display all characters - polymorphism in action
        System.out.println("\n[Characters Created]");
        for (characters.Character c : party) {
            c.displayStats(">>");
            c.displayCharacterType();
            System.out.println("Ability: " + c.getAbilityName());
            System.out.println();
        }

        System.out.println("Total characters created: " + characters.Character.getTotalCharacters());

        // Combat demonstration - dynamic method dispatch
        System.out.println("\n[Combat Demonstration]");
        warrior.attack(mage);
        mage.attack(archer);
        archer.attack(warrior);
        warrior.useAbility(mage);

        // Display updated stats
        System.out.println("\n[Updated Stats]");
        for (characters.Character c : party) {
            c.displayStats();
        }

        // Inner class demonstration
        System.out.println("\n[Inner Class Demonstration]");
        Warrior w = (Warrior) warrior;
        Warrior.Stats stats = w.new Stats();
        stats.display();

        // Final method demonstration
        System.out.println("\n[Final Method Demonstration]");
        warrior.displayCharacterType();

        // Static counter demonstration
        System.out.println("\n[Static Counter]");
        System.out.println("Total characters created: " + characters.Character.getTotalCharacters());

        System.out.println("\n[GameQuest Session Complete]");
    }
}