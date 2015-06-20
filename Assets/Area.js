#pragma strict

public class Area
{
	private var my_texture_color : Color;
	private var my_type : gui_type = gui_type.fight;
	
	private var current_enemies : Monster[];
	private var enemy_amount : int;
	
	var randomer : int;
	private var dialouge : String;
	
	function Area () 
	{
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
		randomer = Mathf.Floor(Random.Range(0, 10));
//		if(randomer <= 5)
//			my_type = gui_type.fight;
//		else if (randomer > 5 && randomer <= 8)
//			my_type = gui_type.quest;
//		else if (randomer > 8 && randomer <= 9)
//			my_type = gui_type.nav;
//		else if (randomer > 9)
//			my_type = gui_type.town;
		if(randomer <= 3) {
			my_type = gui_type.nav;
		} else {
			my_type = gui_type.fight;
		}
		switch(my_type) {
			case gui_type.fight:
				if(!enemy_amount) enemy_amount = 4;
				current_enemies = new Monster[enemy_amount];
				for(var i = 0; i < current_enemies.length; i++) {
					current_enemies[i] = new Monster();
				}
				dialouge = "You have come across "+current_enemies.length+" monsters.";
				break;
			case gui_type.nav:
				dialouge = "Choose where you want to go.";
				break;
//			case gui_type.quest:
//				dialouge = Get_Quest();
//				break;
//			case gui_type.town:
//				dialouge = "You have reached a town.";
//				break;
		}	
	}
	
	function Area(monster_amount : int){
		enemy_amount = monster_amount;
		Area();
	}
	
	function Get_Dialouge() : String {
		return dialouge;
	}
	
	function Get_Color(): Color
	{
		//return Color(0, 225, 50, 255);
		return my_texture_color;
	}
	
	function Get_Monsters(): Monster[]
	{
		return current_enemies;
	}
	
	function Get_Type(): gui_type
	{
		return my_type;
	}
	
	function Clear()
	{
		my_type = gui_type.nav;
	}
	
	function Get_Quest() : String {
		return "Save the princess!";
	}
}