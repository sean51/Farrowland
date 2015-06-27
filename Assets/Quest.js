#pragma strict
public class Quest extends Area
{

	public var is_complete : boolean;
	public var test_area : Area = new Area();
	
	function Quest(quest_pack : Package)
	{
		var quest2_string : String = quest_pack.test_for_quest;
		var quest2_area : Area = quest_pack.test_area;
	}
	function Quest(completion : boolean, quest_taken : boolean)
	{
		is_complete = completion;
		//has_quest = quest_taken;
	}

}