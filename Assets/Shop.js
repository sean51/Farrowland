public class Shop extends MonoBehaviour{
	var weapon_menu : Weapon[];
	var potion_menu : Potion[];
	var scroll_menu : Scroll[];
	var curItem : Items;
	var main_menu : boolean = true;
	var weapons : boolean = false;
	var potions : boolean = false;
	var scrolls : boolean = false;
	var item_amount_per_menu : int = 12;
	
	var player : Attributes;

	function Shop(the_player : Attributes) {
		player = the_player;
		weapon_menu = new Weapon[item_amount_per_menu];
		potion_menu = new Potion[item_amount_per_menu];
		scroll_menu = new Scroll[item_amount_per_menu];
		
		for(var i = 0; i < weapon_menu.Length; i++) {
			weapon_menu[i] = new Weapon();
			weapon_menu[i] = weapon_menu[i].Create_Random();
			potion_menu[i] = new Potion();
			potion_menu[i] = potion_menu[i].Create_Random();
			scroll_menu[i] = new Scroll();
			scroll_menu[i] = scroll_menu[i].Create_Random();
		}
		
	}
	
	function Start() {
		weapon_menu = new Weapon[item_amount_per_menu];
		potion_menu = new Potion[item_amount_per_menu];
		scroll_menu = new Scroll[item_amount_per_menu];
		
		for(var i = 0; i < weapon_menu.Length; i++) {
			weapon_menu[i] = new Weapon();
			weapon_menu[i] = weapon_menu[i].Create_Random();
			potion_menu[i] = new Potion();
			potion_menu[i] = potion_menu[i].Create_Random();
			scroll_menu[i] = new Scroll();
			scroll_menu[i] = scroll_menu[i].Create_Random();
		}
	}
	
	var purchasing : boolean = false;
	function OnGUI() {
	GUI.Button(new Rect(Screen.width/2 + 350, Screen.height/2 - 100 , 100, 35), "Exit");
		if(purchasing) {
			GUI.BeginGroup(new Rect(new Rect(Screen.width/2 - 550, Screen.height/3 - 100 , 200, 155)));
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
		}
		GUI.BeginGroup(new Rect(Screen.width/2 - 310, Screen.height / 10, 630, 520));
		if(main_menu) {
			GUI.Box(new Rect(0, 0, 630, 720), "Main Menu");
			if(GUI.Button(new Rect(20, 450, 150, 35), "Weapons")) {
				main_menu = false;
				weapons = true;
				potions = false;
				scrolls = false;
			}
			if(GUI.Button(new Rect(235, 450, 150, 35), "Potions")) {
				main_menu = false;
				weapons = false;
				potions = true;
				scrolls = false;
			}
			if(GUI.Button(new Rect(450, 450, 150, 35), "Scrolls")) {
				main_menu = false;
				weapons = false;
				potions = false;
				scrolls = true;
			}
		}
		if(weapons) {
			GUI.Box(new Rect(0, 0, 630, 720), "Weapons");
			GUI.BeginGroup(new Rect(10, 20, 610, 410));
			GUI.Box(new Rect(0, 0, 610, 410), "");
			for(var j = 0; j < weapon_menu.Length/3; j++) {
				for(var i = 0; i < weapon_menu.Length/3; i++) {
					if(GUI.Button(new Rect((200 * i) + 10, (100 * Mathf.Floor(j)) + 10, 90, 90), new GUIContent(weapon_menu[j+i].Get_Name(), weapon_menu[j+i].tooltip))){
						curItem = weapon_menu[j];
						purchasing = true;
					}
					GUI.Label(new Rect((200 * i) + 110, (100 * Mathf.Floor(j)) + 10, 100, 200), GUI.tooltip);
					GUI.tooltip = null;
				}
			}
			GUI.EndGroup();
			if(GUI.Button(new Rect(20, 450, 150, 35), "Main Menu")) {
				main_menu = true;
				weapons = false;
				potions = false;
				scrolls = false;
			}
			if(GUI.Button(new Rect(235, 450, 150, 35), "Potions")) {
				main_menu = false;
				weapons = false;
				potions = true;
				scrolls = false;
			}
			if(GUI.Button(new Rect(450, 450, 150, 35), "Scrolls")) {
				main_menu = false;
				weapons = false;
				potions = false;
				scrolls = true;
			}
		}
		if(potions) {
			GUI.Box(new Rect(0, 0, 630, 720), "Potions");
			GUI.BeginGroup(new Rect(10, 20, 610, 410));
			GUI.Box(new Rect(0, 0, 610, 410), "");
			for(j = 0; j < potion_menu.Length/3; j++) {
				for(i = 0; i < potion_menu.Length/3; i++) {
					if(GUI.Button(new Rect((200 * i) + 10, (100 * Mathf.Floor(j)) + 10, 90, 90), new GUIContent(potion_menu[j+i].Get_Name(), potion_menu[j+i].tooltip))){
						
					}
					GUI.Label(new Rect((200 * i) + 110, (100 * Mathf.Floor(j)) + 10, 100, 200), GUI.tooltip);
					GUI.tooltip = null;
				}
			}
			GUI.EndGroup();
			if(GUI.Button(new Rect(20, 450, 150, 35), "Weapons")) {
				main_menu = false;
				weapons = true;
				potions = false;
				scrolls = false;
			}
			if(GUI.Button(new Rect(235, 450, 150, 35), "Main Menu")) {
				main_menu = true;
				weapons = false;
				potions = false;
				scrolls = false;
			}
			if(GUI.Button(new Rect(450, 450, 150, 35), "Scrolls")) {
				main_menu = false;
				weapons = false;
				potions = false;
				scrolls = true;
			}
		}
		if(scrolls) {
			GUI.Box(new Rect(0, 0, 630, 720), "Scrolls");
			GUI.BeginGroup(new Rect(10, 20, 610, 410));
			GUI.Box(new Rect(0, 0, 610, 410), "");
			for(j = 0; j < scroll_menu.Length/3; j++) {
				for(i = 0; i < scroll_menu.Length/3; i++) {
					if(GUI.Button(new Rect((200 * i) + 10, (100 * Mathf.Floor(j)) + 10, 90, 90), new GUIContent(scroll_menu[j+i].Get_Name(), scroll_menu[j+i].tooltip))){
						
					}
					GUI.Label(new Rect((200 * i) + 110, (100 * Mathf.Floor(j)) + 10, 100, 40), GUI.tooltip);
					GUI.tooltip = null;
				}
			}
			GUI.EndGroup();
			if(GUI.Button(new Rect(20, 450, 150, 35), "Weapons")) {
				main_menu = false;
				weapons = true;
				potions = false;
				scrolls = false;
			}
			if(GUI.Button(new Rect(235, 450, 150, 35), "Potions")) {
				main_menu = false;
				weapons = false;
				potions = true;
				scrolls = false;
			}
			if(GUI.Button(new Rect(450, 450, 150, 35), "Main Menu")) {
				main_menu = true;
				weapons = false;
				potions = false;
				scrolls = false;
			}
		}
		GUI.EndGroup();
	}
}