package characters;

/**
 * Mage character - lower health, high magic damage.
 * Demonstrates inheritance, method overriding, and interface implementation.
 */
public class Mage extends Character {

    private int mana;

    /**
     * Constructor for Mage.
     * @param name mage's name
     */
    public Mage(String name) {
        super(name, 100, 20);
        this.mana = 120;
    }

    /**
     * Mage-specific attack using fireball magic.
     * @param target the character being attacked
     */
    @Override
    public void attack(Character target) {
        int damage = baseAttack + 10;
        System.out.println(getName() + " casts Fireball at " + target.getName()
                + " for " + damage + " damage!");
        target.setHealth(target.getHealth() - damage);
    }

    /**
     * Mage's special ability - Meteor Storm.
     * Requires 50 mana to cast.
     * @param target the character receiving the ability effect
     */
    @Override
    public void useAbility(Character target) {
        if (mana >= 50) {
            mana -= 50;
            System.out.println(getName() + " casts Meteor Storm!");
            target.setHealth(target.getHealth() - (baseAttack * 3));
        } else {
            System.out.println(getName() + " has insufficient mana!");
        }
    }

    /**
     * Returns the name of the Mage's ability.
     */
    @Override
    public String getAbilityName() {
        return "Meteor Storm";
    }
}