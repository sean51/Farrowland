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

//single hero battle constuctor
function Battle(the_hero : Attributes, the_enemies : Attributes[]) {
	player = the_hero;
	heroes[0] = the_hero;
	people_in_play = new Attributes[the_enemies.Length + 1];
	enemies = new Attributes[the_enemies.Length];
	for(var i : int  = 0; i < the_enemies.Length; i++)
		enemies[i] = the_enemies[i];
	attacking = false;
	attack_order = Set_Turns(people_in_play);
}


//This constuctor is called for Battle with multiple heroes.
function Battle(the_heroes : Attributes[], the_enemies : Attributes[]) {
	heroes = new Attributes[the_heroes.Length];
	people_in_play = new Attributes[the_enemies.Length + the_heroes.Length];
	enemies = new Attributes[the_enemies.Length];
	for(var i : int  = 0; i < the_heroes.Length; i++)
		heroes[i] = the_heroes[i];
	for(i = 0; i < the_enemies.Length; i++)
		enemies[i] = the_enemies[i];
	
	attacking = false;
	attack_order = Set_Turns(people_in_play);
}


function Set_Turns(people_fighting : Attributes[]) : Attributes[]{
	var length = people_fighting.length;    	 				// number of items in the array
	var key : int;                     					 	// the value currently being compared
	var i : int;                        					// index into unsorted section
	var j : int;                          					// index into sorted section
	
	for (i = 0; i < length; i++) {
		// store the current value because it may shift later
		key = people_fighting[i].speed;
		
	/*
     * Whenever the value in the sorted section is greater than the value
     * in the unsorted section, shift all items in the sorted section over
     * by one. This creates space in which to insert the value.
     */
		for (j=i-1; j > -1 && people_fighting[j].speed > key; j--) 
			people_fighting[j+1] = people_fighting[j];
		people_fighting[j+1].speed = key;
	}
	return people_fighting;
}


function Update () {
	if(!attacking) {
		Take_Turn (attack_order[turn_counter++]);
		attacking = true;
	}

	for(var a : Attributes in people_in_play) {
		if(!a.isAlive) {
			if(a.name == "Hero") 
				Debug.Log ("Player has died.");
			 else 
				Debug.Log ("enemy died");
			
		}
	}
}


function Take_Turn(attacker : Attributes) {
	if(attacker.name == "Hero"){		//Hero
		myTurn = true;
	} else if(attacker.name == "Monster"){	//Monster
		var target : Hero = heroes[0];
		target.TakeDamage(attacker.damage);
		Turn_Finished();
	} else 	//Passive
		attacking = false;
}

function Turn_Finished() {
	yield WaitForSeconds(turn_timer);
	attacking = false;
}


function OnGUI() {
	if(my_turn){
		GUI.BeginGroup(new Rect(25, 25, 100, 75));
		GUI.Box (new Rect(0, 0, 100, 150), "");
		if(GUI.Button (new Rect(10, 10, 80, 25), "Attack")){
			var target = enemies[0];
			target.TakeDamage(player.damage);
			Turn_Finished();
		}
		if(GUI.Button (new Rect(10, 45, 80, 25), "Special")){
			target = enemies[0];
			target.TakeDamage(player.magicDamage);
			Turn_Finished();
		}
		if(GUI.Button(new Rect(10, 80, 80, 25), "Flee"))
			Debug.Log ("Run away");
		if(GUI.Button(new Rect(10, 115, 80, 25), "Inventory"))
			Debug.Log ("Open Inventory");
		GUI.EndGroup();
	}
}