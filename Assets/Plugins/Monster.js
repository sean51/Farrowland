#pragma strict 
public class Monster extends Attributes 
{
	var MonsterName : String = "Monster";
 	var health : int = 20;
	var armor : int = 2;
	var speed : int = 2;
	var damage : int = 5;
	var magicDamage : int = 5;
	var isAlive : boolean = true;

	function takeDamage(theDamageTaken : int) 
	{ 
		setHealth(getHealth() - theDamageTaken);
	}
	function DealDamage() : int
	{
		return 0;
	}
	// overrides  the set name in the Attributes script and sets the monsters name.
	function setName(theType : int): String
	{
		//do stuff here.
	}
}