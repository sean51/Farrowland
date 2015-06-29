#pragma strict

public static class Item_Generator
{
	function Generate(seed : int) : Items
	{
		var item_to_return : Items;
		var item_type : int = Random.Range(0, 100);
		
		if (item_type < 20)
		{
			//boots
		}
		else if (item_type < 40)
		{
			//helmet
		}
		else if (item_type < 60)
		{
			//armor
		}
		else if (item_type < 80)
		{
			item_to_return = Weapon_Generator.Generate(seed);
		}
		else if (item_type < 95)
		{
			//shield
		}
		else
		{
			item_to_return = Amulet_Generator.Generate();
		}
		return item_to_return;
	}
}