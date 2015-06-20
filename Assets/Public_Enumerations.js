#pragma strict

public enum gui_type {nav, fight, quest, town};

public enum battle_state {hero_turn, enemy_turn, won, lost, next, idle, done};

public enum turn_state {idle, targeting};

public enum inventory_state {clicked_backpack, clicked_equipped, idle};