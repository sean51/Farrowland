#pragma strict 
public class Monster extends Attributes 
{
	var loot_number : int;
	var my_type : monster_type;
	
	function Monster()
	{
		equipped = new Items[6];
		name = "Monster";
		damage = 5;
		health = 20;
		armor = 2;
		speed = 2;
		magic_damage = 5;
		my_type = monster_type.fighter;
	}
	
	function Monster(monster_name : String, monster_loot_number : int, type : monster_type)
	{
		equipped = new Items[6];
		name = monster_name;
		damage = 0;
		health = 0;
		armor = 0;
		speed = 0;
		magic_damage = 0;
		loot_number = monster_loot_number;
		my_type = type;
	}
	
	function Monster(monster_name : String, monster_damage : int,
	 					monster_health : int, monster_armor : int, 
	 					monster_speed : int, monster_magic_damage : int,
	 					monster_loot_number : int, type : monster_type){
	 					
		equipped = new Items[6];
		name = monster_name;
		damage = monster_damage;
		health = monster_health;
		armor = monster_armor;
		speed = monster_speed;
		magic_damage = monster_magic_damage;
		loot_number = monster_loot_number;
		my_type = type;
	}
	
	function Get_Loot_Number() : int
	{
		return loot_number;
	}
	
	function Set_Damage(num : int)
	{
		damage = num;
	}
	function Set_Health(num : int)
	{
		health = num;
	}
	function Set_Armor(num : int)
	{
		armor = num;
	}
	function Set_Speed(num : int)
	{
		speed = num;
	}
	function Set_Magic_Damage(num : int)
	{
		magic_damage = num;
	}
	
	function Get_Type() : monster_type
	{
		return my_type;
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