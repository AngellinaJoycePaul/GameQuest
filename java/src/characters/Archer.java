package characters;

/**
 * Archer character - medium health, arrow-based attacks.
 * Demonstrates inheritance, method overriding, and interface implementation.
 */
public class Archer extends Character {

    private int arrows;

    /**
     * Constructor for Archer.
     * @param name archer's name
     */
    public Archer(String name) {
        super(name, 110, 22);
        this.arrows = 30;
    }

    /**
     * Archer-specific attack using arrows.
     * @param target the character being attacked
     */
    @Override
    public void attack(Character target) {
        if (arrows > 0) {
            arrows--;
            System.out.println(getName() + " fires an arrow at " + target.getName()
                    + " for " + baseAttack + " damage!");
            target.setHealth(target.getHealth() - baseAttack);
        } else {
            System.out.println(getName() + " is out of arrows!");
        }
    }

    /**
     * Archer's special ability - Piercing Shot.
     * @param target the character receiving the ability effect
     */
    @Override
    public void useAbility(Character target) {
        System.out.println(getName() + " fires a piercing shot through " + target.getName() + "!");
        target.setHealth(target.getHealth() - (baseAttack + 15));
    }

    /**
     * Returns the name of the Archer's ability.
     */
    @Override
    public String getAbilityName() {
        return "Piercing Shot";
    }
}