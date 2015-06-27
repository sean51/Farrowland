#pragma strict

public static class Armor_Generator
{
	var roll_1 : int;
	var roll_3 : int;

	var name : String;
	var damage : int;
	var speed : int;
	var defense : int;
	var magic : int;
	var price : int;
	
	function Generate() : Armor
	{
		roll_1 = Random.Range(10, 99);		//Prefix roll
		roll_3 = Random.Range(0, 5);		//Quality roll
		
		name = Prefix(roll_1) + Armor_Type(roll_3);
		damage = Calculate_Damage(roll_1, roll_3);
		speed = Calculate_Speed(roll_1, roll_3);
		defense = Calculate_Defense(roll_1, roll_3);
		magic = Calculate_Magic(roll_1, roll_3);
		price = Calculate_Price(roll_1, roll_3);
		
		var random_Armor : Armor = new Armor(name, damage, speed, defense, magic, price);
		
		return random_Armor;
	}
	
	function Generate_Specific(prefix : int, quality : int) : Armor
	{
		name = Prefix(roll_1) + Armor_Type(roll_3);
		damage = Calculate_Damage(roll_1, roll_3);
		speed = Calculate_Speed(roll_1, roll_3);
		
		var specific_armor : Armor = new Armor(name, damage, speed, defense, magic, price);
		
		return specific_armor;
	}
	
	private function Calculate_Damage(prefix_roll : int, quality_roll : int) : int
	{
		var damage_calc : int = (prefix_roll / 20);
		return damage_calc;
	}
	
	private function Calculate_Speed(prefix_roll : int, quality_roll : int)
	{
		var speed_calc : int = (prefix_roll / 9);
		return speed_calc;
	}
	
	private function Calculate_Defense(prefix_roll : int, quality_roll : int)
	{
		var def_calc : int = (prefix_roll / 9) + quality_roll;
		return def_calc;
	}
	
	private function Calculate_Magic(prefix_roll : int, quality_roll : int)
	{
		var mag_calc : int = (prefix_roll / 15);
		return mag_calc;
	}
	
	private function Calculate_Price(prefix_roll : int, quality_roll : int)
	{
		var price_calc : int = prefix_roll * (quality_roll+1);
		return price_calc;
	}
	
	private function Armor_Type(quality_roll : int) : String
	{
		var type : String;
		
		switch(quality_roll)
		{
			case 0: type = "Greaves";
				break;
			case 1: type = "Cuirass";
				break;
			case 2: type = "Great Helm";
				break;
			case 3: type = "Pauldrons";
				break;
			case 4: type = "Chainmail Chestpiece";
				break;
			case 5: type = "Titanium Battleplate";
				break;
		}
		return type;
	}
	
	private function Prefix(rolled_number : int) : String
	{
		var prefix : String;
		switch(rolled_number)
		{
		case 10: prefix = "Damaged ";
			break;
		case 11: prefix = "Rusty ";
			break;
		case 12: prefix = "Dull ";
			break;
		case 13: prefix = "Tarnished ";
			break;
		case 14: prefix = "Bent ";
			break;
		case 15: prefix = "Dirty ";
			break;
		case 16: prefix = "Flimsy ";
			break;
		case 17: prefix = "Small ";
			break;
		case 18: prefix = "Cheap ";
			break;
		case 19: prefix = "Stained ";
			break;
		case 20: prefix = "";
			break;
		case 21: prefix = "Fair ";
			break;
		case 22: prefix = "Cursed ";
			break;
		case 23: prefix = "Able ";
			break;
		case 24: prefix = "Apt ";
			break;
		case 25: prefix = "Aged ";
			break;
		case 26: prefix = "Green ";
			break;
		case 27: prefix = "Blue ";
			break;
		case 28: prefix = "Red ";
			break;
		case 29: prefix = "Black ";
			break;
		case 30: prefix = "Beastly ";
			break;
		case 31: prefix = "Shiney ";
			break;
		case 32: prefix = "Fancy ";
			break;
		case 33: prefix = "Odd ";
			break;
		case 34: prefix = "Stone ";
			break;
		case 35: prefix = "Acidic ";
			break;
		case 36: prefix = "Swift ";
			break;
		case 37: prefix = "Flaming ";
			break;
		case 38: prefix = "Sturdy ";
			break;
		case 39: prefix = "Evil ";
			break;
		case 40: prefix = "Poison ";
			break;
		case 41: prefix = "Frozen ";
			break;
		case 42: prefix = "Firey ";
			break;
		case 43: prefix = "Ghostly ";
			break;
		case 44: prefix = "Sharp ";
			break;
		case 45: prefix = "Chaotic ";
			break;
		case 46: prefix = "Gemmed ";
			break;
		case 47: prefix = "Shocking ";
			break;
		case 48: prefix = "Victorious ";
			break;
		case 49: prefix = "Scary ";
			break;
		case 50: prefix = "Huge ";
			break;
		case 51: prefix = "Deadly ";
			break;
		case 52: prefix = "Ancient ";
			break;
		case 53: prefix = "Creepy ";
			break;
		case 54: prefix = "Solid ";
			break;
		case 55: prefix = "Beserk ";
			break;
		case 56: prefix = "Rare ";
			break;
		case 57: prefix = "Cruel ";
			break;
		case 58: prefix = "Dreary ";
			break;
		case 59: prefix = "Flawless ";
			break;
		case 60: prefix = "Mighty ";
			break;
		case 61: prefix = "Terrible ";
			break;
		case 62: prefix = "Chilling ";
			break;
		case 63: prefix = "Violent ";
			break;
		case 64: prefix = "Magic ";
			break;
		case 65: prefix = "Warriors ";
			break;
		case 66: prefix = "Venomous ";
			break;
		case 67: prefix = "Mystic ";
			break;
		case 68: prefix = "Doomed ";
			break;
		case 69: prefix = "Fiendish ";
			break;
		case 70: prefix = "Bloody ";
			break;
		case 71: prefix = "Icy ";
			break;
		case 72: prefix = "Giant ";
			break;
		case 73: prefix = "Strange ";
			break;
		case 74: prefix = "Wicked ";
			break;
		case 75: prefix = "Bright ";
			break;
		case 76: prefix = "Fierce ";
			break;
		case 77: prefix = "Wild ";
			break;
		case 78: prefix = "Agile ";
			break;
		case 79: prefix = "Glowing ";
			break;
		case 80: prefix = "Heavenly ";
			break;
		case 81: prefix = "Sparkling ";
			break;
		case 82: prefix = "Burly ";
			break;
		case 83: prefix = "Ghoulish ";
			break;
		case 84: prefix = "Corrupt ";
			break;
		case 85: prefix = "Curved ";
			break;
		case 86: prefix = "Enchanted ";
			break;
		case 87: prefix = "Exalted ";
			break;
		case 88: prefix = "Exotic ";
			break;
		case 89: prefix = "Faithful ";
			break;
		case 90: prefix = "Grim ";
			break;
		case 91: prefix = "Glass ";
			break;
		case 92: prefix = "Golden ";
			break;
		case 93: prefix = "Ideal ";
			break;
		case 94: prefix = "Pure ";
			break;
		case 95: prefix = "Jagged ";
			break;
		case 96: prefix = "Putrid ";
			break;
		case 97: prefix = "Reckless ";
			break;
		case 98: prefix = "Royal ";
			break;
		case 99: prefix = "Godly ";
			break;
		}
		return prefix;
	}
}