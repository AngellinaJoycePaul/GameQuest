package characters;

/**
 * Represents a Warrior character in GameQuest.
 */
public class Warrior extends Character implements Ability {

    private int strength;

    /**
     * Constructs a Warrior.
     *
     * @param name the warrior's name
     * @param health the warrior's health
     * @param level the warrior's level
     * @param strength the warrior's strength
     */
    public Warrior(String name, int health, int level, int strength) {
        super(name, health, level);
        this.strength = strength;
    }

    /**
     * Displays Warrior-specific details.
     */
    public void displayWarriorDetails() {
        displayStats();
        System.out.println("Strength: " + strength);
    }

    /**
     * Overrides the attack method from Character.
     */
    @Override
    public void attack() {
        System.out.println(name + " attacks with a powerful sword strike!");
    }

    /**
     * Implements the Ability interface.
     */
    @Override
    public void useAbility() {
        System.out.println(name + " uses Berserker Rage!");
    }
}