package characters;

/**
 * Defines a common ability that every GameQuest character must implement.
 * Demonstrates the use of an interface in Java.
 */
public interface Ability {

    /**
     * Uses the character's special ability on a target.
     * @param target the character receiving the ability effect
     */
    void useAbility(Character target);

    /**
     * Returns the name of the character's special ability.
     * @return ability name as a String
     */
    String getAbilityName();
}