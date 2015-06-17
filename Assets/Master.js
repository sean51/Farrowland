#pragma strict

private enum gui_type {nav};

private var option: Option_GUI;
private var navigation: Navigation_GUI;
private var dungeon: Area[,];
private var dungeon_size : int = 10;
private var position: int[];
private var current_type: gui_type;

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
	option = gameObject.AddComponent.<Option_GUI>();
	option.enabled = false;
	navigation = gameObject.AddComponent.<Navigation_GUI>();
	navigation.Set_Options([position[0] < dungeon_size - 1, position[0] > 0, position[1] > 0, position[1] < dungeon_size - 1]);
	current_type = gui_type.nav;
}

function Update () 
{
	if(current_type == gui_type.nav)
	{
		if(navigation.Get_Choice() != direction.undecided)
		{
			switch (navigation.Get_Choice())
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
			
			Texture_Change(dungeon[position[0],position[1]].Get_Color());
			//ALWAYS SQUARE ATM
			navigation.Set_Options([position[0] < dungeon_size - 1, position[0] > 0, position[1] > 0, position[1] < dungeon_size - 1]);
			navigation.Reset();
			Debug.Log("" + position[0] + "," + position[1]);
		}
	}
}

function Texture_Change(temp_color: Color)
{
	Debug.Log(temp_color.ToString());
	var texture: Texture2D = new Texture2D(1, 1, TextureFormat.ARGB32, false);
	texture.SetPixel(0, 0, temp_color);
	texture.Apply();
	//gameObject.GetComponent.<Renderer>().material.mainTexture = texture;
	gameObject.GetComponent.<Renderer>().material.SetTexture("_MainTex", texture);
}