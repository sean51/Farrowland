using UnityEngine;
using System.Collections.Generic;

public class Battle {
	Attributes player;
	Attributes [] heroes;
	Attributes [] enemies;
	Attributes [] peopleInPlay;
	Attributes [] attackOrder;
	
	bool attacking;
	bool myTurn;
	
	private int turnCounter;
	
	
	public float turmTimer;
	
	//This Constructor is called for Battle with only 1 hero.
	public Battle(Attributes theHero, Attributes [] theEnemies){
		player = theHero;
		heroes[0] = theHero;
		peopleInPlay = new Attributes[theEnemies.Length + 1];
		enemies = new Attributes[theEnemies.Length];
		for(int i  = 0; i < theEnemies.Length; i++){
			enemies[i] = theEnemies[i];
		}
		attacking = false;
		SetTurns();
	}
	
	
	//This constuctor is called for Battle with multiple heroes.
	public Battle(Attributes [] theHeroes, Attributes [] theEnemies) {
		heroes = new Attributes[theHeroes.Length];
		peopleInPlay = new Attributes[theEnemies.Length + theHeroes.Length];
		enemies = new Attributes[theEnemies.Length];
		for(int i  = 0; i < theHeroes.Length; i++){
			heroes[i] = theHeroes[i];
		}
		for(int i  = 0; i < theEnemies.Length; i++){
			enemies[i] = theEnemies[i];
		}
		
		attacking = false;
		SetTurns();
	}
	
	// Update is called once per frame
	void Update () {
		if(!attacking) {
			TakeTurn (peopleInPlay[turnCounter++]);
			attacking = true;
		}
	}
	
	void TakeTurn(Attributes attacker) {
		
		if(attacker.name == "Hero"){		//Hero
			myTurn = true;
		} else if(attacker.name == "Monster"){	//Monster
			Hero target = (Hero)heroes[0];
			target.takeDamage(attacker.damage);
			attacking = false;
		} else {	//Passive
			attacking = false;
		}
	}
	
	void SetTurns(){
		int j;                     	// the number of items sorted so far
		int key;                	// the item to be inserted
		int i;  
		
		for (j = 1; j < peopleInPlay.Length; j++)    // Start with 1 (not 0)
		{
			key = peopleInPlay[j].speed;
			for(i = j - 1; (i >= 0) && (peopleInPlay[i].speed < key); i--)   // Smaller values are moving up
				peopleInPlay[i + 1] = peopleInPlay[i];
			peopleInPlay[i + 1].speed = key;    // Put the key in its proper location
		}
	}
	
	
	void OnGUI() {
		if(myTurn){
			GUI.BeginGroup(new Rect(25, 25, 100, 75));
			GUI.Box (new Rect(0, 0, 100, 150), "");
			if(GUI.Button (new Rect(10, 10, 80, 25), "Attack")){
				Monster target = (Monster)heroes[heroes.Length];
				target.takeDamage(player.damage);
			}
			if(GUI.Button (new Rect(10, 45, 80, 25), "Special")){
				
			}
			if(GUI.Button(new Rect(10, 80, 80, 25), "Flee")){
				
			}
			if(GUI.Button(new Rect(10, 115, 80, 25), "Inventory")){
				
			}
			GUI.EndGroup();
		}
	}
	
//	void IEnumerator TurnBreak(float time) {
//		yield return new WaitForSeconds(time);
//	}
}
