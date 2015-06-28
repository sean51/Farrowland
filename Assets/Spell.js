#pragma strict

public class Spell extends Items
{
	private var spell_number : spell_type;
	
	function Spell(new_spell : spell_type)
	{
		spell_number = new_spell;
		tooltip = "Fireball";
	}
}