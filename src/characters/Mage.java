package characters;

public class Mage extends Character {

    private int mana;

    // Constructor
    public Mage(String name, int health, int level, int mana) {
        super(name, health, level);
        this.mana = mana;
    }

    // Method overriding
    @Override
    public void attack() {
        System.out.println(name + " casts a powerful magic spell!");
    }

    // Display mage details
    public void displayMageDetails() {
        displayStats();
        System.out.println("Mana: " + mana);
    }
}