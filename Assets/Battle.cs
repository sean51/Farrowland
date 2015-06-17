using UnityEngine;
using System.Collections;

public class Battle : MonoBehaviour {
	Attributes m_player;
	Attributes[] m_enemies;
	
	
	public Battle(Attributes theHero, Attributes [] theEnemies){
		m_player = theHero;
		m_enemies = new Attributes[theEnemies.Length];
		for(int i  = 0; i < theEnemies.Length; i++){
			m_enemies[i] = theEnemies[i];
		}
	}
	
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		
	}
	
	void OnGUI() {
		GUI.BeginGroup(new Rect(25, 25, 100, 75));
		GUI.Box (new Rect(0, 0, 100, 130));
		if(GUI.Button (new Rect(10, 10, 80, 25), "Attack")){
			
		}
		if(GUI.Button(new Rect(10, 45, 80, 25), "Flee")){
			
		}
		if(GUI.Button(new Rect(10, 80, 80, 25), "Inventory")){
			
		}
		GUI.EndGroup();
	}
}
