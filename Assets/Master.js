#pragma strict

public class Master extends MonoBehaviour
{
	public var up : GameObject;
	public var down : GameObject;
	public var left : GameObject;
	public var right : GameObject;
	public var ur : GameObject;
	public var ul : GameObject;
	public var dr : GameObject;
	public var dl : GameObject;
	
	private var option: Option_GUI;
	private var navigation: Navigation_GUI;
	private var fight : Battle_GUI;
	private var inventory : Inventory_GUI;
	private var text : Text_GUI;
	private var player_text : Player_GUI;
	private var travel : Travel_GUI;

	private var current_zone: Area[,];
	private var zone_size : int = 10;
	private var position: int[];

	private var current_type: gui_type;
	
	private var player : Hero = new Hero();

	function Start () 
	{
		//Create_Zone(zone.dungeon, 10);
		Create_Zone(zone.town, 3);
		Start_GUI();
		//Give the player a random weapon
		player.Add_Item(Weapon_Generator.Generate());
		New_Area();
		
	}
	
	function Start_GUI()
	{
		text = gameObject.AddComponent.<Text_GUI>();
		Messenger.Set(text);
		option = gameObject.AddComponent.<Option_GUI>();
		fight = gameObject.AddComponent.<Battle_GUI>();
		travel = gameObject.AddComponent.<Travel_GUI>();
		inventory = gameObject.AddComponent.<Inventory_GUI>();
		inventory.Populate(player.Get_Backpack(), player.Get_Equipped());
		player_text = gameObject.AddComponent.<Player_GUI>();
		player_text.Set(player);
		navigation = gameObject.AddComponent.<Navigation_GUI>();
	}
	
	/*
	 * Listen for status changes in the GUIs.
	 */
	function Update () 
	{
		if(navigation.enabled == true)
		{
			if(navigation.Get_Choice() != direction.undecided)
			{
				Move(navigation.Get_Choice());
			}
		}
		else if(current_type == gui_type.fight)
		{
			if(fight.Get_State() == battle_state.done)
			{
				current_zone[position[0],position[1]].Clear();
				Set_GUI(gui_type.nav);
			}
		}
		if(current_type == gui_type.travel)
		{
			if(travel.Get_Enter())
			{
				current_type = gui_type.idle;
				travel.Reset();
				Create_Zone(current_zone[position[0],position[1]].Get_Location(), current_zone[position[0],position[1]].Get_Location_Size());
				New_Area();
			}
		}
	}

	function Move(chosen_direction : direction)
	{
		switch (chosen_direction)
		{
			case direction.up:
				position = [position[0] + 1, position[1]];
				break;
			case direction.down:
				position = [position[0] - 1, position[1]];
				break;
			case direction.left:
				position = [position[0], position[1] - 1];
				break;		
			case direction.right:
				position = [position[0], position[1] + 1];
				break;
		}
		Debug.Log("" + position[0] + "," + position[1]);
		New_Area();
	}

	function Create_Zone(zone_type : zone, new_zone_size : int)
	{
		zone_size = new_zone_size;
		current_zone = new Area[zone_size, zone_size];
		switch(zone_type)
		{
			case zone.dungeon:
				switch (Random.Range(0,3))
				{
					case 0: position = [zone_size - 1, zone_size - 1];
						break;
					case 1: position = [zone_size - 1, 0];
						break;
					case 2: position = [0, zone_size - 1];
						break;
					case 3: position = [0,0];
						break;
				}
				for(var i: int = 0; i < zone_size; i++)
				{
					for(var j: int = 0; j < zone_size; j++)
					{
						if (i == position[0] && j == position[1])
						{
							current_zone[i,j] = new Area(gui_type.travel, "Portal.", zone.town, 3);
						}
						else
						{
							current_zone[i,j] = new Area(1);
						}
					}
				}
				break;
			case zone.town:
				position = [zone_size / 2, zone_size / 2];
				for(var k: int = 0; k < zone_size; k++)
				{
					for(var l: int = 0; l < zone_size; l++)
					{
						if (k == position[0] && l == position[1])
						{
							current_zone[k,l] = new Area(gui_type.nav, "You are standing in the center of town.");
						}
						else if (k == position[0] + 1 && l == position[1])
						{
							current_zone[k,l] = new Area(gui_type.travel, "Portal.", zone.dungeon, 5);
						}
						else
						{
							current_zone[k,l] = new Area(1);
						}
					}
				}
				break;
		}
	}
	
