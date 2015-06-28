#pragma strict

public class Battle_GUI extends MonoBehaviour
{
	private var state : battle_state;
	private var meta_state : turn_state;
	
	private var enemies : Monster[];
	private var heroes : Hero[];
	private var attack_order : Attributes[];
	private var current_hero : Hero;
	
	private var loot : Items[];
	
	private var turn_counter : int;
	private static var TURN_TIMER : float = .5f;
	
	private static var MONSTER_HEIGHT: float = Screen.height/20;
	private static var MONSTER_WIDTH: float = Screen.width/7;
	private static var MONSTER_START_Y: float = Screen.height/20;
	private static var MONSTER_START_X: float = Screen.width/6;
	
	private static var OPTIONS_HEIGHT: float = Screen.height/3.5;
	private static var OPTIONS_WIDTH: float = Screen.width/10;
	private static var OPTIONS_START_Y: float = Screen.height/1.5;
	private static var OPTIONS_START_X: float = Screen.width/1.205;
	
	private static var RESULT_HEIGHT: float = Screen.height/5;
	private static var RESULT_WIDTH: float = Screen.width/3;
	private static var RESULT_START_Y: float = (Screen.height / 2) - (RESULT_HEIGHT / 2);
	private static var RESULT_START_X: float = (Screen.width / 2) - (RESULT_WIDTH / 2);
	
	private static var OK_HEIGHT: float = RESULT_HEIGHT / 2;
	private static var OK_WIDTH: float = RESULT_WIDTH / 2;
	private static var OK_START_Y: float = RESULT_HEIGHT - OK_HEIGHT;
	private static var OK_START_X: float = (RESULT_WIDTH / 2) - (OK_WIDTH / 2);
	
	private static var LOOT_HEIGHT: float = (Inventory_GUI.ITEM_HEIGHT * 2) + Inventory_GUI.ITEM_START_Y;
	private static var LOOT_WIDTH: float = (Inventory_GUI.ITEM_WIDTH * 5) + Inventory_GUI.INFO_WIDTH;
	private static var LOOT_START_Y: float = (Screen.height / 2) - (LOOT_HEIGHT / 2);
	private static var LOOT_START_X: float = (Screen.width / 2) - (LOOT_WIDTH / 2);
	
	var target : Attributes;
	
	function Set_Fight(new_heroes : Hero[], new_enemies : Monster[])
	{
//		var lootSize : int;
//		for(var i = 0; i < new_enemies.Length; i++) 
//		{
//			lootSize += new_enemies[i].Get_Loot().Length;
//		}
//		loot = new Items[lootSize];
		state = battle_state.idle;
		meta_state = turn_state.idle;
		turn_counter = 0;
		Messenger.Text("Battle_Begins");
		
		enemies = new Monster[new_enemies.length];
		heroes = new Hero[new_heroes.length];
		var people_in_play = new Attributes[new_enemies.length + new_heroes.length];
		
		for(var i = 0; i < new_heroes.length; i++)
		{
			heroes[i] = new_heroes[i];
			people_in_play[i] = new_heroes[i];	
		}
		for(i = 0; i < new_enemies.length; i++)
		{
			enemies[i] = new_enemies[i];
			people_in_play[i + new_heroes.length] = new_enemies[i];
		}
		attack_order = Set_Turns(people_in_play);
	}
	
	function Set_Turns(people_fighting : Attributes[]) : Attributes[]
	{            					
		do 
		{
			var swapped : boolean  = false;
			for (var j = 0; j < people_fighting.Length - 1; j++)
			{
				if (people_fighting[j + 1].Get_Speed() > people_fighting[j].Get_Speed()) 
				{
					var placeHolder : Attributes = people_fighting[j];
					people_fighting[j] = people_fighting[j + 1];
					people_fighting[j + 1] = placeHolder;
					swapped = true;
				}
			}
		} while (swapped);
		
		state = battle_state.next;
		return people_fighting;
	}
	
