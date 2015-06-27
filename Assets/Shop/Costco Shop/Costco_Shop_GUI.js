﻿public class Costco_Shop_GUI extends Shop_GUI {
	
	protected var sections : String[];
	protected var menu_num : int;
	
	function Start () {
		if(!menu_num)menu_num = 0;
		if(!sections)sections = ["Weapons", "Armor", "Amulets", "Potions", "Scrolls", "Magic"];
		current_page = sections[0];
		super.Start();
		menu_type[menu_num] = true;
		current_menu = weapon_menu;
	}
	
	function Set_False() {
		for(var menu : boolean in menu_type) {
			menu = false;
		}
	}
	
	function OnGUI() {
		GUI.Button(new Rect(Screen.width/2 + 350, Screen.height/2 - 100 , 100, 35), "Exit");
		GUI.BeginGroup(new Rect(Screen.width/2 - 310, Screen.height / 10, 630, 530));
		for(var i = 0; i < sections.Length; i++) 
		{
			if (menu_type[i + menu_num])
			{
				current_page = sections[i];
				current_menu = menu[i + menu_num];
			}
		}
		GUI.Box(new Rect(0, 0, 630, 450), current_page);
		GUI.BeginGroup(new Rect(10, 20, 610, 600));
		GUI.Box(new Rect(10, 10, 600, 400), "");
		for(i = 0; i < current_menu.Length; i++) {
			if(GUI.Button(new Rect((200 * (i % 3)) + 20, (100 * Mathf.Floor(i % 4)) + 15, 90, 90), new GUIContent(current_menu[i].Get_Name(), current_menu[i].tooltip))){
				curItem = current_menu[i];
				purchasing = true;
			}
			GUI.Label(new Rect((200 * (i % 3)) + 110, (100 * Mathf.Floor(i % 4)) + 10, 100, 200), GUI.tooltip);
			GUI.tooltip = null;
		}
		GUI.EndGroup();
		GUI.EndGroup();
		for(i = 0; i < sections.Length; i++) {
			if(GUI.Button(new Rect(100, 100 + (i * 40), 100, 35), sections[i])){
				Set_False();
				menu_type[i + menu_num] = true;
			}
		}
		
		
		if(purchasing) {
			GUI.BeginGroup(new Rect(new Rect(Screen.width/2 - 500, Screen.height/3 - 100 , 200, 155)));
//			if(player.getGold() >= curItem.price)
//			{
				GUI.Box(new Rect(0, 0, 200, 100), "Purchase: "+curItem.Get_Name()+"\nfor "+curItem.price+" gold?");
				if(GUI.Button(new Rect(10, 55, 75, 35), "Yes")){
					Debug.Log("Player spends: "+curItem.price+" gold.");
					Debug.Log("Add: "+curItem.Get_Name()+" to inventory.");		
					purchasing = false;
				}
				if(GUI.Button(new Rect(115, 55, 75, 35), "No")) {
					purchasing = false;
				}
				GUI.EndGroup();
//			} else 
//			{
//				
//			}
		}
	}
}	