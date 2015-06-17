#pragma strict 
public class Monster extends Attributes {
/*
	var health : setHealth(60);
	var armor : setArmor(5);
	var speed : setSpeed(2);
	var damage : setDamage(5);
	var magicDamage : setMagicDamage(5);
	var isAlive : true;
	*/
}//sadf
function TakeDamage(theDamageTaken : int) { 
	setHealth(getHealth() - theDamageTaken);
}
function DealDamage() {
	//GameObject.GetComponent<Hero>().SendMessage("TakeDamage", getDamage());
}