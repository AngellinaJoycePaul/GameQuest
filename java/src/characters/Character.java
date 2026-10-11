package characters;

/**
 * Abstract base class representing a generic GameQuest character.
 * Demonstrates abstraction, encapsulation, static members, and inner classes.
 */
public abstract class Character implements Ability {

    private String name;
    private int health;
    protected int baseAttack;
    private static int totalCharacters = 0;

    /**
     * Inner class demonstrating nested class concept.
     * Displays detailed stats for a character.
     */
    public class Stats {
        public void display() {
            System.out.println("=== " + name + " ===");
            System.out.println("Health     : " + health);
            System.out.println("Base Attack: " + baseAttack);
        }
    }

    /**
     * Constructor initializes a character with name, health, and attack.
     * @param name character's name
     * @param health starting health value
     * @param baseAttack base attack power
     */
    public Character(String name, int health, int baseAttack) {
        this.name = name;
        this.health = health;
        this.baseAttack = baseAttack;
        totalCharacters++;
    }

    /**
     * Abstract method - each subclass must define its own attack behavior.
     * @param target the character being attacked
     */
    public abstract void attack(Character target);

    /**
     * Final method - cannot be overridden by subclasses.
     * Displays the character type.
     */
    public final void displayCharacterType() {
        System.out.println("Type: " + this.getClass().getSimpleName());
    }

    /**
     * Overloaded display method - no parameter version.
     */
    public void displayStats() {
        System.out.println(name + " | HP: " + health + " | ATK: " + baseAttack);
    }

    /**
     * Overloaded display method - with prefix parameter.
     * @param prefix string to prepend to output
     */
    public void displayStats(String prefix) {
        System.out.println(prefix + " " + name + " | HP: " + health + " | ATK: " + baseAttack);
    }

    // Encapsulation - controlled access to private fields
    public String getName() { return name; }
    public int getHealth() { return health; }
    public int getBaseAttack() { return baseAttack; }

    public void setHealth(int health) {
        this.health = Math.max(0, health);
    }

    public static int getTotalCharacters() { return totalCharacters; }
}