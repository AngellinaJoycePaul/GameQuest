package characters;

public class Archer extends Character {

    private int agility;

    // Constructor
    public Archer(String name, int health, int level, int agility) {
        super(name, health, level);
        this.agility = agility;
    }

    // Method overriding
    @Override
    public void attack() {
        System.out.println(name + " attacks with a precise arrow shot!");
    }

    // Display archer details
    public void displayArcherDetails() {
        displayStats();
        System.out.println("Agility: " + agility);
    }
}