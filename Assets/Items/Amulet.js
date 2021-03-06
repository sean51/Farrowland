﻿public class Amulet extends Items 
{
	protected var damage : int;
	protected var speed : int;
	protected var defense : int;
	protected var magic : int;
	
	function Amulet()
	{
		name = "Not Found";
		damage = 0;
		speed = 0;
		defense = 0;
		price = 0;
		tooltip = name+"\nDamage: "+damage+"\nSpeed: "+speed+"\nDefense: "+defense+"\n\nPrice: "+price;
	}
	
	function Amulet(new_name : String, new_damage : int, new_speed : int, new_defense : int, new_magic : int, new_price : int)
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