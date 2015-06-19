#pragma strict

public class Battle_GUI extends MonoBehaviour
{
	private var state : battle_state;
	private var meta_state : turn_state;
	
	private var battle_text : String[];
	
	private var enemies : Monster[];
	private var heroes : Hero[];
	private var attack_order : Attributes[];
	private var current_hero : Hero;
	
	private var turn_counter : int;
	private static var TURN_TIMER : float = .5f;
	
	private static var MONSTER_HEIGHT: float = Screen.height/20;
	private static var MONSTER_WIDTH: float = Screen.width/20;
	private static var MONSTER_START_Y: float = Screen.height/20;
	private static var MONSTER_START_X: float = Screen.width/6;
	
	private static var TEXT_HEIGHT: float = Screen.height/3.5;
	private static var TEXT_WIDTH: float = Screen.width/1.5;
	private static var TEXT_START_Y: float = Screen.height/1.5;
	private static var TEXT_START_X: float = Screen.width/6;
	
	private static var RESULT_HEIGHT: float = Screen.height/5;
	private static var RESULT_WIDTH: float = Screen.width/3;
	private static var RESULT_START_Y: float = (Screen.height / 2) - (RESULT_HEIGHT / 2);
	private static var RESULT_START_X: float = (Screen.width / 2) - (RESULT_WIDTH / 2);
	
	private static var OK_HEIGHT: float = RESULT_HEIGHT / 2;
	private static var OK_WIDTH: float = RESULT_WIDTH / 2;
	private static var OK_START_Y: float = RESULT_HEIGHT - OK_HEIGHT;
	private static var OK_START_X: float = (RESULT_WIDTH / 2) - (OK_WIDTH / 2);
	
	var target : Attributes;
	
	function Set_Fight(new_heroes : Hero[], new_enemies : Monster[])
	{
		state = battle_state.idle;
		meta_state = turn_state.idle;
		turn_counter = 0;
		battle_text = new String[13];
		Append_Text("Battle_Begins");
		
		enemies = new Monster[new_enemies.length];
		heroes = new Hero[new_heroes.length];
		var people_in_play = new Attributes[new_enemies.length + new_heroes.length];
		
		for(var i : int  = 0; i < new_heroes.length; i++)
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
				if(people_fighting[j + 1].speed > people_fighting[j].speed) 
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
	
	function Append_Text(new_line : String)
	{
		for(var i : int = battle_text.length - 1; i >= 1; i--)
		{
			battle_text[i] = battle_text[i - 1];
		}
		battle_text[0] = new_line;
	}
	
	function Get_Battle_Text() : String
	{
		var string_builder : String = "";
		for(var i : int = 0; i < battle_text.length; i++)
		{
			string_builder += battle_text[i] + "\n";
		}
		return string_builder;
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
			Append_Text("It is " + attacker.Get_Name() + "'s turn");
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
		Append_Text(attacker.Get_Name() + " deals " + attacker.Get_Damage() + " damage to " + defender.Get_Name());
		if(!defender.Get_Alive())
		{
			Append_Text(defender.Get_Name() + " has died");
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
			Append_Text("You have lost");
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
			Append_Text("You have won");
			state = battle_state.won;
		}
		
		yield WaitForSeconds(TURN_TIMER);
		
		if(state != battle_state.lost && state != battle_state.won)
		{
			state = battle_state.next;
		}
	}
	
	function OnGUI ()
	{
		//SHOW THE ENEMIES
		if(enemies != null)
		{
			for(var i : int = 0; i < enemies.length; i++)
			{
				if(enemies[i].Get_Alive())
				{
					if(GUI.Button (new Rect (MONSTER_START_X * i, MONSTER_START_Y, MONSTER_WIDTH, MONSTER_HEIGHT), enemies[i].Get_Name()))
					{
						if(meta_state == turn_state.targeting)
						{
							state = battle_state.idle;
							meta_state = turn_state.idle;
							Deal_Damage(current_hero, enemies[i]);
							Turn_Finished();
						}
					}
				}
			}
		}
		
		//SHOW THE BATTLE TEXT
		GUI.Box(new Rect(TEXT_START_X, TEXT_START_Y, TEXT_WIDTH, TEXT_HEIGHT), Get_Battle_Text());
		
		if(state == battle_state.won)
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
		if(state == battle_state.hero_turn && !spell)
		{
			GUI.BeginGroup(new Rect(25, 25, 150, 200));
			GUI.Box (new Rect(0, 0, 100, 150), "");
			if(GUI.Button (new Rect(10, 10, 80, 25), "Attack"))
			{
				meta_state = turn_state.targeting;
			}
			if(GUI.Button (new Rect(10, 45, 80, 25), "Spell"))
			{
				spell = true;
			}
			if(GUI.Button(new Rect(10, 80, 80, 25), "Flee"))
			{
				var decision : float = Random.Range(0, 3);
					if(decision > 1.5f) 
					{
						Debug.Log("You ran away");
					}
					else 
					{
						Debug.Log("You failed to run away");
					}
			}
			if(GUI.Button(new Rect(10, 115, 80, 25), "Inventory"))
				Debug.Log ("Open Inventory");
			GUI.EndGroup();
		}
	
		if(spell) 
		{
			var scrollPosition : Vector2;
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
						if(target.health > att.health) target = att;
					}
				}
				(target as Monster).Take_Damage(-current_hero.magic_damage);
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
			}
			
			if(GUILayout.Button ("Oh shit bomb!")){
				//if no target will default to enemy with highest health
				if(target == null){
					target = enemies[0];
					for(var att : Attributes in enemies) {
						if(target.health < att.health) target = att;
					}
				}
				(target as Monster).Take_Damage(current_hero.magic_damage);
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
			}
			
			if(GUILayout.Button ("Distraction")){
				//if no target will default to enemy with highest health
				if(target == null){
					target = enemies[0];
					for(var att : Attributes in enemies) {
						if(target.health < att.health) target = att;
					}
				}
				(target as Monster).Take_Damage(current_hero.magic_damage);
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
			}
			
			if(GUILayout.Button ("Teleport")){
				//if no target will default to enemy with highest health
				if(target == null){
					target = enemies[0];
					for(var att : Attributes in enemies) {
						if(target.health < att.health) target = att;
					}
				}
				(target as Monster).Take_Damage(current_hero.magic_damage);
				Turn_Finished();
				state = battle_state.idle;
				spell = false;
			}
			
			if(GUILayout.Button("Back")) {
				spell = false;
			}
		    GUILayout.EndScrollView();	        
			GUI.EndGroup();
		}
		/*JOES SCRIPTING*/
	}
	
}