#pragma strict
public class Attributes 
{
	///Item Info Start
	protected var equipped : Items[];
	protected var spells : Items[];
	
	/// Attributes Start
	protected var name : String;
	protected var max_health : int;
	protected var health : int;
	protected var armor : int;
	protected var speed : int;
	protected var damage : int;
	protected var magic_damage : int;
	protected var gold : int;
	protected var is_alive : boolean;
	protected var experience : int;
	protected var level : int;
	
	function Get_Tooltip() : String 
	{
		return "Health: " + health +
				"\nDamage: " + damage +
				"\nArmor: " + armor +
				"\nSpeed: " + speed +
				"\nMagic: " + magic_damage;
	}
	
	function Attributes()
	{
		is_alive = true;
	}
	
	function Get_Name() : String
	{
		return name;
	}
	
	function Get_Speed() : int
	{
		return speed;
	}
	
	function Get_Health() : int
	{
		return health;
	}
	
	function Get_Magic_Damage() : int
	{
		return magic_damage;
	}
	
	function Get_Gold() : int
	{
		return gold;
	}
	
	function Revive()
	{
		health = max_health;
		is_alive = true;
	}
	
	function Take_Damage (the_damage_taken : int)
	{ 
		var modified_damage : int = the_damage_taken;
		if (equipped[4] != null)
		{
			Debug.Log(equipped[4].Get_Name());
			modified_damage -= (equipped[4] as Armor).Get_Armor();
		}
		if (modified_damage < 0)
		{
			modified_damage = 0;
		}
		health -= modified_damage;
		if(health <= 0)
		{
			is_alive = false;
		}
	}
	
	function Get_Alive(): boolean
	{
		return is_alive;
	}
	
	function Get_Damage(): int 
	{
		if (equipped[2] != null)
		{
			return (equipped[2] as Weapon).Get_Damage() + damage;
		}
		else
		{
			return damage;
		}
	}
	
	function Get_Spells() : Items[]
	{
		return spells;
	}
}