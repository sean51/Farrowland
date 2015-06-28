public static class Monster_Generator {

	function Generate() : Monster
	{
		var roll_1 : int = Random.Range(0, 10);
		var roll_2 : int = Random.Range(0, 2);
		var roll_3 : int = Random.Range(1, 6);
		
		var name : String = Prefix(roll_1) + Monster_Type(roll_2, roll_3);
		var damage : int = Calculate_Damage(roll_1, roll_2, roll_3);
		var health : int = Calculate_Health(roll_1, roll_2, roll_3);
		var armor : int = Calculate_Armor(roll_1, roll_2, roll_3);
		var speed : int = Calculate_Speed(roll_1, roll_2, roll_3);
		var magic_damage : int = Calculate_Magic_Damage(roll_1, roll_2, roll_3);
		var loot_num : int = roll_1 * 100;
		
		var random_monster : Monster = new Monster(name, damage, health, armor, speed, magic_damage, loot_num);
		
		return random_monster;
	}
	
	function Generate_Specific(prefix_num : int, type_num : int, quality_num : int) : Monster
	{
		var roll_1 : int = prefix_num;
		var roll_2 : int = type_num;
		var roll_3 : int = quality_num;
		
		var name : String = Prefix(roll_1) + Monster_Type(roll_2, roll_3);
		var damage : int = Calculate_Damage(roll_1, roll_2, roll_3);
		var health : int = Calculate_Health(roll_1, roll_2, roll_3);
		var armor : int = Calculate_Armor(roll_1, roll_2, roll_3);
		var speed : int = Calculate_Speed(roll_1, roll_2, roll_3);
		var magic_damage : int = Calculate_Magic_Damage(roll_1, roll_2, roll_3);
		var loot_num : int = roll_1 * 100;
		
		var random_monster : Monster = new Monster(name, damage, health, armor, speed, magic_damage, loot_num);
		
		return random_monster;
	}
		
	private function Calculate_Damage(prefix_roll : int, type_roll : int, quality_roll : int) : int
	{
		var damage_calc : int = (quality_roll / 2) * (prefix_roll * (prefix_roll*.3)) + 1;
		switch(type_roll)
		{
			case 0:
				break;
			case 1: damage_calc /= .8;
				break;
			case 2: damage_calc /= .9;
				break;
		}
		return damage_calc;
	}
	
	private function Calculate_Health(prefix_roll : int, type_roll : int, quality_roll : int) : int
	{
		var health_calc : int = (quality_roll * 2) * prefix_roll + 1;
		switch(type_roll)
		{
			case 0: health_calc /= .8;
				break;
			case 1:
				break;
			case 2: health_calc /= .9;
				break;
		}
		return health_calc;
	}
	
	private function Calculate_Armor(prefix_roll : int, type_roll : int, quality_roll : int) : int
	{
		var armor_calc : int = (prefix_roll / 3) * (quality_roll / 3);
		switch(type_roll)
		{
			case 0: 
				armor_calc /= .9;
				armor_calc += 1;
				break;
			case 1: 
				break;
			case 2: 
				break;
		}
		return armor_calc;
	}
	
	private function Calculate_Speed(prefix_roll : int, type_roll : int, quality_roll : int)
	{
		var speed_calc : int = (prefix_roll / 3) * (quality_roll / 3);
		switch(type_roll)
		{
			case 0: 
				break;
			case 1: 
				break;
			case 2: 
				speed_calc /= .8;
				speed_calc += 1;
				break;
		}
		return speed_calc;
	}
	
	private function Calculate_Magic_Damage(prefix_roll : int, type_roll : int, quality_roll : int)
	{
		var magic_damage_calc : int = (prefix_roll / 3) * (quality_roll / 3);
		switch(type_roll)
		{
			case 0: 
				break;
			case 1: 
				magic_damage_calc /= .7;
				magic_damage_calc += 1;
				break;
			case 2: 
				break;
		}
		return magic_damage_calc;
	}
	
	private function Monster_Type(type_roll : int, quality_roll : int) : String
	{
		var type : String;
		switch(type_roll)
		{
			case 0: type = Melee(quality_roll);
				break;
			case 1: type = Magic(quality_roll);
				break;
			case 2: type = Ranged(quality_roll);
				break;
		}
		return type;
	}
	
	private function Prefix(rolled_number : int) : String
	{
		var prefix : String;
		switch(rolled_number)
		{
		case 0: prefix = "Snuffle ";
			break;
		case 1: prefix = "Rat ";
			break;
		case 2: prefix = "Goo ";
			break;
		case 3: prefix = "Troll ";
			break;
		case 4: prefix = "Orc ";
			break;
		case 5: prefix = "Ogre ";
			break;
		case 6: prefix = "Minotaur ";
			break;
		case 7: prefix = "Chimera ";
			break;
		case 8: prefix = "Griffin ";
			break;
		case 9: prefix = "Hydra ";
			break;
		case 10: prefix = "";
			break;
		}
		return prefix;
	}
	
	private function Melee(rolled_number : int) :  String
	{
		var melee : String;
		switch(rolled_number)
		{
		case 1: melee = "Skirmisher";
			break;
		case 2: melee = "Brawler";
			break;
		case 3: melee = "Assassinator";
			break;
		case 4: melee = "Warrior";
			break;
		case 5: melee = "Gladiator";
			break;
		case 6: melee = "Sentinel";
			break;
		}
		return melee;
	}
	
	private function Magic(rolled_number : int) : String
	{
		var magic : String;
		switch(rolled_number)
		{
		case 1: magic = "Warden";
			break;
		case 2: magic = "Magician";
			break;
		case 3: magic = "Sorcerer";
			break;
		case 4: magic = "Wizard";
			break;
		case 5: magic = "Warlock";
			break;
		case 6: magic = "SpellFlinger";
			break;
		}
		return magic;
	}
	
	private function Ranged(rolled_number : int) : String
	{
		var ranged : String;
		switch(rolled_number)
		{
		case 1: ranged = "Tracker";
			break;
		case 2: ranged = "Trickster";
			break;
		case 3: ranged = "Scout";
			break;
		case 4: ranged = "Ranger";
			break;
		case 5: ranged = "Hunter";
			break;
		case 6: ranged = "Assassinator";
			break;
		}
		return ranged;
	}
}