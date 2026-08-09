package characters;

/**
 * Represents an Archer character in GameQuest.
 */
public class Archer extends Character implements Ability {

    private int agility;

    /**
     * Constructs an Archer.
     *
     * @param name the archer's name
     * @param health the archer's health
     * @param level the archer's level
     * @param agility the archer's agility
     */
    public Archer(String name, int health, int level, int agility) {
        super(name, health, level);
        this.agility = agility;
    }

    /**
     * Displays Archer-specific details.
     */
    public void displayArcherDetails() {
        displayStats();
        System.out.println("Agility: " + agility);
    }

    /**
     * Overrides the attack method from Character.
     */
    @Override
    public void attack() {
        System.out.println(name + " attacks with a precise arrow shot!");
    }

    /**
     * Implements the Ability interface.
     */
    @Override
    public void useAbility() {
        System.out.println(name + " uses Rain of Arrows!");
    }
}