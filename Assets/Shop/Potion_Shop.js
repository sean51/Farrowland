﻿public class Potion_Shop extends Area {
	var shop : Shop_GUI;
	function Potion_Shop (current_shop : Shop_GUI) {
		my_type = gui_type.shop;
		shop = current_shop;
	}
	
	function Begin() 
	{
		
		var items : Items[] = new Items[12];
		for (var i = 0; i < items.Length; i++) {
			items[i] = new Potion();
			items[i] = items[i].Create_Random();
		}
		shop.Populate(items, "Potions");
	}
}	
