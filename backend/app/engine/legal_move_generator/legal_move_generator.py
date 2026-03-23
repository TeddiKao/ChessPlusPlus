
class Game:
    def __init__(self, rules: dict):
        self._rules = rules
        self._game_state = {}

        for starting_piece in rules["setup"]["starting_position"]:
            self._game_state[(starting_piece["x_pos"], starting_piece["y_pos"])] = starting_piece["piece_name"]

    def get_game_state(self, include_size: bool = False):
        if include_size:
            return (self._rules["setup"]["board_x_size"], self._rules["setup"]["board_x_size"]), self._game_state
        return self._game_state

    def update_game_state(self, piece_start_postion: tuple, piece_end_postion: tuple):
        self._game_state[piece_end_postion] = self._game_state.pop(piece_start_postion)

    def get_legal_moves(self, piece_position: tuple):
        pass
