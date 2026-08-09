package characters;

/**
 * Represents a Mage character in GameQuest.
 */
public class Mage extends Character implements Ability {

    private int mana;

    /**
     * Constructs a Mage.
     *
     * @param name the mage's name
     * @param health the mage's health
     * @param level the mage's level
     * @param mana the mage's mana
     */
    public Mage(String name, int health, int level, int mana) {
        super(name, health, level);
        this.mana = mana;
    }

    /**
     * Displays Mage-specific details.
     */
    public void displayMageDetails() {
        displayStats();
        System.out.println("Mana: " + mana);
    }

    /**
     * Overrides the attack method from Character.
     */
    @Override
    public void attack() {
        System.out.println(name + " casts a powerful magic spell!");
    }

    /**
     * Implements the Ability interface.
     */
    @Override
    public void useAbility() {
        System.out.println(name + " uses Arcane Blast!");
    }
}