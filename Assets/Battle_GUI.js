#pragma strict

public class Battle_GUI extends MonoBehaviour
{
	public var enemies : Monster[];
	
	private static var MONSTER_HEIGHT: float = Screen.height/20;
	private static var MONSTER_WIDTH: float = Screen.width/20;
	private static var MONSTER_START_Y: float = Screen.height/20;
	private static var MONSTER_START_X: float = Screen.width/6;
	
	private static var TEXT_HEIGHT: float = Screen.height/3.5;
	private static var TEXT_WIDTH: float = Screen.width/1.5;
	private static var TEXT_START_Y: float = Screen.height/1.5;
	private static var TEXT_START_X: float = Screen.width/6;
	
	private var everyone_dead : boolean = false;

	function Awake ()
	{
	}
	
	function Set_Fight(new_enemies : Monster[])
	{
		enemies = new Monster[new_enemies.length];
		for(var i : int = 0; i < new_enemies.length; i++)
		{
			enemies[i] = new_enemies[i];
		}
		Debug.Log(enemies[0].MonsterName);
	}
	
	function Get_Finished() : boolean
	{
		return everyone_dead;
	}
	
	function Reset ()
	{
		everyone_dead = false;
	} 
	
	function OnGUI ()
	{
		if(enemies != null)
		{
			for(var i : int = 0; i < enemies.length; i++)
			{
				if(enemies[i].getAlive())
				{
					if(GUI.Button (new Rect (MONSTER_START_X * i, MONSTER_START_Y, MONSTER_WIDTH, MONSTER_HEIGHT), enemies[i].MonsterName))
					{
						enemies[i].setAlive(false);
						Check_Enemies();
					}
				}
			}
		}
		GUI.Box(new Rect(TEXT_START_X, TEXT_START_Y, TEXT_WIDTH, TEXT_HEIGHT), "TEXT");
	}
	
	function Check_Enemies()
	{
		for(var i : int = 0; i < enemies.length; i++)
		{
			if(enemies[i].getAlive())
			{
				return;
			}
		}
		everyone_dead = true;
	}
}