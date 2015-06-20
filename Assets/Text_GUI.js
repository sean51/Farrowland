#pragma strict

public class Text_GUI extends MonoBehaviour
{
	private var battle_text : String[];
	
	private static var TEXT_HEIGHT: float = Screen.height/3.5;
	private static var TEXT_WIDTH: float = Screen.width/1.5;
	private static var TEXT_START_Y: float = Screen.height/1.5;
	private static var TEXT_START_X: float = Screen.width/6;
	
	private static var MAX_LENGTH : int = Mathf.Floor(TEXT_WIDTH / 7.3);
	
	function Awake ()
	{
		battle_text = new String[13];
	}
	
	function New_Message(new_line : String)
	{
		Append_Text("-");
		Append_Text(new_line);
	}
	
	function Append_Text(new_line : String)
	{
		if(new_line.Length > MAX_LENGTH)
		{
			var index : int = MAX_LENGTH;
			while (new_line[index] != " ")
			{
				if(--index == 0)
				{
					Append_Text(new_line.Substring(0, MAX_LENGTH));
					return;
				}
			}
			Append_Text(new_line.Substring(index));
			Append_Text(new_line.Substring(0, index));
		}
		else
		{
			for(var i : int = battle_text.length - 1; i >= 1; i--)
			{
				battle_text[i] = battle_text[i - 1];
			}
			battle_text[0] = new_line;
		}
	}
	
	function Get_Battle_Text() : String
	{
		var string_builder : String = "";
		for(var i : int = 0; i < battle_text.length; i++)
		{
			string_builder += battle_text[i] + "\n";
		}
		return string_builder;
	}
	
	function OnGUI ()
	{
		//SHOW THE BATTLE TEXT
		if(!Inventory_GUI.show)
		{
			GUI.Box(new Rect(TEXT_START_X, TEXT_START_Y, TEXT_WIDTH, TEXT_HEIGHT), Get_Battle_Text());
		}
	}
}

public static class Messenger
{
	var relay : Text_GUI;
	
	public function Set(linked_object : Text_GUI)
	{
		relay = linked_object;
	}
	
	public function Text (message : String)
	{
		relay.New_Message(message);
	}
}