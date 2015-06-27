public class Magic extends Items {
	var desc : String;
	function Magic(){
		name = "Not Found";
		desc = "404";
		tooltip = name+"\n"+desc+"\n\nPrice: "+price;
		
	}
	function Magic(num : int){
		switch(num){
			case 1:
				name = "Fireball";
				desc = "Burn an enemy";
				price = 15;
				break;
			case 2:
				name = "Flames";
				desc = "Burn all enemies";
				price = 20;
				break;
			case 3:
				name = "Frostbolt";
				desc = "Chance to freeze enemy";
				price = 20;
				break;
			case 4:
				name = "Heal";
				desc = "Heal yourself";
				price = 25;
				break;
			case 5:
				name = "Teleport";
				desc = "Chance to teleport out of battle";
				price = 50;
				break;
			default:
				name = "Not Found";
				damage = 0;
				speed = 0;
				defense = 0;
				health = 0;
		}
		tooltip = name+"\n"+desc+"\n\nPrice: "+price;
	}
	
	function Create_Random() : Magic{
		var rand : int = Mathf.Floor(Random.Range(1, 5));
		return new Magic(rand);
	}
}