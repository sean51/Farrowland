#pragma strict 
public class Monster extends Attributes 
{
	var loot_number : int;
	
	function Monster()
	{
		equipped = new Items[6];
		name = "Monster";
		damage = 5;
		health = 20;
		armor = 2;
		speed = 2;
		magic_damage = 5;
	}
	
	function Monster(monster_name : String, monster_damage : int,
	 					monster_health : int, monster_armor : int, 
	 					monster_speed : int, monster_magic_damage : int,
	 					monster_loot_number : int){
	 					
		equipped = new Items[6];
		name = monster_name;
		damage = monster_damage;
		health = monster_health;
		armor = monster_armor;
		speed = monster_speed;
		magic_damage = monster_magic_damage;
		loot_number = monster_loot_number;
	}
	
	function Get_Loot_Number() : int
	{
		return loot_number;
	}
	
	function DealDamage() : int
	{
		return damage;
	}
	// overrides  the set name in the Attributes script and sets the monsters name.
	function setName(theType : int): String
	{
		//do stuff here.
	}
}