public class Shop_GUI extends MonoBehaviour{
	public var current_menu : Items[];
	protected var curItem : Items;
	protected var item_amount_per_menu : int;
	protected var current_page : String;
	
	protected var player : Attributes;
	protected var purchasing : boolean = false;
	
	protected var sections : String[];
	protected var menu_num : int;
	
	var store_name : String;
	
	function Start() {
		if(!store_name) store_name == "Empty Store";
		if(!current_menu) current_menu = new Items[12];
	}
	
	function Populate(menu_items : Items[], new_name : String) {
		name = new_name;
		current_menu = new Items[menu_items.Length];
		for(var i = 0; i < menu_items.Length; i++) {
			current_menu[i] = menu_items[i];
		}
	}
	
	function Set(the_player : Hero) 
	{
		player = the_player;
	}
	
	function OnGUI() {
		GUI.Button(new Rect(Screen.width/2 + 350, Screen.height/2 - 100 , 100, 35), "Exit");
		GUI.BeginGroup(new Rect(Screen.width/2 - 310, Screen.height / 10, 630, 530));
		GUI.Box(new Rect(10, 10, 600, 420), name);
		for(i = 0; i < current_menu.Length; i++) {
			if(current_menu[i])
			{
				if(GUI.Button(new Rect((200 * (i % 3)) + 20, (100 * Mathf.Floor(i % 4)) + 35, 90, 90), new GUIContent(current_menu[i].Get_Name(), current_menu[i].tooltip))){
					curItem = current_menu[i];
					purchasing = true;
				}
				GUI.Label(new Rect((200 * (i % 3)) + 110, (100 * Mathf.Floor(i % 4)) + 30, 100, 200), GUI.tooltip);
				GUI.tooltip = null;
			} else
			{
				GUI.Box(new Rect((200 * (i % 3)) + 20, (100 * Mathf.Floor(i % 4)) + 15, 90, 90), "Empty");
			}
		}
		GUI.EndGroup();
		
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