	function Update () 
	{
		if(state == battle_state.next) 
		{
			state = battle_state.idle;
			while(!attack_order[turn_counter].Get_Alive())
			{
				turn_counter = ++turn_counter % attack_order.length;
			}
			if(attack_order[turn_counter].Get_Alive())
			{
				Take_Turn (attack_order[turn_counter++]);
				turn_counter = turn_counter % attack_order.length;
			}
		}
	}
	
	function Get_State(): battle_state
	{
		return state;
	}
	
	function Take_Turn(attacker : Attributes) 
	{
		if(attacker.GetType() == Hero) //Hero
		{
			state = battle_state.hero_turn;
			current_hero = attacker as Hero;
			Messenger.Text("It is " + attacker.Get_Name() + "'s turn");
		} 
		else if(attacker.GetType() == Monster) //Monster
		{
			state = battle_state.enemy_turn;
			Deal_Damage(attacker, heroes[0]);
			Turn_Finished();
		} 
	}
	
	function Deal_Damage(attacker : Attributes, defender : Attributes)
	{
		defender.Take_Damage(attacker.Get_Damage());
		Messenger.Text(attacker.Get_Name() + " deals " + attacker.Get_Damage() + " damage to " + defender.Get_Name());
		if(!defender.Get_Alive())
		{
			Messenger.Text(defender.Get_Name() + " has died");
		}
	}

	function Turn_Finished() 
	{
		var all_dead : boolean = true;
		for(var att : Hero in heroes) //Check for heroes in play and apply status effects.
		{		
			//att.Get_Statis_Effect();
			if(att.Get_Alive())
			{
				all_dead = false;
			}
		}
		if(all_dead) 
		{
			Messenger.Text("You have lost");
			state = battle_state.lost;
		}
		all_dead = true;
		for(var att : Monster in enemies) // Check for enemies in play and apply status effects.
		{	
			//att.Get_Statis_Effect();
			if(att.Get_Alive())
			{
				all_dead = false;
			}	
		}
		if(all_dead) 
		{
			Messenger.Text("You have won");
			meta_state = turn_state.looting;
			state = battle_state.won;
			Calculate_Loot();
		}
		
		yield WaitForSeconds(TURN_TIMER);
		
		if(state != battle_state.lost && state != battle_state.won)
		{
			state = battle_state.next;
		}
	}
	
	function Calculate_Loot()
	{
		var loot_num : int;
		for(var k = 0; k < enemies.Length; k++) {
			loot_num += enemies[k].Get_Loot_Number(); 
		}
		
		loot_num = Random.Range(0, loot_num);
		
		var loot_amount = Random.Range(1, 5);
		loot = new Items[loot_amount];
		
		var loot_num_array : int[] = new int[loot_amount];
		var percent : float[] = new float[loot_amount];
		
		var filled_amount : float = 0.0f;
		
		for(k = 0; k < loot_amount; k++) 
		{
			var fill_amount = Random.Range(0.0f, 1.0f);
			filled_amount += fill_amount;
			percent[k] = fill_amount;
		}
		
		for(k = 0; k < loot_amount; k++) 
		{
			percent[k] = percent[k]/filled_amount;
			loot_num_array[k] = Mathf.Round(loot_num*percent[k]);
			loot[k] = Weapon_Generator.Generate(loot_num_array[k]);
		}
		
	}
	
