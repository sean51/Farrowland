#pragma strict

public class Travel_GUI extends MonoBehaviour
{
	private var enter : boolean = false;
	
	private static var TRAVEL_HEIGHT: float = Screen.height / 10;
	private static var TRAVEL_WIDTH: float = Screen.width / 10;
	private static var TRAVEL_START_Y: float = (Screen.height / 2) - (TRAVEL_HEIGHT / 2);
	private static var TRAVEL_START_X: float = (Screen.width / 2) - (TRAVEL_WIDTH / 2);
	
	function Start () 
	{

	}

	function Update () 
	{

	}
	
	function Reset()
	{
		enter = false;
	}
	
	function Get_Enter() : boolean
	{
		return enter;
	}
	
	function OnGUI ()
	{
		if(GUI.Button(new Rect(TRAVEL_START_X, TRAVEL_START_Y, TRAVEL_WIDTH, TRAVEL_HEIGHT), "TRAVEL"))
		{
			enter = true;
		}
	}
}