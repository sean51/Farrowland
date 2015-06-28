#pragma strict

public static var show : boolean = false;

public class Inventory_GUI extends MonoBehaviour
{
	private var state : inventory_state = inventory_state.idle;
	private var clicked : int = 0;
	private var backpack : Items[];
	private var equipped : Items[];
	private var spells : Items[];
	private var button_text : String = "INVENTORY";
	
	private static var INVENTORY_HEIGHT: float = Screen.height/3.5;
	private static var INVENTORY_WIDTH: float = Screen.width/1.5;
	private static var INVENTORY_START_Y: float = Screen.height/1.5;
	private static var INVENTORY_START_X: float = Screen.width/6;
	
	public static var ITEM_WIDTH: float = INVENTORY_WIDTH / 10.7;
	public static var ITEM_START_Y: float = INVENTORY_HEIGHT / 10;
	public static var ITEM_START_X: float = INVENTORY_WIDTH / 40;
	public static var ITEM_HEIGHT: float = (INVENTORY_HEIGHT - ITEM_START_Y) / 3;
	
	private static var EQUIPPED_HEIGHT: float = INVENTORY_HEIGHT;
	private static var EQUIPPED_WIDTH: float = (ITEM_WIDTH * 2) + (ITEM_START_X * 2);
	private static var EQUIPPED_START_Y: float = 0f;
	private static var EQUIPPED_START_X: float = 0f;
	
	private static var INFO_HEIGHT: float = INVENTORY_HEIGHT;
	public static var INFO_WIDTH: float = 100f;
	private static var INFO_START_Y: float = 0f;
	private static var INFO_START_X: float = EQUIPPED_WIDTH;
	
	private static var BACKPACK_HEIGHT: float = INVENTORY_HEIGHT;
	private static var BACKPACK_WIDTH: float = INVENTORY_WIDTH - EQUIPPED_WIDTH - INFO_WIDTH;
	private static var BACKPACK_START_Y: float = 0f;
	private static var BACKPACK_START_X: float = EQUIPPED_WIDTH + INFO_WIDTH;
	
	private static var TOGGLE_HEIGHT: float = Screen.height/3.5;
	private static var TOGGLE_WIDTH: float = Screen.width/10;
	private static var TOGGLE_START_Y: float = Screen.height/1.5;
	private static var TOGGLE_START_X: float = Screen.width/15;
	
	function Populate(new_pack : Items[], new_equip : Items[], new_spells : Items[])
	{
		backpack = new_pack;
		equipped = new_equip;
		spells = new_spells;
	}
	
	function Start () 
	{

	}

	function Update () 
	{

	}

	function Move_Item(item_1 : int, item_2 : int)
	{
		var first_item : Items;
		var second_item : Items;
		if(backpack[item_1] != null)
		{
			first_item = backpack[item_1];
		}
		if(backpack[item_2] != null)
		{
			second_item = backpack[item_2];
		}
		backpack[item_1] = second_item;
		backpack[item_2] = first_item;
	}
	
	function Move_Spell(item_1 : int, item_2 : int)
	{
		var first_item : Items;
		var second_item : Items;
		if(spells[item_1] != null)
		{
			first_item = spells[item_1];
		}
		if(spells[item_2] != null)
		{
			second_item = spells[item_2];
		}
		spells[item_1] = second_item;
		spells[item_2] = first_item;
	}
	
	function Equip_Item(new_item : int, old_item : int)
	{
		var first_item : Items;
		var second_item : Items;
		if(backpack[new_item] != null)
		{
			first_item = backpack[new_item];
		}
		if(equipped[old_item] != null)
		{
			second_item = equipped[old_item];
		}
		backpack[new_item] = second_item;
		equipped[old_item] = first_item;
	}
	
	function Add_Item(new_item : Items)
	{
		for (var i : int = 0; i < backpack.length; i++)
		{
			if (backpack[i] == null)
			{
				backpack[i] = new_item;
				break;
			}
		}
	}
	
	function Add_Spell(new_item : Items)
	{
		for (var i : int = 0; i < spells.length; i++)
		{
			if (spells[i] == null)
			{
				spells[i] = new_item;
				break;
			}
		}
	}
	
