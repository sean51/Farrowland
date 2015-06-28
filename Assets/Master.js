#pragma strict

import System.Collections.Generic;

public class Master extends MonoBehaviour
{
	//TILE OBJECTS
	public var up : GameObject;
	public var down : GameObject;
	public var left : GameObject;
	public var right : GameObject;
	public var ur : GameObject;
	public var ul : GameObject;
	public var dr : GameObject;
	public var dl : GameObject;
	
	//GUI COMPONENTS TO ATTACH
	private var option: Option_GUI;
	private var navigation: Navigation_GUI;
	private var fight : Battle_GUI;
	private var inventory : Inventory_GUI;
	private var text : Text_GUI;
	private var player_text : Player_GUI;
	private var travel : Travel_GUI;
	private var shop : Shop_GUI;

	//ZONE VARIABLES
	private var current_zone: Area[,];
	private var zone_size : int = 10;
	private var position: int[];
	private var exit_position : int[];
	private var map : String = "";

	public var current_type: gui_type;
	
	private var player : Hero = new Hero();

	//private var DELETE_THIS : Maze_Test;
	//private var DELETE_THIS_TOO : Node[,];
	
	function Start () 
	{
		//DELETE_THIS = gameObject.AddComponent.<Maze_Test>();
		//Create_Zone(zone.dungeon, 10);
		Start_GUI();
		Create_Zone(zone.town, 3);
		//Give the player a random weapon
		Inventory.Add(Weapon_Generator.Generate());
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
		Inventory.Set(inventory);
		player_text = gameObject.AddComponent.<Player_GUI>();
		player_text.Set(player);
		navigation = gameObject.AddComponent.<Navigation_GUI>();
		shop = gameObject.AddComponent.<Shop_GUI>();
		shop.Set(player);
	}
	
