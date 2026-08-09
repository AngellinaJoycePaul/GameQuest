package characters;

public class Warrior extends Character {

    private int strength;

    // Constructor
    public Warrior(String name, int health, int level, int strength) {
        super(name, health, level);
        this.strength = strength;
    }

    // Method overriding
    @Override
    public void attack() {
        System.out.println(name + " attacks with a powerful sword strike!");
    }

    // Display warrior details
    public void displayWarriorDetails() {
        displayStats();
        System.out.println("Strength: " + strength);
    }
}