public class Shop_GUI extends MonoBehaviour{
	protected var weapon_menu : Items[];
	protected var armor_menu : Items[];
	protected var amulet_menu : Items[];
	protected var potion_menu : Items[];
	protected var scroll_menu : Items[];
	protected var magic_menu : Items[];
	protected var current_menu : Items[];
	protected var curItem : Items;
	protected var menu : Object[];
	protected var menu_type : boolean[] = [false, false, false, false, false, false]; // weapons, armor, amulet, potion, scroll, magic
	protected var item_amount_per_menu : int;
	protected var current_page : String;
	
	protected var player : Attributes;
	protected var purchasing : boolean = false;
	
	function Start() {
		item_amount_per_menu = 12;
		//menu = new Items[4, 0];
		weapon_menu = new Items[item_amount_per_menu];
		armor_menu = new Items[item_amount_per_menu];
		amulet_menu = new Items[item_amount_per_menu];
		potion_menu = new Items[item_amount_per_menu];
		scroll_menu = new Items[item_amount_per_menu];
		magic_menu = new Items[item_amount_per_menu];
		
		menu_type = [false, false, false, false, false, false];
		
		for(var i = 0; i < weapon_menu.Length; i++) {
			//Create Weapon Menu
			weapon_menu[i] = Weapon_Generator.Generate();
			
			//Create Armor Menu
			armor_menu[i] = Armor_Generator.Generate();
			
			//Create Amulet Menu
			amulet_menu[i] = Amulet_Generator.Generate();
			
			//Create Potion Menu
			potion_menu[i] = new Potion();
			potion_menu[i] = potion_menu[i].Create_Random();
			
			//Create Scroll Menu
			scroll_menu[i] = new Scroll();
			scroll_menu[i] = scroll_menu[i].Create_Random();
			
			//Create Magic Menu
			magic_menu[i] = new Magic();
			magic_menu[i] = magic_menu[i].Create_Random();
		}
		menu = [weapon_menu, armor_menu, amulet_menu, potion_menu, scroll_menu, magic_menu];
	}
	
	function Set(the_player : Hero) 
	{
		player = the_player;
	}
	function OnGUI() {
	}
}