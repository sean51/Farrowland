#pragma strict 
public class Hero extends Attributes 
{
	var heroType : int = 0; // used to figure out your stats after choosing the type of character you wish to play as.
	var name : String = "Hero";
	var health : int = 60;
	var armor : int = 5;
	var speed : int = 2;
	var damage : int = 5;
	var magicDamage : int = 5;
	var isAlive : boolean = true;
	function setType(theType : int)
	{
		if(heroType == 1)//Warrior
		{
			setName(theType);
			setHealth(90);
			setSpeed(2);
			setArmor(7);
			setDamage(7);
			setMagicDamage(2);
			setAlive(true);
		}
		else if(heroType == 2)//Ranger
		{
			setName(theType);
			setHealth(80);
			setSpeed(5);
			setArmor(5);
			setDamage(10);
			setMagicDamage(2);
			setAlive(true);
		}
		else if(heroType == 3)//Mage
		{
			setName(theType);
			setHealth(70);
			setSpeed(2);
			setArmor(5);
			setDamage(5);
			setMagicDamage(10);
			setAlive(true);
		} 
	}
	function takeDamage(theDamageTaken : int) { 
		setHealth( getHealth() - theDamageTaken);
	}
	function DealDamage() 
	{ 
		return 0;
	}
}