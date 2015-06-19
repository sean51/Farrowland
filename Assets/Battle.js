public class Battle {

	var player : Attributes;
	var target : Attributes;

	var heroes : Attributes[];
	var enemies : Attributes[];
	var people_in_play : Attributes[];
	var attack_order : Attributes[];
	
	var attacking : boolean;
	var my_turn : boolean;
	
	var turn_counter : int;
	
	var turn_timer : float = .5f;
}

//single hero, one enemy battle constuctor
function Battle(the_hero : Attributes, the_enemy : Attributes) {
	heroes[0] = the_hero;
	enemies[0] = the_enemy;
	Battle(heroes, enemies);
}

//single hero, multiple enemies battle constuctor
function Battle(the_hero : Attributes, the_enemies : Attributes[]) {
	heroes[0] = the_hero;
	Battle(heroes, the_enemies);
}

//multiple heroes, one enemy battle constuctor
function Battle(the_heroes : Attributes[], the_enemy : Attributes) {
	enemies[0] = the_enemy;
	Battle(the_heroes, enemies);
}

//This constuctor is called for Battle with multiple heroes.
function Battle(the_heroes : Attributes[], the_enemies : Attributes[]) {
	heroes = new Attributes[the_heroes.Length];
	people_in_play = new Attributes[the_enemies.Length + the_heroes.Length];
	enemies = new Attributes[the_enemies.Length];
	for(var i : int  = 0; i < the_heroes.Length; i++){
		heroes[i] = the_heroes[i];
		people_in_play[i] = the_heroes[i];	
	}
	for(i = 0; i < the_enemies.Length; i++){
		enemies[i] = the_enemies[i];
		people_in_play[i + the_heroes.Length] = the_enemies[i];
	}
	attack_order = Set_Turns(people_in_play);
}


function Set_Turns(people_fighting : Attributes[]) : Attributes[]{            					
	do {
		var swapped : boolean  = false;
		for (var j = 0; j < people_fighting.Length - 1; j++)
			if(people_fighting[j + 1].speed > people_fighting[j].speed) {
				var placeHolder : Attributes = people_fighting[j]; 
				people_fighting[j] = people_fighting[j + 1];
				people_fighting[j + 1] = placeHolder;
				swapped = true;
			}
	} while (swapped);
	attacking = false;
	return people_fighting;
}


function Update () {
	if(!attacking) {
		if(attack_order[turn_counter].isAlive){			//current attacker is alive
			Take_Turn (attack_order[turn_counter++]);
			attacking = true;
		} else 
			turn_counter++;
	}
}


function Take_Turn(attacker : Attributes) {
	if(attacker.getType() == "Hero"){		//Hero
		player = attacker;
		myTurn = true;
	} else if(attacker.getType() == "Monster"){	//Monster
		if(!target) target = heroes[0];
		target.TakeDamage(attacker.damage);
		Turn_Finished();
	} else { 	//Passive
		Debug.Log("No attack");
		Turn_Finished();
	}
}



var count : int;
function Turn_Finished() {
	count = 0;
	for(var att : Attributes in heroes) {			//Check for heroes in play and apply status effects.
		att.Get_Statis_Effects();
		if(!att.isAlive){
			Debug.Log(att.name + " has died.");
			if(count == heroes.Length) {
				Debug.Log("You loose");
			}
			count++;
		}		
	}
	
	count = 0;
	for(var att : Attributes in enemies) {			// Check for enemies in play and apply status effects.
		att.Get_Statis_Effects();
		if(!att.isAlive){
			Debug.Log(att.name + " has died.");
			if(count == enemies.Length) {
				Debug.Log("You win");
			}
			count++;
		}	
	}
	yield WaitForSeconds(turn_timer);
	attacking = false;
}


//function Set_Target(tar : Attributes) {
//	target = tar;
//}

var spell : boolean = false;
function OnGUI() {
	if(my_turn && !spell){
		GUI.BeginGroup(new Rect(25, 25, 150, 200));
		GUI.Box (new Rect(0, 0, 100, 150), "");
		if(GUI.Button (new Rect(10, 10, 80, 25), "Attack")){
			//if no target will default to enemy with highest health
			if(target == null){
				target = enemies[0];
				for(var att : Attributes in enemies) {
					if(target.health < att.health) taget = att;
				}
			}
			target.TakeDamage(player.damage);
			Turn_Finished();
			my_turn = false;
		}
		if(GUI.Button (new Rect(10, 45, 80, 25), "Spell")){
			spell = true;
		}
		if(GUI.Button(new Rect(10, 80, 80, 25), "Flee")){
			var decision : float = Random.Range(0, 3);
				if(decision > 1.5f) {
					Debug.Log("You ran away");
				}
				else {
					Debug.Log("You failed to run away");
				}
		}
		if(GUI.Button(new Rect(10, 115, 80, 25), "Inventory"))
			Debug.Log ("Open Inventory");
		GUI.EndGroup();
	}
	
	if(spell) {
		var scrollPosition : Vector2;
    	GUI.BeginGroup(new Rect(25, 25, 150, 200));
	  	GUI.Box (new Rect(0, 0, 100, 150), "");
		if(GUILayout.Button ("Basic Spell")){
			//if no target will default to enemy with highest health
			if(target == null){
				target = enemies[0];
				for(var att : Attributes in enemies) {
					if(target.health < att.health) taget = att;
				}
			}
			target.TakeDamage(player.magicDamage);
			Turn_Finished();
			my_turn = false;
			spell = false;
		}
		
		if(GUILayout.Button ("Heal")){
			//if there is no target it will set target to the lowest health party member
			if(target == null){
				target = heroes[0];
				for(var att : Attributes in heroes) {
					if(target.health > att.health) taget = att;
				}
			}
			target.TakeDamage(-player.magicDamage);
			Turn_Finished();
			my_turn = false;
			spell = false;
		}
		
		if(GUILayout.Button ("Oh shit bomb!")){
			//if no target will default to enemy with highest health
			if(target == null){
				target = enemies[0];
				for(var att : Attributes in enemies) {
					if(target.health < att.health) taget = att;
				}
			}
			target.TakeDamage(player.magicDamage);
			Turn_Finished();
			my_turn = false;
			spell = false;
		}
		
		if(GUILayout.Button ("Distraction")){
			//if no target will default to enemy with highest health
			if(target == null){
				target = enemies[0];
				for(var att : Attributes in enemies) {
					if(target.health < att.health) taget = att;
				}
			}
			target.TakeDamage(player.magicDamage);
			Turn_Finished();
			my_turn = false;
			spell = false;
		}
		
		if(GUILayout.Button ("Teleport")){
			//if no target will default to enemy with highest health
			if(target == null){
				target = enemies[0];
				for(var att : Attributes in enemies) {
					if(target.health < att.health) taget = att;
				}
			}
			target.TakeDamage(player.magicDamage);
			Turn_Finished();
			my_turn = false;
			spell = false;
		}
		
		if(GUILayout.Button("Back")) {
			spell = false;
		}
	    GUILayout.EndScrollView();	        
		GUI.EndGroup();
	}
}