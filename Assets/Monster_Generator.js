public static class Monster_Generator {

	function Generate() : Monster
	{
		var roll_1 : int = Random.Range(0, 10);
		var roll_2 : int = Random.Range(0, 3);
		var roll_3 : int = Random.Range(0, 3);
		
		var name : String = Prefix(roll_1) + Monster_Type(roll_1, roll_2, roll_3);
		var loot_num : int = (roll_1 * 70) + (roll_3 * 500);
		var my_type : monster_type = Calculate_Monster_Spec(roll_1, roll_2);
		
		var random_monster : Monster = new Monster(name, loot_num, my_type);
		Buff_Stats(random_monster, roll_1, my_type, roll_3);	
		
		return random_monster;
	}
	
	function Generate(seed : int) : Monster
	{
		var percentage : float = seed / 100;
		roll_1 = Random.Range(0, Mathf.Ceil(10 * percentage));
		roll_2 = Random.Range(0, 3);
		roll_3 = Random.Range(0, Mathf.Ceil(3 * percentage));
		Debug.Log(roll_1+ ", "+roll_3);
		
		var name : String = Prefix(roll_1) + Monster_Type(roll_1, roll_2, roll_3);
		var loot_num : int = (roll_1 * 70) + (roll_3 * 100);
		var my_type : monster_type = Calculate_Monster_Spec(roll_1, roll_2);
		
		var random_monster : Monster = new Monster(name, loot_num, my_type);
		
		Buff_Stats(random_monster, roll_1, my_type, roll_3);		
		
		return random_monster;
	}
	
	private function Buff_Stats(monster : Monster, power : int,  spec : monster_type, quality : int)
	{
		switch(spec)
		{
			case monster_type.fighter:
				monster.Set_Damage((power * 3) + 2 + (quality * 5));
				monster.Set_Health((power * 6) + 10 + (quality*2));
				monster.Set_Armor(power/2 + (quality * 2));
				monster.Set_Speed(power/5 + quality);
				monster.Set_Magic_Damage(0);
				break;
			case monster_type.wizard: 
				monster.Set_Damage(0);
				monster.Set_Health((power + 1) * 5 + quality);
				monster.Set_Armor(power/5 + (quality / 6));
				monster.Set_Speed(power/5 + quality);
				monster.Set_Magic_Damage((power * 4) + 2 + (quality * 7));
				break;
			case monster_type.ranger: 
				monster.Set_Damage((power * 4) + 2 + (quality * 7));
				monster.Set_Health((power + 1) * 5 + (quality * 1));
				monster.Set_Armor(power/5 + (quality / 6));
				monster.Set_Speed(power + quality);
				monster.Set_Magic_Damage((power + 1) + (quality * 2));
				break;
			case monster_type.summoner: 
				monster.Set_Damage(0);
				monster.Set_Health((power + 1) * 5 + (quality * 1));
				monster.Set_Armor(power/5 + (quality / 6));
				monster.Set_Speed(power/5 + quality);
				monster.Set_Magic_Damage((power * 4) + 2 + (quality * 7));
				break;
		}
	}
	
//	function Generate_Specific(prefix_num : int, type_num : int, quality_num : int) : Monster
//	{
//		var roll_1 : int = prefix_num;
//		var roll_2 : int = type_num;
//		var roll_3 : int = quality_num;
//		
//		var name : String = Prefix(roll_1) + Monster_Type(roll_2, roll_3);
//		var damage : int = Calculate_Damage(roll_1, roll_2, roll_3);
//		var health : int = Calculate_Health(roll_1, roll_2, roll_3);
//		var armor : int = Calculate_Armor(roll_1, roll_2, roll_3);
//		var speed : int = Calculate_Speed(roll_1, roll_2, roll_3);
//		var magic_damage : int = Calculate_Magic_Damage(roll_1, roll_2, roll_3);
//		var loot_num : int = (roll_1 * 70) + (roll_3 * 500);
//		
//		var random_monster : Monster = new Monster(name, damage, health, armor, speed, magic_damage, loot_num);
//		
//		return random_monster;
//	}

	private function Calculate_Monster_Spec(prefix_roll : int, type_roll : int) : monster_type
	{
		var type : monster_type;
		if(prefix_roll == 3 || prefix_roll ==  4 || prefix_roll == 5 || prefix_roll == 6){
			switch(type_roll)
			{
				case 0: 
					type = monster_type.fighter;
					break;
				case 1: 
					type = monster_type.wizard;
					break;
				case 2: 
					type = monster_type.ranger;
					break;
				case 3: 
					type = monster_type.summoner;
					break;
			}
		}
		else
		{
			type = monster_type.fighter;
		} 
		return type;
	}

	private function Monster_Type(prefix_roll : int, type_roll : int, quality_roll : int) : String
	{
		var type : String;
		if(prefix_roll == 3 || prefix_roll ==  4 || prefix_roll == 5 || prefix_roll == 6){
			switch(type_roll)
			{
				case 0: 
					type = Melee(quality_roll);
					break;
				case 1: 
					type = Magic(quality_roll);
					break;
				case 2: 
					type = Ranged(quality_roll);
					break;
				case 3: 
					type = Magic(quality_roll);
					break;
			}
		}
		else
		{
			type = Melee(quality_roll);
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
		case 0: melee = "Warrior";
			break;
		case 1: melee = "Gladiator";
			break;
		case 2: melee = "Sentinel";
			break;
		}
		return melee;
	}
	
	private function Magic(rolled_number : int) : String
	{
		var magic : String;
		switch(rolled_number)
		{
		case 0: magic = "Wizard";
			break;
		case 1: magic = "Warlock";
			break;
		case 2: magic = "SpellFlinger";
			break;
		}
		return magic;
	}
	
	private function Ranged(rolled_number : int) : String
	{
		var ranged : String;
		switch(rolled_number)
		{
		case 0: ranged = "Ranger";
			break;
		case 1: ranged = "Hunter";
			break;
		case 2: ranged = "Assassinator";
			break;
		}
		return ranged;
	}
}