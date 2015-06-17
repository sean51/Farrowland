#pragma strict
public class Attributes extends MonoBehaviour{
	var health : int;
	var armor : int;
	var speed : int;
	var damage : int;
	var magicDamage : int;
	var isAlive : boolean;
	// lets you know if the character is alive.
	protected function boolean getAlive(){
		return isAlive;
	}
	protected function int getHealth(){
		return health;
	}
	protected function int getArmor() {
		return armor;
	}
	protected function int getSpeed() {
		return speed;
	}
	protected function int getDamage() {
		return damage;
	}
	protected function int getMagicDamage() {
		return magicDamage;
	}
	// set the Character to dead.
	protected function boolean setAlive(theIsAlive : boolean) {
		return isAlive = theIsAlive;
	}
	protected function int setHealth(theHealth : int) {
		return health = theHealth;
	}
	protected function int setArmor(theArmor : int) {
		return armor = theArmor;
	}
	protected function int setSpeed(theSpeed : int) {
		return speed = theSpeed;
	}
	protected function int setDamage(theDamage : int) {
		return damage = theDamage;
	}
	protected function int setMagicDamage(theMagicDamage : int) {
		return magicDamage = theMagicDamage;
	}
}