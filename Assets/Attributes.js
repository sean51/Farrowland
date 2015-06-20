#pragma strict
public class Attributes {
//asd
	///Item Info Start
	protected var equipped : Items[];
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
	/*MODIFICATIONS*/
	
	//Getters Start
	function Get_Statis_Effect(): boolean
	{
		for(var i : int = 0; i < statis.Length; i++)
		{	
			if(statis[i])
			Debug.Log(statis[i].ToString());
		}
		return false;
	}
	function Get_Is_Burned(): boolean
	{
		return is_burned;
	}
	function Get_Is_Poisoned(): boolean
	{
		return is_poisoned;
	}
	function Get_Is_Slow(): boolean
	{
		return is_slow;
	}
	function Get_Is_Healing(): boolean
	{
		return is_healing;
	}
	function Get_Is_Fast(): boolean
	{
		return is_fast;
	}
	function Get_Is_Cleansed(): boolean
	{
		return is_cleansed;
	}
	function Get_Max_Health(): int
	{
		return max_health;
	}
	function getHealth(): int
	{
		return health;
	}
	function getArmor(): int 
	{
		return armor;
	}
	function getSpeed(): int 
	{
		return speed;
	}
	function getMagicDamage(): int 
	{
		return magic_damage;
	}
	///Getters End
	
	///Setters Start
	protected function setName(theName : int): String
	{
		if(theName == 1)//Warrior
		{
			return "Warrior";
		}
		else if(theName == 2)//Ranger
		{
			return "Ranger";
			
		}
		else if(theName == 3)//Mage
		{
			return "Mage";
		}else
		{
			return "Hero";
		}
	}
	
	
	function Set_Is_Burned(the_is_burned : boolean): boolean
	{
		is_burned = the_is_burned;
		return is_burned;
	}
	function Set_Is_Poisoned(the_is_poisoned : boolean): boolean
	{
		is_poisoned = the_is_poisoned;
		return is_poisoned;
	}
	function Set_Is_Slow(the_is_slow : boolean): boolean
	{
		is_slow = the_is_slow;
		return is_slow;
	}
	function Set_Is_Healing(the_is_healing : boolean): boolean
	{
		is_healing = the_is_healing;
		return is_healing;
	}
	function Set_Is_Fast(the_is_fast : boolean): boolean
	{
		is_fast = the_is_fast;
		return is_fast;
	}
	function Set_Is_Cleansed(the_is_cleansed : boolean): boolean
	{
		is_cleansed = the_is_cleansed;
		return is_cleansed;
	}
	
	/////////////////////////////////////////////////////// fix this weapon swap
	//function Set_New_Item(the_new_item : int): int[]
	//{
		//Old_Item_To_Inventory();
		//if(the_new_item == 1)
		//{
//			equiped_item[the_new_item, 0];
		//}
		//return equiped_item;
	//}
	function Old_Item_To_Inventory() : int
	{
//		var item_type : int = 0;
//		if(!equiped_item[1].Equals(null))
//		{
//			item_type = equiped_item[1];
//			equiped_item;
//		}
		return 0;
	}
	///////////////////////////////////////////////////////
	
	function Set_Max_Health(the_max_health : int): int 
	{
		max_health = the_max_health;
		return max_health;
	}
	function setAlive(theIsAlive : boolean): boolean 
	{
		is_alive = theIsAlive;
		return is_alive;
	}
	function setHealth(theHealth : int): int 
	{
		health = theHealth;
		return health;
	}
	function setArmor(theArmor : int): int 
	{
		armor = theArmor;
		return armor;
	}
	function setSpeed(theSpeed : int): int 
	{
		speed = theSpeed;
		return speed;
	}
	function setDamage(theDamage : int): int 
	{
		damage = theDamage;
		return damage;
	}
	function setMagicDamage(theMagicDamage : int): int 
	{
		magic_damage = theMagicDamage;
		return magic_damage;
	}
	///Setters End
}