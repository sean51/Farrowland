#pragma strict
public class Package
{
	public var test_for_quest : String;
	public var test_area : Area = new Area();
	function Package()
	{
		test_for_quest = "Hello i am a quest";
		test_area = new Area(1);
	}
}