#pragma strict

public class Master extends MonoBehaviour
{
	private var option: Option_GUI;
	private var navigation: Navigation_GUI;
	private var fight : Battle_GUI;

	private var dungeon: Area[,];
	private var dungeon_size : int = 10;
	private var position: int[];

	private var current_type: gui_type;
	
	private var player : Hero = new Hero();

	function Start () 
	{
		//
		//Debug.Log(Weapon_Generator.Generate().Get_Name());
		//
		dungeon = new Area[dungeon_size, dungeon_size];
		for(var i: int = 0; i < dungeon_size; i++)
		{
			for(var j: int = 0; j < dungeon_size; j++)
			{
				dungeon[i,j] = new Area();
			}
		}
		position = [0,0];
		option = gameObject.AddComponent.<Option_GUI>();
		option.enabled = false;
		fight = gameObject.AddComponent.<Battle_GUI>();
		fight.enabled = false;
		navigation = gameObject.AddComponent.<Navigation_GUI>();
		navigation.Set_Options([position[0] < dungeon_size - 1, position[0] > 0, position[1] > 0, position[1] < dungeon_size - 1]);
		current_type = gui_type.nav;
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
				//fight.Reset();
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
		Texture_Change(dungeon[position[0], position[1]].Get_Color());
		navigation.Set_Options([position[0] < dungeon_size - 1, position[0] > 0, position[1] > 0, position[1] < dungeon_size - 1]);
		navigation.Reset();
		
		Set_GUI(dungeon[position[0], position[1]].Get_Type());
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
				
				//battle = new Battle(player, dungeon[position[0], position[1]].Get_Monsters());
				
				fight.enabled = true;
				break;
		}	
	}

	function Texture_Change(temp_color: Color)
	{
		var texture: Texture2D = new Texture2D(1, 1, TextureFormat.ARGB32, false);
		texture.SetPixel(0, 0, temp_color);
		texture.Apply();
		gameObject.GetComponent.<Renderer>().material.SetTexture("_MainTex", texture);
	}
}