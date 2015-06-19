public class Weapon extends Items 
{
	var damage : int;
	var speed : int;
	var defense : int;
	
	function Weapon()
	{
		name = "Not Found";
		damage = 0;
		speed = 0;
		defense = 0;
		price = 0;
		tooltip = name+"\nDamage: "+damage+"\nSpeed: "+speed+"\nDefense: "+defense+"\n\nPrice: "+price;
	}
	
	function Weapon(new_name : String, new_damage : int, new_speed : int)
	{
		name = new_name;
		damage = new_damage;
		speed = new_speed;
	}
	
	function Weapon(num : int)
	{
		switch(num){
			case 1:
				name = "Sword";
				damage = 6;
				speed = 2;
				defense = 0;
				price = 13;
				break;
			case 2:
				name = "Axe";
				damage = 6;
				speed = 4;
				defense = 0;
				price = 10;
				break;
			case 3:
				name = "Mace";
				damage = 7;
				speed = 6;
				defense = 0;
				price = 10;
				break;
			case 4:
				name = "Shield";
				damage = 0;
				speed = 3;
				defense = 3;
				price = 8;
				break;
			case 5:
				name = "Staff";
				damage = 3;
				speed = 1;
				defense = 2;
				price = 15;
				break;
			default:
				name = "Not Found";
				damage = 0;
				speed = 0;
				defense = 0;
				health = 0;
		}
		tooltip = name+"\nDamage: "+damage+"\nSpeed: "+speed+"\nDefense: "+defense+"\n\nPrice: "+price;
	}
	
	function Create_Random() : Weapon{
		var rand : int = Mathf.Floor(Random.Range(1, 5));
		return new Weapon(rand);
	}
}