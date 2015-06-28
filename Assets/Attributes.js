#pragma strict
public class Attributes {
//asd
	///Item Info Start
	protected var equipped : Items[];
	protected var spells : Items[];
	///Item Info End
	
	/// Attributes Start
	var name : String;
	var max_health : int;
	var health : int;
	var armor : int;
	var speed : int;
	var damage : int;
	var magic_damage : int;
	/// Attributes End
	
	///STATUS EFFECTS START
	protected var is_alive : boolean;
	var is_burned : boolean = false;
	var is_poisoned : boolean = false;
	var is_slow : boolean = false;
	var is_healing : boolean= false;
	var is_fast : boolean= false;
	var is_cleansed: boolean= false;
	var statis : boolean[] = [ is_burned, is_poisoned, is_slow, is_healing, is_fast, is_cleansed]; // add more statis effects HERE!!!//also need to make setmethods and getters
	///STATUS EFFECTS END
	
	
	/*MODIFICATIONS*/
	function Get_Tooltip() : String 
	{
		return "Health: "+health+
				"\nDamage: "+damage+
				"\nArmor: "+armor+
				"\nSpeed: "+speed+
				"\nMagic: "+magic_damage;
	}
	
	
	/*MODIFICATIONS*/
	function Attributes()
	{
		is_alive = true;
	}
	
	function Get_Name()
	{
		return name;
	}
	
	function Take_Damage (theDamageTaken : int)
	{ 
		health -= theDamageTaken;
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
		//return damage;
		if(equipped[0] != null)
		{
			return (equipped[0] as Weapon).Get_Damage() + damage;
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