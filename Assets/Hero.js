#pragma strict 
public class Hero extends Attributes 
{
	private var backpack : Items[];
	
	function Hero()
	{
		spells = new Items[6];
		backpack = new Items[12];
		equipped = new Items[6];
		name = "Hero";
		damage = 200;
		health = 6000;
		max_health = 6000;
		armor = 5;
		speed = 2;
		magic_damage = 5;
		gold = 0;
	}
	
	function Stat_Text() : String
	{
		var spacing : String = "     ";
		return "Name: " + name + spacing + "Health: " + health + "/" + max_health + spacing + "Damage: " + Get_Damage() + spacing + "Magic: " + magic_damage + spacing + "Armor: " + armor + spacing + "Speed: " + speed + spacing + "Gold: " + gold;
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
	
	function Remove_Gold(new_amount : int)
	{
		gold -= new_amount;
		if (gold < 0)
		{
			gold = 0;
		}
	}
}