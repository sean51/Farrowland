#pragma strict 
public class Hero extends Attributes 
{//asd
	var hero_type : int = 0; // used to figure out your stats after choosing the type of character you wish to play as.
	var name : String = "Hero";
	
	////////////////////// Attributes Start
	var max_health = 60;
	var health : int = 60;
	var armor : int = 5;
	var speed : int = 2;
	var damage : int = 5;
	var magic_damage : int = 5;
	////////////////////// Attributes End

	var isAlive : boolean = true;

	function setType(theType : int)
	{
		if(hero_type == 1)//Warrior
		{
			setName(theType);
			Set_Max_Health(90);
			setHealth(90);
			setSpeed(2);
			setArmor(7);
			setDamage(7);
			setMagicDamage(2);
			setAlive(true);
		}
		else if(hero_type == 2)//Ranger
		{
			setName(theType);
			Set_Max_Health(90);
			setHealth(80);
			setSpeed(5);
			setArmor(5);
			setDamage(10);
			setMagicDamage(2);
			setAlive(true);
		}
		else if(hero_type == 3)//Mage
		{
			setName(theType);
			Set_Max_Health(90);
			setHealth(70);
			setSpeed(2);
			setArmor(5);
			setDamage(5);
			setMagicDamage(10);
			setAlive(true);
		} 
	}
	function TakeDamage(theDamageTaken : int) { 
		setHealth( getHealth() - theDamageTaken);
	}
	function DealDamage() 
	{ 
		return 0;
	}
}