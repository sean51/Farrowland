#pragma strict 
public class Monster extends Attributes 
{//asd

	function Monster()
	{
		name = "Monster";
		damage = 5;
		health = 20;
		armor = 2;
		speed = 2;
		magic_damage = 5;
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