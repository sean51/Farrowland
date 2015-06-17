#pragma strict

public class Area
{
	private var my_texture_color : Color;
	
	function Area () 
	{
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
	}
	
	function Get_Color(): Color
	{
		//return Color(0, 225, 50, 255);
		return my_texture_color;
	}
	
	function HELLO(): String
	{
		return "HELLO";
	}
}