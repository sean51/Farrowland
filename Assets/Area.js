#pragma strict

public class Area
{
	//ALL AREAS
	private var my_texture_color : Color;
	private var my_type : gui_type;
	private var dialog : String;
	
	//FIGHT AREAS
	private var current_enemies : Monster[];
	private var enemy_amount : int;
	
	//TRAVEL AREAS
	private var location_size : int;
	private var location : zone;
	
	function Area () 
	{
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
		Create_Area();
		Create_Dialog();
	}
	
	function Area(area_type : gui_type)
	{
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
		my_type = area_type;
		Create_Dialog();
	}
	
	function Area(area_type : gui_type, message : String)
	{
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
		my_type = area_type;
		dialog = message;
	}
	
	function Area(area_type : gui_type, message : String, travel_to : zone, travel_size : int)
	{
		my_type = area_type;
		dialog = message;
		location_size = travel_size;
		location = travel_to;
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
	}
	
	function Area(monster_amount : int)
	{
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
		enemy_amount = monster_amount;
		Create_Area();
		Create_Dialog();
	}
	
	function Create_Area()
	{
		var randomize : int = Random.Range(0, 10);
		switch(true)
		{
			case randomize < 7:
				my_type = gui_type.fight;
				if(!enemy_amount)
				{
					enemy_amount = Random.Range(1, 12);
				}
				current_enemies = new Monster[enemy_amount];
				for(var i = 0; i < current_enemies.length; i++) 
				{
					current_enemies[i] = Monster_Generator.Generate();
				}
				break;
			case randomize < 9:
				my_type = gui_type.quest;
				break;
			case randomize < 10:
				my_type = gui_type.town;
				break;
			case randomize == 10:
				my_type = gui_type.nav;
				break;
		}
	}
	
	function Create_Dialog()
	{
		switch(my_type)
		{
			case gui_type.fight:
				dialog = "You have come across a ";
				for(var i = 0; i < current_enemies.length; i++) 
				{
					if (i == 0)
					{
						dialog += current_enemies[i].name;
					}
					else if (i == current_enemies.length - 1)
					{
						dialog += ", and a " + current_enemies[i].name;
					}
					else
					{
						dialog += ", " + current_enemies[i].name;
					}
				}
				dialog += " get ready for battle.";
				break;
			case gui_type.quest:
				dialog = Get_Quest();
				break;
			case gui_type.town:
				dialog = "You have reached a town.";
				break;
			case gui_type.nav:
				dialog = "Choose where you want to go.";
				break;
		}
	}
	
	function Begin()
	{
		Messenger.Text(dialog);
	}
	
	function Get_Color(): Color
	{
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
	
	function Get_Location() : zone
	{
		return location;
	}
	
	function Get_Location_Size() : int
	{
		return location_size;
	}
	
	function Clear()
	{
		if(my_type == gui_type.fight)
		{
				if(current_enemies.length > 1) 
				{
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
				dialog += "\nmaybe you can find loot if we ever program that.\nI'm Joe\nI like newline\ncharacters.";
			my_type = gui_type.nav;
		}
	}
	
	function Get_Quest() : String 
	{
		return "Quest: Save the princess!";
	}
}