	/*
	 * Listen for status changes in the GUIs.
	 */
	function Update () 
	{
		if (navigation.enabled == true)
		{
			if(navigation.Get_Choice() != direction.undecided)
			{
				Move(navigation.Get_Choice());
			}
		}
		else if (current_type == gui_type.fight)
		{
			if(fight.Get_State() == battle_state.done)
			{
				current_zone[position[0],position[1]].Clear();
				Set_GUI(gui_type.nav);
			}
		}
		if (current_type == gui_type.travel)
		{
			if(travel.Get_Enter())
			{
				current_type = gui_type.idle;
				travel.Reset();
				Create_Zone(current_zone[position[0],position[1]].Get_Location(), current_zone[position[0],position[1]].Get_Location_Size());
				New_Area();
			}
		}
		if (false /*current_type == gui_type.shop*/)
		{
			
		}
		if (false /*current_type == gui_type.quest*/)
		{
			
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
		var wall_matrix : Node[,];
		switch(zone_type)
		{
			case zone.dungeon:
				var position_options : List.<int[]> = new List.<int[]>();
				position_options.Add([zone_size - 1, zone_size - 1]);
				position_options.Add([zone_size - 1, 0]);
				position_options.Add([0, zone_size - 1]);
				position_options.Add([0,0]);
				switch (Random.Range(0, 4))
				{
					case 0: position = position_options[0];
						break;
					case 1: position = position_options[1];
						break;
					case 2: position = position_options[2];
						break;
					case 3: position = position_options[3];
						break;
				}
				position_options.Remove(position);
				switch (Random.Range(0, 3))
				{
					case 0: exit_position = position_options[0];
						break;
					case 1: exit_position = position_options[1];
						break;
					case 2: exit_position = position_options[2];
						break;
				}
				//DELETE
				//position = [zone_size - 1, zone_size - 1];
				//CREATE WALLS AKA WTF
				wall_matrix = Create_Walls(exit_position);
				map = Get_Map(wall_matrix);
				//DELETE
				//DELETE_THIS_TOO = wall_matrix;
				//#WALLS CREATED
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
						current_zone[i, j].Set_Walls(wall_matrix[i, j].Get_Walls());
					}
				}
				break;
			case zone.town:
				position = [zone_size / 2, zone_size / 2];
				wall_matrix = Create_Walls();
				map = Get_Map(wall_matrix);
				//DELETE
				//DELETE_THIS_TOO = wall_matrix;
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
						else if (k == position[0] && l == position[1] + 1)
						{
							current_zone[k,l] = new Quest(new Package());
						}
						else if (k == position[0] - 1 && l == position[1] + 1)
						{
							current_zone[k,l] = new Quest(new Package());
						}
						else if (k == position[0] - 1 && l == position[1])
						{
							current_zone[k, l] = new Weapon_Shop(shop);
						}
						else if (k == position[0] - 1 && l == position[1] - 1)
						{
							current_zone[k, l] = new Armor_Shop(shop);
						}
						else if (k == position[0] + 1 && l == position[1] - 1)
						{
							current_zone[k, l] = new Potion_Shop(shop);
						}
						else if (k == position[0] + 1 && l == position[1] + 1)
						{
							current_zone[k, l] = new Magic_Shop(shop);
						}
						else if (k == position[0] && l == position[1] - 1)
						{
							current_zone[k, l] = new Amulet_Shop(shop);
						}
						else
						{
							current_zone[k,l] = new Area(1);
						}
						current_zone[k, l].Set_Walls(wall_matrix[k, l].Get_Walls());
					}
				}
				break;
		}
	}
	
	function Create_Walls() : Node[,]
	{
		var wall_matrix : Node[,] = new Node[zone_size, zone_size];
		for(var i : int = 0; i < zone_size; i++)
		{
			for(var j : int = 0; j < zone_size; j++)
			{
				wall_matrix[i, j] = new Node();
				wall_matrix[i, j].ceiling = (i == zone_size - 1);
				wall_matrix[i, j].floor = (i == 0);
				wall_matrix[i, j].left_wall = (j == 0);
				wall_matrix[i, j].right_wall = (j == zone_size - 1);
			}
		}
		return wall_matrix;
	}
	
	function Create_Walls(exit : int[]) : Node[,]
	{
		//CREATE A NEW WALL MATRIX
		var wall_matrix : Node[,] = new Node[zone_size, zone_size];
		
		//CREATE ALL NEW NODES IN THE WALL MATRIX
		for(var i : int = 0; i < zone_size; i++)
		{
			for(var j : int = 0; j < zone_size; j++)
			{
				wall_matrix[i, j] = new Node();
			}
		}
		
		//TELL ALL THE NODES ABOUT THE NODES AROUND THEM
		for(i = 0; i < zone_size; i++)
		{
			for(j = 0; j < zone_size; j++)
			{
				if (i - 1 >= 0)
				{
					wall_matrix[i, j].down = wall_matrix[i - 1, j];
				}
				if (i + 1 < zone_size)
				{
					wall_matrix[i, j].up = wall_matrix[i + 1, j];
					
				}
				if (j - 1 >= 0)
				{
					wall_matrix[i, j].left = wall_matrix[i, j - 1];
				}
				if (j + 1 < zone_size)
				{
					wall_matrix[i, j].right = wall_matrix[i, j + 1];
				}
			}
		}
		
		//TELL THE EXIT THAT IT IS THE EXIT
		wall_matrix[exit[0], exit[1]].exit = true;
		
		//START THE DEPTH-FIRST-SEARCH WITH THE ENTRANCE
		Depth_Create(wall_matrix[position[0], position[1]]);
		
		//RETURN THE FINISHED WALL MATRIX
		return wall_matrix;
	}
	
	function Depth_Create (current : Node)
	{
		
		current.visited = true;
		
		if(current.exit)
		{
			return;
		}
		
		var directions : List.<int>;
		
		while (true)
		{
			directions = new List.<int>();
			
			if(current.left != null && !current.left.visited)
			{
				directions.Add(0);
			}
			if(current.right != null && !current.right.visited)
			{
				directions.Add(1);
			}
			if(current.up != null && !current.up.visited)
			{
				directions.Add(2);
			}
			if(current.down != null && !current.down.visited)
			{
				directions.Add(3);
			}
			
			if (directions.Count == 0)
			{
				return;
			}
			
			var nextNode : int = directions[Random.Range(0, directions.Count)];
			
			switch(nextNode)
			{
				case 0: //WE ARE GOING LEFT
					current.left_wall = false;
					current.left.right_wall = false;
					Depth_Create(current.left);
					break;
				case 1: //WE ARE GOING RIGHT
					current.right_wall = false;
					current.right.left_wall = false;
					Depth_Create(current.right);
					break;
				case 2: //WE ARE GOING UP
					current.ceiling = false;
					current.up.floor = false;
					Depth_Create(current.up);
					break;
				case 3: //WE ARE GOING DOWN
					current.floor = false;
					current.down.ceiling = false;
					Depth_Create(current.down);
					break;
			}
		}
	}
	
	function New_Area()
	{
		//DELETE THIS SHIT
		//if(DELETE_THIS_TOO != null)
		//DELETE_THIS.Set_Printing(Get_Map(DELETE_THIS_TOO));
		
		Recolor();
		current_zone[position[0], position[1]].Begin();
		navigation.Set_Options(current_zone[position[0], position[1]].Get_Movement());
		//navigation.Set_Options([position[0] < zone_size - 1, position[0] > 0, position[1] > 0, position[1] < zone_size - 1]);
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
		shop.enabled = false;
		
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
			case gui_type.shop:	
				shop.enabled = true;
				navigation.enabled = true;
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
		var boundaries : boolean[] = [position[0] + 1 < zone_size, position[0] != 0, position[1] != 0, position[1] + 1 < zone_size];
		var wall_check : boolean[] = current_zone[position[0], position[1]].Get_Movement();
		var wall_in_question : Area;
		
		if (boundaries[0] && wall_check[0])
		{
			Texture_Change(current_zone[position[0] + 1, position[1]].Get_Color(), up);
		}
		else
		{
			Texture_Change(Color.black, up);
		}
		if (boundaries[1] && wall_check[1])
		{
			Texture_Change(current_zone[position[0] - 1, position[1]].Get_Color(), down);
		}
		else
		{
			Texture_Change(Color.black, down);
		}
		if (boundaries[2] && wall_check[2])
		{
			Texture_Change(current_zone[position[0], position[1] - 1].Get_Color(), left);
		}
		else
		{
			Texture_Change(Color.black, left);
		}
		if (boundaries[3] && wall_check[3])
		{
			Texture_Change(current_zone[position[0], position[1] + 1].Get_Color(), right);
		}
		else
		{
			Texture_Change(Color.black, right);
		}
		//DO YOU EXIST?
		if(boundaries[0] && boundaries[2])
		{
			//DO I NOT HAVE A TOP WALL							//DO YOU NOT HAVE A RIGHT WALL
			if(wall_check[0] && current_zone[position[0] + 1, position[1] - 1].Get_Movement()[3])
			{
				Texture_Change(current_zone[position[0] + 1, position[1] - 1].Get_Color(), ul);
			}
			//DO I NOT HAVE A LEFT WALL                          //DO YOU NOT HAVE A BOTTOM
			else if(wall_check[2] && current_zone[position[0] + 1, position[1] - 1].Get_Movement()[1])
			{
				Texture_Change(current_zone[position[0] + 1, position[1] - 1].Get_Color(), ul);
			}
			else
			{
				Texture_Change(Color.black, ul);
			}
		}
		else
		{
			Texture_Change(Color.black, ul);
		}
		//DO YOU EXIST?
		if(boundaries[0] && boundaries[3])
		{
			//DO I NOT HAVE A TOP WALL?                    //DO YOU NOT HAVE A LEFT WALL?
			if (wall_check[0] && current_zone[position[0] + 1, position[1] + 1].Get_Movement()[2])
			{
				Texture_Change(current_zone[position[0] + 1, position[1] + 1].Get_Color(), ur);
			}
			//DO I NOT HAVE A RIGHT WALL?                            //DO YOU NOT HAVE A BOTTOM WALL
			else if (wall_check[3] && current_zone[position[0] + 1, position[1] + 1].Get_Movement()[1])
			{
				Texture_Change(current_zone[position[0] + 1, position[1] + 1].Get_Color(), ur);			
			}
			else
			{
				Texture_Change(Color.black, ur);
			}
		}
		else
		{
			Texture_Change(Color.black, ur);
		}
		//DO YOU EXIST?
		if(boundaries[1] && boundaries[2])
		{
			//DO I NOT HAVE A BOTTOM              //DO YOU NOT HAVE A RIGHT?
			if (wall_check[1] && current_zone[position[0] - 1, position[1] - 1].Get_Movement()[3])
			{
				Texture_Change(current_zone[position[0] - 1, position[1] - 1].Get_Color(), dl);
			}
			//DO I NOT HAVE A LEFT?                                 //YOU YOU NOT HAVE A TOP?
			else if (wall_check[2] && current_zone[position[0] - 1, position[1] - 1].Get_Movement()[0])
			{
				Texture_Change(current_zone[position[0] - 1, position[1] - 1].Get_Color(), dl);
			}
			else
			{
				Texture_Change(Color.black, dl);
			}
		}
		else
		{
			Texture_Change(Color.black, dl);
		}
		//DO YOU EXIST?
		if(boundaries[1] && boundaries[3])
		{
			//DO I NOT HAVE A BOTTOM                   //DO YOU NOT HAVE A LEFT?
			if (wall_check[1] && current_zone[position[0] - 1, position[1] + 1].Get_Movement()[2])
			{
				Texture_Change(current_zone[position[0] - 1, position[1] + 1].Get_Color(), dr);
			}
			//DO I NOT HAVE A RIGHT?						//DO YOU NOT HAVE A TOP
			else if (wall_check[3] && current_zone[position[0] - 1, position[1] + 1].Get_Movement()[0])
			{
				Texture_Change(current_zone[position[0] - 1, position[1] + 1].Get_Color(), dr);
			}
			else
			{
				Texture_Change(Color.black, dr);
			}
		}
		else
		{
			Texture_Change(Color.black, dr);
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
	
	function Get_Map(printed_area : Node[,]) : String
	{
		var wall : String = "\\";
		var roof : String = "-";
		var space : String = " ";
		var current : String = "X";
		
		var CLOSED_TOP : String = (roof + roof + space + space + roof + roof + space + space);
		var OPEN_TOP : String = (roof + roof + space + space + space + space + space + space);
		var OPEN_LEFT : String = (space + space + space + space) + (space + space + space + space);
		var CLOSED_LEFT : String = (wall + wall + space + space) + (space + space + space + space);
		var OPEN_LEFT_X : String = (space + space + space + current) + (space + space + space + space);
		var CLOSED_LEFT_X : String = (wall + wall + space + current) + (space + space + space + space);
		
		var sb : String = "";
		//printed_area[0,0].ceiling = false;
		
		for (var i : int = zone_size - 1; i >= 0; i--)
		{
			for (var j : int = 0; j < zone_size; j++)
			{
				if (printed_area[i, j].ceiling)
				{
					sb += CLOSED_TOP;
				}
				else
				{
					sb += OPEN_TOP;
				}
			}
			sb += "-\n";
			for (j = 0; j < zone_size; j++)
			{
				if(printed_area[i, j].left_wall)
				{
					if (position[0] == i && position[1] == j)
					{
						sb += CLOSED_LEFT_X;
					}
					else
					{
						sb += CLOSED_LEFT;
					}
				}
				else
				{
					if (position[0] == i && position[1] == j)
					{
						sb += OPEN_LEFT_X;
					}
					else
					{
						sb += OPEN_LEFT;
					}
				}
			}
			sb += wall + "\n";
		}
		sb += (roof + space);
		for(i = 0; i < zone_size; i++)
		{
			sb += (roof + space + roof + space) + (roof + space + roof + space);
		}
		//sb += (roof + space + space + space) + (space + space + space + roof) + "\n";
		return sb;
	}
	
	private class Node
	{
		public var up : Node = null;
		public var down : Node = null;
		public var left : Node = null;
		public var right : Node = null;
		public var ceiling : boolean = true;
		public var floor : boolean = true;
		public var left_wall : boolean = true;
		public var right_wall : boolean = true;
		public var visited : boolean = false;
		public var exit : boolean = false;
		
		function Node()
		{
			up = null;
			down = null;
			left = null;
			right = null;
			ceiling = true;
			floor = true;
			left_wall = true;
			right_wall = true;
			visited = false;
			exit = false;
		}
		
		function Get_Walls() : boolean[]
		{
			return [ceiling, floor, left_wall, right_wall];
		}
	}
}