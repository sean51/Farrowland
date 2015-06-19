#pragma strict 
public class Hero extends Attributes 
{//asd
	var hero_type : int = 0; // used to figure out your stats after choosing the type of character you wish to play as.

	function Hero()
	{
		name = "Hero";
		damage = 20;
		health = 60;
		max_health = 60;
		armor = 5;
		speed = 2;
		magic_damage = 5;
	}
	
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

	function DealDamage() 
	{ 
		return 0;
	}
}