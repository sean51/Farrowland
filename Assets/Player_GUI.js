#pragma strict

public class Player_GUI extends MonoBehaviour
{
	private var player : Hero;
	
	private static var STATS_HEIGHT: float = Screen.height/20;
	private static var STATS_WIDTH: float = Screen.width;
	private static var STATS_START_Y: float = 0;
	private static var STATS_START_X: float = 0;
	
	function Set (new_player : Hero)
	{
		player = new_player;
	}
	
	function OnGUI ()
	{
		GUI.Box(new Rect(STATS_START_X, STATS_START_Y, STATS_WIDTH, STATS_HEIGHT), player.Stat_Text());
	}
}