	function OnGUI ()
	{
		if(GUI.Button (new Rect (TOGGLE_START_X, TOGGLE_START_Y, TOGGLE_WIDTH, TOGGLE_HEIGHT), button_text))
		{
			show = !show;
			state = inventory_state.idle;
			if(show)
			{
				button_text = "LOG";
			}
			else
			{
				button_text = "INVENTORY";
			}
		}

		if(show)
		{
			GUI.BeginGroup(new Rect(INVENTORY_START_X, INVENTORY_START_Y, INVENTORY_WIDTH, INVENTORY_HEIGHT));
				GUI.BeginGroup(new Rect(EQUIPPED_START_X, EQUIPPED_START_Y, EQUIPPED_WIDTH, EQUIPPED_HEIGHT));
					GUI.Box(new Rect(EQUIPPED_START_X, EQUIPPED_START_Y, EQUIPPED_WIDTH, EQUIPPED_HEIGHT), "EQUIPPED");
					for(var i : int = 0; i < 6; i++)
					{
						if(equipped[i] != null)
						{
							if(GUI.Button (new Rect (ITEM_START_X + (ITEM_WIDTH * (i % 2)), ITEM_START_Y + (ITEM_HEIGHT * (i % 3)) , ITEM_WIDTH, ITEM_HEIGHT), new GUIContent("ITEM", equipped[i].Get_Tooltip())))
							{
								if(state == inventory_state.idle)
								{
									clicked = i;
									state = inventory_state.clicked_equipped;
								}
								else if(state == inventory_state.clicked_backpack)
								{
									Equip_Item(clicked, i);
									state = inventory_state.idle;
								}
								else if (state == inventory_state.clicked_equipped)
								{
									state = inventory_state.idle;
								}
							}
						}
						else
						{
							if(GUI.Button (new Rect (ITEM_START_X + (ITEM_WIDTH * (i % 2)), ITEM_START_Y + (ITEM_HEIGHT * (i % 3)) , ITEM_WIDTH, ITEM_HEIGHT), "EMPTY"))
							{
								if(state == inventory_state.idle)
								{
									clicked = i;
									state = inventory_state.clicked_equipped;
								}
								else if(state == inventory_state.clicked_backpack)
								{
									Equip_Item(clicked, i);
									state = inventory_state.idle;
								}
								else if (state == inventory_state.clicked_equipped)
								{
									state = inventory_state.idle;
								}
							}
						}
					}
				GUI.EndGroup();
				GUI.BeginGroup(new Rect(BACKPACK_START_X, BACKPACK_START_Y, BACKPACK_WIDTH, BACKPACK_HEIGHT));
					GUI.Box(new Rect(0, 0, BACKPACK_WIDTH, BACKPACK_HEIGHT), "BACKPACK");
					for(i = 0; i < 6; i++)
					{
						if(spells[i] != null)
						{
							if (GUI.Button (new Rect (ITEM_START_X + (ITEM_WIDTH * i), ITEM_START_Y, ITEM_WIDTH, ITEM_HEIGHT), new GUIContent("SPELL", spells[i].Get_Tooltip())))
							{
								if (state == inventory_state.idle)
								{
									clicked = i;
									state = inventory_state.clicked_spell;
								}
								else if (state == inventory_state.clicked_spell)
								{
									Move_Spell(clicked, i);
									state = inventory_state.idle;
								}
							}
						}
						else
						{
							if (GUI.Button (new Rect (ITEM_START_X + (ITEM_WIDTH * i), ITEM_START_Y, ITEM_WIDTH, ITEM_HEIGHT), "EMPTY"))
							{
								if (state == inventory_state.idle)
								{
									clicked = i;
									state = inventory_state.clicked_spell;
								}
								else if (state == inventory_state.clicked_spell)
								{
									Move_Spell(clicked, i);
									state = inventory_state.idle;
								}
							}
						}
					}
					for(i = 0; i < 12; i++)
					{
						if(backpack[i] != null)
						{
							if(GUI.Button (new Rect (ITEM_START_X + (ITEM_WIDTH * (i % 6)), ITEM_START_Y + ITEM_HEIGHT + (ITEM_HEIGHT * (i / 6)), ITEM_WIDTH, ITEM_HEIGHT), new GUIContent("ITEM", backpack[i].Get_Tooltip())))
							{
								if(state == inventory_state.idle)
								{
									clicked = i;
									state = inventory_state.clicked_backpack;
								}
								else if(state == inventory_state.clicked_backpack)
								{
									Move_Item(clicked, i);
									state = inventory_state.idle;
								}
								else if (state == inventory_state.clicked_equipped)
								{
									Equip_Item(i, clicked);
									state = inventory_state.idle;
								}
							}
						}
						else
						{
							if(GUI.Button (new Rect (ITEM_START_X + (ITEM_WIDTH * (i % 6)), ITEM_START_Y + ITEM_HEIGHT + (ITEM_HEIGHT * (i / 6)) , ITEM_WIDTH, ITEM_HEIGHT), "EMPTY"))
							{
								if(state == inventory_state.idle)
								{
									clicked = i;
									state = inventory_state.clicked_backpack;
								}
								else if(state == inventory_state.clicked_backpack)
								{
									Move_Item(clicked, i);
									state = inventory_state.idle;
								}
								else if (state == inventory_state.clicked_equipped)
								{
									Equip_Item(i, clicked);
									state = inventory_state.idle;
								}
							}
						}
					}
				GUI.EndGroup();
				GUI.BeginGroup(new Rect(INFO_START_X, INFO_START_Y, INFO_WIDTH, INFO_HEIGHT));
					GUI.Box(new Rect(0, 0, INFO_WIDTH, INFO_HEIGHT), "INFO");
					if(GUI.tooltip != "")
					{
						GUI.Label(new Rect(0, ITEM_START_Y, INFO_WIDTH, INFO_HEIGHT), GUI.tooltip);
					}
				GUI.EndGroup();
			GUI.EndGroup();
		}
	}
}

public static class Inventory
{
	var relay : Inventory_GUI;
	
	public function Set(linked_object : Inventory_GUI)
	{
		relay = linked_object;
	}
	
	public function Add (new_item : Items)
	{
		relay.Add_Item(new_item);
	}
	
	public function Add_Spell (new_item : Items)
	{
		relay.Add_Spell(new_item);
	}
}