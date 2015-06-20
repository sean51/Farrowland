#pragma strict

public class Area
{
	private var my_texture_color : Color;
	private var my_type : gui_type = gui_type.fight;
	
	private var current_enemies : Monster[];
	private var enemy_amount : int;
	
	var randomer : int;
	private var dialog : String;
	
	function Area () 
	{
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
		randomer = Random.Range(0, 10);
		if(randomer <= 6)
			my_type = gui_type.fight;
		else if (randomer > 6 && randomer <= 8)
			my_type = gui_type.quest;
		else if (randomer > 8 && randomer <= 9)
			my_type = gui_type.town;
		else
			my_type = gui_type.nav;
		switch(my_type) 
		{
			case gui_type.fight:
				if(!enemy_amount)
				{
					randomer = Mathf.Floor(Random.Range(1, 12.99));
					enemy_amount = randomer;
//enemy_amount = 11;
				}
				current_enemies = new Monster[enemy_amount];
				for(var i = 0; i < current_enemies.length; i++) {
					current_enemies[i] = Monster_Generator.Generate();
				}
				dialog = "You have come across\n"; 
				if(current_enemies.length > 1) {
					for(var m : Monster in current_enemies){
					 	dialog += m.name + ", ";
				 	}
				}
				else
				{
					dialog += current_enemies[0].name+", ";
				}
				dialog += "\nget ready for battle.\n";
				break;
			case gui_type.nav:
				dialog = "Choose where you want to go.";
				break;
			case gui_type.quest:
				dialog = Get_Quest();
				break;
			case gui_type.town:
				dialog = "You have reached a town.";
				break;
		}	
	}
	
	function Area(monster_amount : int){
		Area();
	}
	
	function Begin()
	{
		Messenger.Text(dialog);
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
		if(my_type == gui_type.fight){
				if(current_enemies.length > 1) {
					dialog = "You see the corpses of\n"; 
					for(var m : Monster in current_enemies){
					 	dialog += m.name + ", ";
				 	}
				}
				else
				{
					dialog = "You see the corpse of\n"; 
					dialog += current_enemies[0].name+", ";
				}
				dialog += "\nmaybe you can find loot if we ever program that.\n";
			my_type = gui_type.nav;
		}
	}
	
	function Get_Quest() : String {
		return "Quest: Save the princess!";
	}
}