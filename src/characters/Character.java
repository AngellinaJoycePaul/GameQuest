package characters;

public abstract class Character {

    protected String name;
    protected int health;
    protected int level;

    // Constructor
    public Character(String name, int health, int level) {
        this.name = name;
        this.health = health;
        this.level = level;
    }

    // Method
    public void displayStats() {
        System.out.println("Character: " + name);
        System.out.println("Health: " + health);
        System.out.println("Level: " + level);
    }

    // Abstract method
    public abstract void attack();
}