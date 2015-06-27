public class Scroll extends Items {
	var onUse : String;
	var type : scroll_type;
	var amount_incrementer : int;
	
	function Scroll(){
		name = "Not Found";
		onUse = "Use me babe, Abuse me baby.";
		tooltip = name+"\n"+onUse+"\n\nPrice: "+price;
	}
	function Scroll (theName : String, theUse : String, thePrice : int) 
	{
		name = theName;
		onUse = theUse;
		price = thePrice;
		tooltip = name+"\n"+onUse+"\n\nPrice: "+price;
	}
	function Scroll(num : int){
		switch(num){
			case 1:
				name = "Town Portal";
				onUse = "Teleport to town. Not useable in battle.";
				price = 10;
				amount_incrementer = 0;
				type = scroll_type.town;
				break;
			case 2:
				name = "Scroll of Increased Manhood";
				onUse = "We know what this does.";
				price = 10;
				amount_incrementer = 10;
				type = scroll_type.manhood;
				break;
			case 3:
				name = "Scroll of Infinite Manhood";
				onUse = "You cannot fathom the power.";
				price = 50;
				amount_incrementer = 69;
				type = scroll_type.town;
				break;
			case 4:
				name = "Scroll of Protection";
				onUse = "Negates the next attack made against you.";
				price = 50;
				amount_incrementer = 0;
				type = scroll_type.protection;
				break;
			case 5:
				name = "Scroll of Damage";
				onUse = "Empowers your next attack.";
				price = 50;
				amount_incrementer = 5;
				type = scroll_type.damage;
				break;
			default:
				name = "Not Found";
				damage = 0;
				speed = 0;
				defense = 0;
				health = 0;
		}
		tooltip = name+"\n"+onUse+"\n\nPrice: "+price;
	}
	
	function Create_Random() : Scroll{
		var rand : int = Mathf.Floor(Random.Range(1, 5));
		return new Scroll(rand);
	}
}