public class Weapon_Shop extends Area {
	var shop : Shop_GUI;
	function Weapon_Shop (current_shop : Shop_GUI) {
		my_type = gui_type.shop;
		shop = current_shop;
	}
	
	function Begin() 
	{
		
		var items : Items[] = new Items[12];
		for (var i = 0; i < items.Length; i++) {
			items[i] = Weapon_Generator.Generate();
		}
		shop.Populate(items);
	}
}