	function New_Area()
	{
		Recolor();
		current_zone[position[0], position[1]].Begin();
		navigation.Set_Options([position[0] < zone_size - 1, position[0] > 0, position[1] > 0, position[1] < zone_size - 1]);
		navigation.Reset();
		Set_GUI(current_zone[position[0], position[1]].Get_Type());
	}

	function Set_GUI(new_type : gui_type)
	{
		current_type = new_type;

		option.enabled = false;
		fight.enabled = false;
		navigation.enabled = false;
		travel.enabled = false;
		
		switch(new_type)
		{
			case gui_type.nav:
			case gui_type.quest:
			case gui_type.town:
				navigation.enabled = true;
				break;
			case gui_type.travel:
				travel.enabled = true;
				navigation.enabled = true;
				break;
			case gui_type.fight:
				fight.Set_Fight([player], current_zone[position[0], position[1]].Get_Monsters());
				fight.enabled = true;
				break;
		}	
	}
	
	private function Recolor()
	{
		Texture_Change(current_zone[position[0], position[1]].Get_Color());
		Color_Surrounding();
	}
	
	private function Color_Surrounding()
	{
		//UP, DOWN, LEFT, RIGHT
		var boundaries : boolean[] = [position[0] + 1 < zone_size, position[0] != 0, position[1] != 0, position[1] + 1 < zone_size];
		if(boundaries[0])
		{
			Texture_Change(current_zone[position[0] + 1, position[1]].Get_Color(), up);
		}
		else
		{
			Texture_Change(Color.black, up);
		}
		if(boundaries[0] && boundaries[2])
		{
			Texture_Change(current_zone[position[0] + 1, position[1] - 1].Get_Color(), ul);
		}
		else
		{
			Texture_Change(Color.black, ul);
		}
		if(boundaries[0] && boundaries[3])
		{
			Texture_Change(current_zone[position[0] + 1, position[1] + 1].Get_Color(), ur);
		}
		else
		{
			Texture_Change(Color.black, ur);
		}
		if(boundaries[1])
		{
			Texture_Change(current_zone[position[0] - 1, position[1]].Get_Color(), down);
		}
		else
		{
			Texture_Change(Color.black, down);
		}
		if(boundaries[1] && boundaries[2])
		{
			Texture_Change(current_zone[position[0] - 1, position[1] - 1].Get_Color(), dl);
		}
		else
		{
			Texture_Change(Color.black, dl);
		}
		if(boundaries[1] && boundaries[3])
		{
			Texture_Change(current_zone[position[0] - 1, position[1] + 1].Get_Color(), dr);
		}
		else
		{
			Texture_Change(Color.black, dr);
		}
		if(boundaries[2])
		{
			Texture_Change(current_zone[position[0], position[1] - 1].Get_Color(), left);
		}
		else
		{
			Texture_Change(Color.black, left);
		}
		if(boundaries[3])
		{
			Texture_Change(current_zone[position[0], position[1] + 1].Get_Color(), right);
		}
		else
		{
			Texture_Change(Color.black, right);
		}
	}

	function Texture_Change(temp_color: Color)
	{
		var texture: Texture2D = new Texture2D(1, 1, TextureFormat.ARGB32, false);
		texture.SetPixel(0, 0, temp_color);
		texture.Apply();
		gameObject.GetComponent.<Renderer>().material.SetTexture("_MainTex", texture);
	}
	
	function Texture_Change(temp_color: Color, area_object : GameObject)
	{
		var texture: Texture2D = new Texture2D(1, 1, TextureFormat.ARGB32, false);
		texture.SetPixel(0, 0, temp_color);
		texture.Apply();
		area_object.GetComponent.<Renderer>().material.SetTexture("_MainTex", texture);
	}
}