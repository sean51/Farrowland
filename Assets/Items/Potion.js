public class Potion extends Items {
	var onUse : String;
	var type : potion_type;
	var amount : int;
	
	function Potion(){
		name = "Not Found";
		onUse = "Use me babe, Abuse me baby.";
		tooltip = name+"\n"+onUse+"\n\nPrice: "+price;
	}
	function Potion (theName : String, theUse : String, thePrice : int) 
	{
		name = theName;
		onUse = theUse;
		price = thePrice;
		tooltip = name+"\n"+onUse+"\n\nPrice: "+price;
	}
	function Potion(num : int){
		switch(num){
			case 1:
				name = "Potion";
				onUse = "Heal for 10.";
				price = 10;
				type = potion_type.heal;
				amount = 10;
				break;
			case 2:
				name = "Magic Potion";
				onUse = "Increase magic by 5 for the duration of the fight.";
				price = 10;
				type = potion_type.magic_damage;
				amount = 5;
				break;
			case 3:
				name = "Damage Potion";
				onUse = "Increase magic by 5 for the duration of the fight.";
				price = 10;
				type = potion_type.damage;
				amount = 5;
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
	
	function Create_Random() : Potion{
		var rand : int = Mathf.Floor(Random.Range(1, 4));
		return new Potion(rand);
	}
}