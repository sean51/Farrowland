#pragma strict

public class Area
{
	private var my_texture_color : Color;
	private var my_type : gui_type = gui_type.fight;
	
	private var enemy01 : Monster;
	private var enemy02 : Monster;
	private var enemy03 : Monster;
	private var enemy04 : Monster;
	
	function Area () 
	{
		my_texture_color = Color(Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), Random.Range(0.0f, 1.0f), 1);
		enemy01 = new Monster();
		enemy02 = new Monster();
		enemy03 = new Monster();
		enemy04 = new Monster();
	}
	
	function Get_Color(): Color
	{
		//return Color(0, 225, 50, 255);
		return my_texture_color;
	}
	
	function Get_Monsters(): Monster[]
	{
		return [enemy01, enemy02, enemy03, enemy04];
	}
	
	function Get_Type(): gui_type
	{
		return my_type;
	}
	
	function Clear()
	{
		my_type = gui_type.nav;
	}
}