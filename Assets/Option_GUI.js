#pragma strict

public class Option_GUI extends MonoBehaviour
{

	private static var OPTION_HEIGHT: float = Screen.height/20;
	private static var OPTION_WIDTH: float = Screen.width/1.5;
	private static var OPTION_START_Y: float = Screen.height/20;
	private static var OPTION_START_X: float = Screen.width/6;
	
	private static var TEXT_HEIGHT: float = Screen.height/3.5;
	private static var TEXT_WIDTH: float = Screen.width/1.5;
	private static var TEXT_START_Y: float = Screen.height/1.5;
	private static var TEXT_START_X: float = Screen.width/6;

	function Start () 
	{

	}

	function Update () {

	}

	function OnGUI ()
	{
		var height_counter: float = OPTION_START_Y;
		if(GUI.Button (new Rect (OPTION_START_X, height_counter, OPTION_WIDTH, OPTION_HEIGHT), "Option 1"))
		{
		
		}
		height_counter += (OPTION_START_Y * 2);
		if(GUI.Button (new Rect (OPTION_START_X, height_counter, OPTION_WIDTH, OPTION_HEIGHT), "Option 2"))
		{
		
		}
		height_counter += (OPTION_START_Y * 2);
		if(GUI.Button (new Rect (OPTION_START_X, height_counter, OPTION_WIDTH, OPTION_HEIGHT), "Option 3"))
		{
		
		}
		height_counter += (OPTION_START_Y * 2);
		if(GUI.Button (new Rect (OPTION_START_X, height_counter, OPTION_WIDTH, OPTION_HEIGHT), "Option 4"))
		{
		
		}
		GUI.Box(new Rect(TEXT_START_X, TEXT_START_Y, TEXT_WIDTH, TEXT_HEIGHT), "TEXT");
	}
}