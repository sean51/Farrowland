﻿public class Weapon extends Items 
{
	private var damage : int;
	var speed : int;
	var defense : int;
	
	function Weapon()
	{
		name = "Not Found";
		damage = 0;
		speed = 0;
		defense = 0;
		price = 0;
		tooltip = name+"\nDamage: "+damage+"\nSpeed: "+speed+"\nDefense: "+defense+"\n\nPrice: "+price;
	}
	
	function Weapon(new_name : String, new_damage : int, new_speed : int)
	{
		name = new_name;
		damage = new_damage;
		speed = new_speed;
		tooltip = name+"\nDamage: "+damage+"\nSpeed: "+speed+"\nDefense: "+defense+"\n\nPrice: "+price;
	}
	
	function Weapon(new_name : String, new_damage : int, new_speed : int, new_defense : int, new_magic : int, new_price : int)
	{
		name = new_name;
		damage = new_damage;
		speed = new_speed;
		defense = new_defense;
		magic = new_magic;
		price = new_price;
		tooltip = name+"\nDamage: "+damage+"\nSpeed: "+speed+"\nDefense: "+defense+"\nMagic: "+magic+"\n\nPrice: "+price;
	}
	
	function Get_Damage() : int
	{
		return damage;
	}
}