	function OnGUI ()
	{
		//SHOW THE ENEMIES
		if(enemies != null)
		{	
			if(enemies.length < 2) 
			{
				if(meta_state == turn_state.targeting)
				{
					if(GUI.Button (new Rect (MONSTER_START_X , MONSTER_START_Y, MONSTER_WIDTH, MONSTER_HEIGHT), new GUIContent(enemies[0].Get_Name(), enemies[0].Get_Tooltip())))
					{
						if(meta_state == turn_state.targeting)
						{
							state = battle_state.idle;
							meta_state = turn_state.idle;
							Deal_Damage(current_hero, enemies[0]);
							Turn_Finished();
						}
					}
				} 
				else 
				{
					GUI.Box (new Rect (MONSTER_START_X, MONSTER_START_Y, MONSTER_WIDTH, MONSTER_HEIGHT), new GUIContent(enemies[0].Get_Name(), enemies[0].Get_Tooltip()));
				}
				var centeredStyle = GUI.skin.GetStyle("Label");
				centeredStyle.alignment = TextAnchor.UpperCenter;
				GUI.Label(new Rect (MONSTER_START_X, MONSTER_START_Y + MONSTER_HEIGHT + 10, MONSTER_WIDTH, MONSTER_HEIGHT * 5), GUI.tooltip, centeredStyle);
				GUI.tooltip = null;
			}
			else
			{
				for(var i : int = 0; i < enemies.length; i++)
				{
					if(enemies[i].Get_Alive())
					{
						if(i >= Mathf.Ceil(enemies.length/2))
						{
							var j = 3.25f;
						} else {
							j = 0;
						}
						if(enemies.length % 2 == 0) {
							if(meta_state == turn_state.targeting)
							{
								if(GUI.Button (new Rect (MONSTER_START_X * (i % Mathf.Ceil(enemies.length/2)), MONSTER_START_Y + (MONSTER_START_Y * j), MONSTER_WIDTH, MONSTER_HEIGHT), new GUIContent(enemies[i].Get_Name(), enemies[i].Get_Tooltip())))
								{
									state = battle_state.idle;
									meta_state = turn_state.idle;
									Deal_Damage(current_hero, enemies[i]);
									Turn_Finished();
								}
							} else {
								GUI.Box (new Rect (MONSTER_START_X * (i % Mathf.Ceil(enemies.length/2)), MONSTER_START_Y + (MONSTER_START_Y * j), MONSTER_WIDTH, MONSTER_HEIGHT), new GUIContent(enemies[i].Get_Name(), enemies[i].Get_Tooltip()));
							}
							centeredStyle = GUI.skin.GetStyle("Label");
							centeredStyle.alignment = TextAnchor.UpperCenter;
							GUI.Label(new Rect (MONSTER_START_X * (i % Mathf.Ceil(enemies.length/2)), MONSTER_START_Y  + (MONSTER_START_Y * j) + MONSTER_HEIGHT, MONSTER_WIDTH, MONSTER_HEIGHT * 5), GUI.tooltip, centeredStyle);
							GUI.tooltip = null;
						} 
						else 
						{
							if(meta_state == turn_state.targeting)
							{
								if(GUI.Button (new Rect (MONSTER_START_X * (i % Mathf.Ceil(enemies.length/2 + 1)), MONSTER_START_Y + (MONSTER_START_Y * j), MONSTER_WIDTH, MONSTER_HEIGHT), new GUIContent(enemies[i].Get_Name(), enemies[i].Get_Tooltip())))
								{
									state = battle_state.idle;
									meta_state = turn_state.idle;
									Deal_Damage(current_hero, enemies[i]);
									Turn_Finished();
								}
							}
							 else 
							 {
								GUI.Box (new Rect (MONSTER_START_X * (i % Mathf.Ceil(enemies.length/2 + 1)), MONSTER_START_Y + (MONSTER_START_Y * j), MONSTER_WIDTH, MONSTER_HEIGHT), new GUIContent(enemies[i].Get_Name(), enemies[i].Get_Tooltip()));
							}
							centeredStyle = GUI.skin.GetStyle("Label");
							centeredStyle.alignment = TextAnchor.UpperCenter;
							GUI.Label(new Rect (MONSTER_START_X * (i % Mathf.Ceil(enemies.length/2 + 1)), MONSTER_START_Y  + (MONSTER_START_Y * j) +  MONSTER_HEIGHT, MONSTER_WIDTH, MONSTER_HEIGHT * 5), GUI.tooltip, centeredStyle);
							GUI.tooltip = null;
						}
					}
				}
			}
		}
		
		if(state == battle_state.won && meta_state == turn_state.looting)
		{
			GUI.BeginGroup(new Rect(LOOT_START_X, LOOT_START_Y, LOOT_WIDTH, LOOT_HEIGHT));
			GUI.Box(new Rect(0, 0, LOOT_WIDTH - Inventory_GUI.INFO_WIDTH - Inventory_GUI.ITEM_WIDTH, LOOT_HEIGHT), "LOOT");
			GUI.Box(new Rect(LOOT_WIDTH - Inventory_GUI.INFO_WIDTH - Inventory_GUI.ITEM_WIDTH, 0, Inventory_GUI.INFO_WIDTH, LOOT_HEIGHT), "INFO");
			GUI.Box(new Rect(LOOT_WIDTH - Inventory_GUI.ITEM_WIDTH, 0, Inventory_GUI.ITEM_WIDTH, LOOT_HEIGHT), "DONE");
			for (var loot_index : int = 0; loot_index < loot.Length; loot_index++)
			{
				if(loot[loot_index]) 
				{
					if(GUI.Button (new Rect (Inventory_GUI.ITEM_WIDTH * (loot_index % 4), Inventory_GUI.ITEM_START_Y + (Inventory_GUI.ITEM_HEIGHT * (loot_index / 4)), Inventory_GUI.ITEM_WIDTH, Inventory_GUI.ITEM_HEIGHT), new GUIContent(loot[loot_index].Get_Name(), loot[loot_index].Get_Tooltip())))
					{
						Inventory.Add(loot[loot_index]);
						loot[loot_index] = null;
					}
					GUI.Label(new Rect (LOOT_WIDTH - Inventory_GUI.INFO_WIDTH - Inventory_GUI.ITEM_WIDTH, 15, Inventory_GUI.INFO_WIDTH, LOOT_HEIGHT), GUI.tooltip);
					GUI.tooltip = null;
				}
			}
			if(GUI.Button (new Rect (LOOT_WIDTH - Inventory_GUI.ITEM_WIDTH, (LOOT_HEIGHT / 2) - (Inventory_GUI.ITEM_HEIGHT / 2), Inventory_GUI.ITEM_WIDTH, Inventory_GUI.ITEM_HEIGHT), "OK"))
			{
				meta_state = turn_state.idle;
			}
			GUI.EndGroup();
		}
		else if(state == battle_state.won)
		{
			GUI.BeginGroup(new Rect(RESULT_START_X, RESULT_START_Y, RESULT_WIDTH, RESULT_HEIGHT));
			GUI.Box(new Rect(0, 0, RESULT_WIDTH, RESULT_HEIGHT), "YOU HAVE WON!");
			if(GUI.Button (new Rect (OK_START_X, OK_START_Y, OK_WIDTH, OK_HEIGHT), "OK"))
			{
				state = battle_state.done;
			}
			GUI.EndGroup();
		}
		else if (state == battle_state.lost)
		{
			GUI.BeginGroup(new Rect(RESULT_START_X, RESULT_START_Y, RESULT_WIDTH, RESULT_HEIGHT));
			GUI.Box(new Rect(0, 0, RESULT_WIDTH, RESULT_HEIGHT), "YOU HAVE LOST.");
			if(GUI.Button (new Rect (OK_START_X, OK_START_Y, OK_WIDTH, OK_HEIGHT), "OK"))
			{
				state = battle_state.done;
			}
			GUI.EndGroup();
		}
		/*JOES SCRIPTING*/
		var spell : boolean = false;
		var escape_attempt : boolean = false;
		if(state == battle_state.hero_turn && !spell)
		{
			GUI.BeginGroup(new Rect(OPTIONS_START_X, OPTIONS_START_Y, OPTIONS_WIDTH, OPTIONS_HEIGHT));
			GUI.Box (new Rect(0, 0, OPTIONS_WIDTH, OPTIONS_HEIGHT), "");
			if(meta_state == turn_state.targeting) 
			{
				(GUI.Box (new Rect(10, 10, 80, 25), "Attack"));
			}
			else
			{
				if(GUI.Button (new Rect(10, 10, 80, 25), "Attack"))
				{
				
					meta_state = turn_state.targeting;
				}
			}
			if(GUI.Button (new Rect(10, 45, 80, 25), "Spell"))
			{
				Debug.Log("hit");
				spell = true;
			}
			if(GUI.Button(new Rect(10, 80, 80, 25), "Flee"))
			{
				escape_attempt = true;	
				var decision : float = Random.Range(0, 3);
			}
			if(GUI.Button(new Rect(10, 115, 80, 25), "Inventory"))
				Debug.Log ("Open Inventory");
			GUI.EndGroup();
		}
		
		if(escape_attempt)
		{
			if(decision > 1.5f) 
			{
				GUI.BeginGroup(new Rect(RESULT_START_X, RESULT_START_Y, RESULT_WIDTH, RESULT_HEIGHT));
				GUI.Box(new Rect(0, 0, RESULT_WIDTH, RESULT_HEIGHT), "You ran away.");
				if(GUI.Button (new Rect (OK_START_X, OK_START_Y, OK_WIDTH, OK_HEIGHT), "OK"))
				{
					state = battle_state.done;
					escape_attempt = false;
				}
				GUI.EndGroup();
			}
			else 
			{
				GUI.BeginGroup(new Rect(RESULT_START_X, RESULT_START_Y, RESULT_WIDTH, RESULT_HEIGHT));
				GUI.Box(new Rect(0, 0, RESULT_WIDTH, RESULT_HEIGHT), "You failed to run away.");
				if(GUI.Button (new Rect (OK_START_X, OK_START_Y, OK_WIDTH, OK_HEIGHT), "OK"))
				{
					escape_attempt = false;
				}
				GUI.EndGroup();
			}
		}
		
		//UNFINISHED SHIT v
		if(spell) 
		{
	    	GUI.BeginGroup(new Rect(25, 25, 150, 200));
		  	GUI.Box (new Rect(0, 0, 100, 150), "");
			if(GUILayout.Button ("Basic Spell"))
			{
				/*
				//if no target will default to enemy with highest health
				if(target == null)
				{
					target = enemies[0];
					for(var att : Attributes in enemies)
					 {
						if(target.health < att.health) target = att;
					}
				}
				(target as Monster).Take_Damage(current_hero.magic_damage);
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
				*/
			}
			
			if(GUILayout.Button ("Heal")){
				//if there is no target it will set target to the lowest health party member
				if(target == null)
				{
					target = heroes[0];
					for(var att : Attributes in heroes) 
					{
						if(target.Get_Health() > att.Get_Health()) target = att;
					}
				}
				(target as Monster).Take_Damage(-current_hero.Get_Magic_Damage());
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
			}
			
			if(GUILayout.Button ("Oh shit bomb!")){
				//if no target will default to enemy with highest health
				if(target == null){
					target = enemies[0];
					for(var att : Attributes in enemies) {
						if(target.Get_Health() < att.Get_Health()) target = att;
					}
				}
				(target as Monster).Take_Damage(current_hero.Get_Magic_Damage());
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
			}
			
			if(GUILayout.Button ("Distraction")){
				//if no target will default to enemy with highest health
				if(target == null){
					target = enemies[0];
					for(var att : Attributes in enemies) {
						if(target.Get_Health() < att.Get_Health()) target = att;
					}
				}
				(target as Monster).Take_Damage(current_hero.Get_Magic_Damage());
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
			}
			
			if(GUILayout.Button ("Teleport")){
				//if no target will default to enemy with highest health
				if(target == null){
					target = enemies[0];
					for(var att : Attributes in enemies) {
						if(target.Get_Health() < att.Get_Health()) target = att;
					}
				}
				(target as Monster).Take_Damage(current_hero.Get_Magic_Damage());
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
			}
			
			if(GUILayout.Button("Back")) {
				spell = false;
			}	        
			GUI.EndGroup();
		}
		/*JOES SCRIPTING*/
	}
	
}