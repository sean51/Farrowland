#pragma strict 
public class Hero extends Attributes {
/*
	var health : setHealth(60);
	var armor : setArmor(5);
	var speed : setSpeed(2);
	var damage : setDamage(5);
	var magicDamage : setMagicDamage(5);
	var isAlive : true;
	*/
}
function TakeDamage(theDamageTaken : int) { 
	setHealth( getHealth() - theDamageTaken);
}
function DealDamage(): int 
{ 
	//GameObject.GetComponent<Monster>().SendMessage("TakeDamage", getDamage());
	return 0;
}//asdfsde