public class Shop_GUI extends MonoBehaviour{
	var current_menu : Items[];
	public var sell_menu : Items[];
	public var purchase_menu : Items[];
	protected var curItem : Items;
	protected var item_amount_per_menu : int;
	protected var current_page : String;
	
	protected var player : Attributes;
	private var purchasing : boolean = false;
	private var sell : boolean = false;
	private var selling : boolean = false;
	
	protected var sections : String[];
	protected var menu_num : int;
	
	var store_name : String;
	
	function Start() {
		sell = false;
		if(!store_name) store_name == "Empty Store";
		if(!current_menu) current_menu = new Items[12];
	}
	
	function Populate(menu_items : Items[], new_name : String) {
		sell = false;
		name = new_name;
		purchase_menu = new Items[menu_items.Length];
		current_menu = new Items[purchase_menu.Length];
		for(var i = 0; i < menu_items.Length; i++) {
			purchase_menu[i] = menu_items[i];
			current_menu[i] = purchase_menu[i];
		}
	}
	
	function OnGUI() {
		if(sell)
		{
			if(GUI.Button(new Rect(Screen.width/2 + 320, Screen.height / 10, 75, 35), "Buy")) 
			{
				current_menu = new Items[purchase_menu.Length];
				current_menu = purchase_menu;
				sell = false;
			}
		}
		else
	 	{
			 if(GUI.Button(new Rect(Screen.width/2 + 320, Screen.height / 10, 75, 35), "Sell")) 
			 {
				current_menu = Inventory.Get_Backpack();
				sell = true;
			}
		}
		GUI.BeginGroup(new Rect(Screen.width/2 - 310, Screen.height / 10, 630, 530));
		GUI.Box(new Rect(10, 10, 600, 420), name);
		for(i = 0; i < current_menu.Length; i++) {
			if(current_menu[i])
			{
				if(GUI.Button(new Rect((200 * (i % 3)) + 20, (100 * Mathf.Floor(i / 3)) + 35, 90, 90), new GUIContent(current_menu[i].Get_Name(), current_menu[i].Get_Tooltip())))
				{
					curItem = current_menu[i];
					if(sell) 
					{
						selling = true;
					}
					else
					{
						purchasing = true;
					}
				}
				GUI.Label(new Rect((200 * (i % 3)) + 110, (100 * Mathf.Floor(i / 3)) + 30, 100, 200), GUI.tooltip);
				GUI.tooltip = null;
			} else
			{
				GUI.Box(new Rect((200 * (i % 3)) + 20, (100 * Mathf.Floor(i / 3)) + 35, 90, 90), "Empty");
			}
		}
		GUI.EndGroup();
		
		if(purchasing) {
			GUI.BeginGroup(new Rect(new Rect(Screen.width/2 - 500, Screen.height/3 - 100 , 200, 155)));
			if(Inventory.Get_Gold() >= curItem.Get_Price())
			{
				GUI.Box(new Rect(0, 0, 200, 100), "Purchase: "+curItem.Get_Name()+"\nfor "+curItem.Get_Price()+" gold?");
				if(GUI.Button(new Rect(10, 55, 75, 35), "Yes")){
					Inventory.Add(curItem);
					purchasing = false;
				}
				if(GUI.Button(new Rect(115, 55, 75, 35), "No")) {
					purchasing = false;
				}
			} 
			else 
			{
				GUI.Box(new Rect(0, 0, 200, 100), "You need "+(curItem.Get_Price() - Inventory.Get_Gold())+"\nmore gold to purchase:\n"+curItem.Get_Name()+".");
				if(GUI.Button(new Rect(50, 55, 75, 35), "OK")){
					purchasing = false;
				}
			}
			GUI.EndGroup();
		}
		else if(selling) 
		{
			GUI.BeginGroup(new Rect(new Rect(Screen.width/2 - 500, Screen.height/3 - 100 , 200, 155)));
			GUI.Box(new Rect(0, 0, 200, 100), "Sell: "+curItem.Get_Name()+"\nfor "+curItem.Get_Price() / 5 +" gold?");
			if(GUI.Button(new Rect(10, 55, 75, 35), "Yes")){
				Inventory.Remove(curItem);		
				selling = false;
				Inventory.Add_Gold(curItem.Get_Price() / 5);
			}
			if(GUI.Button(new Rect(115, 55, 75, 35), "No")) {
				selling = false;
			}
			GUI.EndGroup();
		}
	}
}