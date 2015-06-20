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

	private var dungeon: Area[,];
	private var dungeon_size : int = 10;
	private var position: int[];

	private var current_type: gui_type;
	
	private var player : Hero = new Hero();

	function Start () 
	{
		dungeon = new Area[dungeon_size, dungeon_size];
		for(var i: int = 0; i < dungeon_size; i++)
		{
			for(var j: int = 0; j < dungeon_size; j++)
			{
				dungeon[i,j] = new Area();
			}
		}
		position = [0,0];
		text = gameObject.AddComponent.<Text_GUI>();
		Messenger.Set(text);
		option = gameObject.AddComponent.<Option_GUI>();
		option.enabled = false;
		fight = gameObject.AddComponent.<Battle_GUI>();
		fight.enabled = false;
		inventory = gameObject.AddComponent.<Inventory_GUI>();
		inventory.Populate(player.Get_Backpack(), player.Get_Equipped());
		text = gameObject.AddComponent.<Text_GUI>();
		//
		player.Add_Item(Weapon_Generator.Generate());
		//
		navigation = gameObject.AddComponent.<Navigation_GUI>();
		navigation.Set_Options([position[0] < dungeon_size - 1, position[0] > 0, position[1] > 0, position[1] < dungeon_size - 1]);
		current_type = gui_type.nav;
		
		Texture_Change(dungeon[position[0], position[1]].Get_Color());
		Color_Surrounding();
	}
	/*
	 * Listen for status changes in the GUIs.
	 */
	function Update () 
	{
		if(current_type == gui_type.nav)
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
				dungeon[position[0],position[1]].Clear();
				Set_GUI(gui_type.nav);
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

	function New_Area()
	{
		dungeon[position[0], position[1]].Begin();
		Texture_Change(dungeon[position[0], position[1]].Get_Color());
		navigation.Set_Options([position[0] < dungeon_size - 1, position[0] > 0, position[1] > 0, position[1] < dungeon_size - 1]);
		navigation.Reset();
		
		Set_GUI(dungeon[position[0], position[1]].Get_Type());
		
		Color_Surrounding();
	}

	function Set_GUI(new_type : gui_type)
	{
		current_type = new_type;

		option.enabled = false;
		fight.enabled = false;
		navigation.enabled = false;
		
		switch(new_type)
		{
			case gui_type.nav:
				navigation.enabled = true;
				break;
			case gui_type.fight:
				fight.Set_Fight([player], dungeon[position[0], position[1]].Get_Monsters());
				fight.enabled = true;
				break;
		}	
	}
	
	function Color_Surrounding()
	{
		//UP, DOWN, LEFT, RIGHT
		var boundaries : boolean[] = [position[0] + 1 < dungeon_size, position[0] != 0, position[1] != 0, position[1] + 1 < dungeon_size];
		if(boundaries[0])
		{
			Texture_Change(dungeon[position[0] + 1, position[1]].Get_Color(), up);
		}
		else
		{
			Texture_Change(Color.black, up);
		}
		if(boundaries[0] && boundaries[2])
		{
			Texture_Change(dungeon[position[0] + 1, position[1] - 1].Get_Color(), ul);
		}
		else
		{
			Texture_Change(Color.black, ul);
		}
		if(boundaries[0] && boundaries[3])
		{
			Texture_Change(dungeon[position[0] + 1, position[1] + 1].Get_Color(), ur);
		}
		else
		{
			Texture_Change(Color.black, ur);
		}
		if(boundaries[1])
		{
			Texture_Change(dungeon[position[0] - 1, position[1]].Get_Color(), down);
		}
		else
		{
			Texture_Change(Color.black, down);
		}
		if(boundaries[1] && boundaries[2])
		{
			Texture_Change(dungeon[position[0] - 1, position[1] - 1].Get_Color(), dl);
		}
		else
		{
			Texture_Change(Color.black, dl);
		}
		if(boundaries[1] && boundaries[3])
		{
			Texture_Change(dungeon[position[0] - 1, position[1] + 1].Get_Color(), dr);
		}
		else
		{
			Texture_Change(Color.black, dr);
		}
		if(boundaries[2])
		{
			Texture_Change(dungeon[position[0], position[1] - 1].Get_Color(), left);
		}
		else
		{
			Texture_Change(Color.black, left);
		}
		if(boundaries[3])
		{
			Texture_Change(dungeon[position[0], position[1] + 1].Get_Color(), right);
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