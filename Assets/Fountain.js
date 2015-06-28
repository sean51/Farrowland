public class Fountain extends Area 
{
	var saved_player : Hero;
	function Fountain (the_player : Hero) 
	{
		my_type = gui_type.town;
		saved_player = the_player;
	}
	
	function Begin() 
	{
		Messenger.Text("You are standing in the center of town. You are fully healed.");
		saved_player.Full_Heal();
	}
}	
