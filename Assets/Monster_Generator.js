public static class Monster_Generator 
{
	private var health : int;
	private var magic_damage : int;
	private var damage :  int;
	
	//Area 1 max is Random.Range(0, 100)
	//Area 2 max is Random.Range(0, 200)
	//Seed is between 0 and 999;
	function Generate(seed : int) : Monster
	{
		//Creates a level between 1 and 10
		var monster_level : int = 1 + (seed / 100);
		//Creates a type between 1 and 10
		var monster_type : int = 1 + ((seed % 100) / 10);
		//Creates a suffix between 0 and 3
		var monster_suffix : int = Random.Range(0, 4);
		//Creates a meta suffix between 0 and 2
		var monster_meta_suffix : int = Random.Range(0, 3);
		//Loot should not exceed 1000;
		var loot : int = Mathf.Min(1000, monster_level * 50 + monster_type * 50);
		//Damage should matter more on the monster_level than the monster_type
		damage = (monster_level * 5) + (monster_type / 2);
		//
		magic_damage = (monster_level * 5) + (monster_type / 2);
		//
		health = ((monster_level - 1)  * 100) + (monster_type * 10);
		//
		var armor : int = (monster_level * 5) + (monster_type / 5);
		//
		var speed : int = (monster_level * 2) + (monster_type / 5);
		//Getting the name will also alter the variables above
		var name : String = Level_Relay(monster_level, monster_type) + Suffix(monster_suffix, monster_meta_suffix);
		
		return new Monster(name, [damage, health, armor, speed, magic_damage, loot]);
	}

	private function Suffix(suffix_number : int, meta_number : int) : String
	{
		var suffix : String = "";
		switch (suffix_number)
		{
			case 0:
				switch (meta_number)
				{
					case 0:
						break;
					case 1: suffix = " Warrior";
						health *= 1.1;
						break;
					case 2: suffix = " Gladiator";
						health *= 1.2;
						break;
					case 3: suffix = " Sentinel";
						health *= 1.3;
						break;
				}
				break;
			case 1:
				switch (meta_number)
				{
					case 0:
						break;
					case 1: suffix = " Wizard";
						magic_damage *= 1.1;
						break;
					case 2: suffix = " Warlock";
						magic_damage *= 1.2;
						break;
					case 3: suffix = " SpellFlinger";
						magic_damage *= 1.3;
						break;
				}
				break;
			case 2:
				switch (meta_number)
				{
					case 0:
						break;
					case 1: suffix = " Ranger";
						damage *= 1.1;
						break;
					case 2: suffix = " Hunter";
						damage *= 1.2;
						break;
					case 3: suffix = " Assassin";
						damage *= 1.3;
						break;
				}
				break;
		}
		return suffix;
	}
	
	private function Level_Relay(level_number : int, monster_number : int) : String
	{
		var fetched_name : String;
		switch(level_number)
		{
			case 1: fetched_name = Monster_L1(monster_number);
				break;
			case 2: fetched_name = "LEVEL 2 MONSTER";
				break;
			case 3: fetched_name = "LEVEL 3 MONSTER";
				break;
			case 4: fetched_name = "LEVEL 4 MONSTER";
				break;
			case 5: fetched_name = "LEVEL 5 MONSTER";
				break;
			case 6: fetched_name = "LEVEL 6 MONSTER";
				break;
			case 7: fetched_name = "LEVEL 7 MONSTER";
				break;
			case 8: fetched_name = "LEVEL 8 MONSTER";
				break;
			case 9: fetched_name = "LEVEL 9 MONSTER";
				break;
			case 10: fetched_name = "LEVEL 10 MONSTER";
				break;
		}
		return fetched_name;
	}
	
	private function Monster_L1 (type_number : int) : String
	{
		var type : String;
		
		switch(type_number)
		{
			case 1: type = "Goblin";
				break;
			case 2: type = "Kobold";
				break;
			case 3: type = "Skeleton";
				break;
			case 4: type = "Zombie";
				break;
			case 5: type = "Human";
				break;	
			case 6: type = "Elf";
				break;
			case 7: type = "Orc";
				break;
			case 8: type = "Troll";
				break;
			case 9: type = "Ogre";
				break;
			case 10: type = "Minotaur";
				break;
		}
		return type;
	}
	
	/*
	private function Monster_L2 (type_number : int) : String
	{
		var type : String;
		
		switch(rolled_number)
		{
			case 0: type = "Snuffle ";
				break;
			case 1: type = "Rat ";
				break;
			case 2: type = "Goo ";
				break;
			case 3: type = "Troll ";
				break;
			case 4: type = "Orc ";
				break;
			case 5: type = "Ogre ";
				break;
			case 6: type = "Minotaur ";
				break;
			case 7: type = "Chimera ";
				break;
			case 8: type = "Griffin ";
				break;
			case 9: type = "Hydra ";
				break;
			case 10: type = "";
				break;
		}
		return type;
	}
	*/
}