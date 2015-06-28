public class Armor_Shop extends Area {
	var shop : Shop_GUI;
	var items : Items[];
	function Armor_Shop (current_shop : Shop_GUI) {
		my_type = gui_type.shop;
		shop = current_shop;
		items = new Items[12];
	}
	
	function Begin() 
	{
		if(!items[0])
		{
			for (var i = 0; i < items.Length; i++) {
				items[i] = Armor_Generator.Generate();
			}
		}
		shop.Populate(items, "Armor");
	}
}	
