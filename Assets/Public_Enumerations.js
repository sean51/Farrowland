#pragma strict

public enum gui_type {nav, fight, quest, town, travel, idle, weapon_shop, armor_shop, amulet_shop, potion_shop, scroll_shop, magic_shop, costco_shop};

public enum battle_state {hero_turn, enemy_turn, won, lost, next, idle, done};

public enum turn_state {idle, targeting, looting};

public enum inventory_state {clicked_backpack, clicked_equipped, idle};

public enum zone {dungeon, town};

public enum potion_type {heal, damage, armor, speed, magic_damage}

public enum scroll_type {town, manhood, protection, damage}