public class Magic_Shop extends Area {
	var shop : Shop_GUI;
	var items : Items[];
	function Magic_Shop (current_shop : Shop_GUI) {
		my_type = gui_type.shop;
		shop = current_shop;
		items = new Items[12];
	}
	
	function Begin() 
	{
		if(!items[0])
		{
			for (var i = 0; i < items.Length; i++) {
				items[i] = new Magic();
				items[i] = items[i].Create_Random();
			}
		}
		shop.Populate(items, "Magic");
	}
}