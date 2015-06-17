#pragma strict

public enum direction {up, down, left, right, undecided};

public class Navigation_GUI extends MonoBehaviour
{
	private static var ARROW_HEIGHT: float = Screen.height/15;
	private static var ARROW_WIDTH: float = Screen.width/15;
	
	private static var ARROW_START_Y: float = Screen.height/20;
	private static var ARROW_START_X: float = Screen.width/20;
	
	private var options : boolean[] = [true, true, true, true];
	
	private var choice: direction = direction.undecided;
	
	function Start () 
	{

	}

	function Update () 
	{

	}
	
	function Get_Choice (): direction
	{
		return choice;
	} 
	
	function Set_Options(new_options : boolean[])
	{
		for (var i : int = 0; i < new_options.length; i++)
		{
			options[i] = new_options[i];
		}
	}
	
	function Reset ()
	{
		choice = direction.undecided;
	} 
	
	function OnGUI ()
	{
		if(options[0])
		{
			if(GUI.Button (new Rect (((Screen.width / 2) - (ARROW_WIDTH / 2)), ARROW_START_Y, ARROW_WIDTH, ARROW_HEIGHT), "^"))
			{
				choice = direction.up;
			}
		}
		if(options[1])
		{
			if(GUI.Button (new Rect (((Screen.width / 2) - (ARROW_WIDTH / 2)), (Screen.height - ARROW_START_Y - ARROW_HEIGHT), ARROW_WIDTH, ARROW_HEIGHT), "v"))
			{
				choice = direction.down;
			}
		}
		if(options[2])
		{
			if(GUI.Button (new Rect (ARROW_START_X, ((Screen.height / 2) - (ARROW_HEIGHT / 2)), ARROW_WIDTH, ARROW_HEIGHT), "<"))
			{
				choice = direction.left;
			}
		}
		if(options[3])
		{
			if(GUI.Button (new Rect ((Screen.width - ARROW_START_X - ARROW_WIDTH), ((Screen.height / 2) - (ARROW_HEIGHT / 2)), ARROW_WIDTH, ARROW_HEIGHT), ">"))
			{
				choice = direction.right;
			}
		}
	}
}