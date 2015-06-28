#pragma strict 
public class Hero extends Attributes 
{
	private var backpack : Items[];
	private var next_level : int;
	
	function Hero()
	{
		spells = new Items[6];
		backpack = new Items[12];
		equipped = new Items[6];
		name = "Hero";
		damage = 15;
		health = 70;
		max_health = 70;
		armor = 5;
		speed = 2;
		magic_damage = 5;
		gold = 0;
		experience = 0;
		next_level = 100;
		level = 1;
	}
	
	function Stat_Text() : String
	{
		var spacing : String = "     ";
		return "Name: " + name + spacing + "Health: " + health + "/" + max_health + spacing + "Damage: " + Get_Damage() + spacing + "Magic: " + magic_damage + spacing + "Armor: " + armor + spacing + "Speed: " + speed + spacing + "Gold: " + gold;
	}
	
	function Full_Heal()
	{
		health = max_health;
	}
	
	function Level_Up()
	{
		level++;
		Messenger.Text("Level " + level + " reached. + 1 to all stats.");
		damage++;
		max_health++;
		armor++;
		speed++;
		magic_damage++;
		next_level = (next_level * 2);
		if (experience > next_level)
		{
			Level_Up();
		}
	}
	
	function Get_Backpack() : Items[]
	{
		return backpack;
	}
	
	function Get_Equipped() : Items[]
	{
		return equipped;
	}
	
	/*
	function Add_Item(new_item : Items)
	{
		for (var i : int = 0; i < backpack.length; i++)
		{
			if (backpack[i] == null)
			{
				backpack[i] = new_item;
				break;
			}
		}
	}
	*/
	
	function Add_Gold(new_amount : int)
	{
		gold += new_amount;
	}
	
	function Add_Experience(new_amount : int)
	{
		experience += new_amount;
		if(experience > next_level)
		{
			Level_Up();
		}
	}
	
	function Remove_Gold(new_amount : int)
	{
		gold -= new_amount;
		if (gold < 0)
		{
			gold = 0;
		}
	}
}