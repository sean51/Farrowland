#pragma strict
public class Attributes extends MonoBehaviour{
	var name : String;
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
	{
		return damage;
	}
	protected function getMagicDamage(): int 
	{
		return magicDamage;
	}
	protected function setName(theName : int): String
	{
		if(theName == 1)//Warrior
		{
			return "Warrior";
		}
		else if(theName == 2)//Ranger
		{
			return "Ranger";
			
		}
		else if(theName == 3)//Mage
		{
			return "Mage";
		}else
		{
			return "Hero";
		}
	}
	// set the Character to dead or not.
	protected function setAlive(theIsAlive : boolean): boolean 
	{
		isAlive = theIsAlive;
		return isAlive;
	}
	protected function setHealth(theHealth : int): int 
	{
		health = theHealth;
		return health;
	}
	protected function setArmor(theArmor : int): int 
	{
		armor = theArmor;
		return armor;
	}
	protected function setSpeed(theSpeed : int): int 
	{
		speed = theSpeed;
		return speed;
	}
	protected function setDamage(theDamage : int): int 
	{
		damage = theDamage;
		return damage;
	}
	protected function setMagicDamage(theMagicDamage : int): int 
	{
		magicDamage = theMagicDamage;
		return magicDamage;
	}
}