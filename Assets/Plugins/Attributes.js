#pragma strict
public class Attributes extends MonoBehaviour{
	var health : int;
	var armor : int;
	var speed : int;
	var damage : int;
	var magicDamage : int;
	var isAlive : boolean;
	// lets you know if the character is alive.
	protected function getAlive(): boolean
	{
		return isAlive;
	}
	protected function getHealth(): int
	{
		return health;
	}
	protected function getArmor(): int 
	{
		return armor;
	}
	protected function getSpeed(): int 
	{
		return speed;
	}
	protected function getDamage(): int 
	{//sadf
		return damage;
	}
	protected function getMagicDamage(): int 
	{
		return magicDamage;
	}
	// set the Character to dead.
	protected function setAlive(theIsAlive : boolean): boolean 
	{
		//return isAlive = theIsAlive;
		return false;
	}
	protected function setHealth(theHealth : int): int 
	{
		//return health = theHealth;
		return 0;
	}
	protected function setArmor(theArmor : int): int 
	{
		//return armor = theArmor;
		return 0;
	}
	protected function setSpeed(theSpeed : int): int 
	{
		//return speed = theSpeed;
		return 0;
	}
	protected function setDamage(theDamage : int): int 
	{
		//return damage = theDamage;
		return 0;
	}
	protected function setMagicDamage(theMagicDamage : int): int 
	{
		//return magicDamage = theMagicDamage;
		return 0;
	}
}