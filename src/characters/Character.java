package characters;

/**
 * Represents the base class for all characters in GameQuest.
 * This abstract class provides common properties and behavior
 * for different character types.
 */
public abstract class Character {

    // Static member shared by all characters
    private static int totalCharacters = 0;

    // Instance variables
    protected String name;
    protected int health;
    protected int level;

    /**
     * Constructs a Character with the given details.
     *
     * @param name the character's name
     * @param health the character's initial health
     * @param level the character's starting level
     */
    public Character(String name, int health, int level) {
        this.name = name;
        this.health = health;
        this.level = level;
        totalCharacters++;
    }

    /**
     * Displays the character's basic statistics.
     */
    public void displayStats() {
        System.out.println("Character: " + name);
        System.out.println("Health: " + health);
        System.out.println("Level: " + level);
    }

    /**
     * Displays character statistics with an option to show the character level.
     *
     * @param showLevel whether to display the level
     */
    public void displayStats(boolean showLevel) {
        System.out.println("Character: " + name);
        System.out.println("Health: " + health);

        if (showLevel) {
            System.out.println("Level: " + level);
        }
    }

    /**
     * Allows this character to challenge another character.
     *
     * @param opponent the character being challenged
     */
    public void challenge(Character opponent) {
        System.out.println(name + " challenges " + opponent.name + " to a battle!");
    }

    /**
     * Selects and returns another character as an opponent.
     *
     * @param opponent the character to select
     * @return the selected opponent
     */
    public Character selectOpponent(Character opponent) {
        System.out.println(name + " selected " + opponent.name + " as an opponent.");
        return opponent;
    }

    /**
     * Returns the name of the character.
     *
     * @return the character's name
     */
    public String getName() {
        return name;
    }

    /**
     * Returns the total number of characters created.
     *
     * @return total number of characters
     */
    public static int getTotalCharacters() {
        return totalCharacters;
    }

    /**
     * Represents the basic statistics of a character.
     * This is an inner class of Character.
     */
    public class Stats {

        /**
         * Displays the character's statistics.
         */
        public void display() {
            System.out.println("Character Stats");
            System.out.println("Name: " + name);
            System.out.println("Health: " + health);
            System.out.println("Level: " + level);
        }
    }

    /**
     * Creates and returns a Stats object for this character.
     *
     * @return the character's Stats object
     */
    public Stats getStats() {
        return new Stats();
    }

    /**
     * Displays a common rule for all GameQuest characters.
     *
     * This method is final, so subclasses cannot override it.
     */
    public final void displayCharacterType() {
        System.out.println(name + " is a GameQuest character.");
    }

    /**
     * Defines the attack behavior for a character.
     * Each subclass must provide its own implementation.
     */
    public abstract void attack();
}