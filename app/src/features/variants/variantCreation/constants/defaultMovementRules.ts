import type { MovementRules } from "@/features/variants/common/types/movementRules";

const defaultMovementRules: MovementRules = {
    white_pawn_forward: {
        forMovement: true,
        forCapture: false,
        conditions: [],
        moveDefinition: {
            moveX: 0,
            moveY: 1,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    white_pawn_double_step: {
        forMovement: true,
        forCapture: false,
        conditions: ["has_not_moved"],
        moveDefinition: {
            moveX: 0,
            moveY: 1,
            range: 1,
            moveStopConditions: []
        }
    },
    white_pawn_capture_east: {
        forMovement: false,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: 1,
            range: 1,
            moveStopConditions: []
        }
    },
    white_pawn_capture_west: {
        forMovement: false,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: 1,
            range: 1,
            moveStopConditions: []
        }
    },
    black_pawn_forward: {
        forMovement: true,
        forCapture: false,
        conditions: [],
        moveDefinition: {
            moveX: 0,
            moveY: -1,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    black_pawn_double_step: {
        forMovement: true,
        forCapture: false,
        conditions: ["has_not_moved"],
        moveDefinition: {
            moveX: 0,
            moveY: -1,
            range: 1,
            moveStopConditions: []
        }
    },
    black_pawn_capture_east: {
        forMovement: false,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: -1,
            range: 1,
            moveStopConditions: []
        }
    },
    black_pawn_capture_west: {
        forMovement: false,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: -1,
            range: 1,
            moveStopConditions: []
        }
    },
    east: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: 0,
            range: "inf",
            moveStopConditions: ["inside_piece"]
        }
    },
    west: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: 0,
            range: "inf",
            moveStopConditions: ["inside_piece"]
        }
    },
    north: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 0,
            moveY: 1,
            range: "inf",
            moveStopConditions: ["inside_piece"]
        }
    },
    south: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 0,
            moveY: -1,
            range: "inf",
            moveStopConditions: ["inside_piece"]
        }
    },
    northeast: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: 1,
            range: "inf",
            moveStopConditions: ["inside_piece"]
        }
    },
    southwest: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: -1,
            range: "inf",
            moveStopConditions: ["inside_piece"]
        }
    },
    southeast: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: -1,
            range: "inf",
            moveStopConditions: ["inside_piece"]
        }
    },
    northwest: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: 1,
            range: "inf",
            moveStopConditions: ["inside_piece"]
        }
    },
    knight_0201: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 2,
            moveY: 1,
            range: 1,
            moveStopConditions: []
        }
    },
    knight_02m1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 2,
            moveY: -1,
            range: 1,
            moveStopConditions: []
        }
    },
    knight_m201: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -2,
            moveY: 1,
            range: 1,
            moveStopConditions: []
        }
    },
    knight_m2m1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -2,
            moveY: -1,
            range: 1,
            moveStopConditions: []
        }
    },
    knight_0102: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: 2,
            range: 1,
            moveStopConditions: []
        }
    },
    knight_m102: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: 2,
            range: 1,
            moveStopConditions: []
        }
    },
    knight_01m2: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: -2,
            range: 1,
            moveStopConditions: []
        }
    },
    knight_m1m2: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: -2,
            range: 1,
            moveStopConditions: []
        }
    },
    east_1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: 0,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    west_1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: 0,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    north_1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 0,
            moveY: 1,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    south_1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 0,
            moveY: -1,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    northeast_1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: 1,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    southwest_1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: -1,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    southeast_1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: 1,
            moveY: -1,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    },
    northwest_1: {
        forMovement: true,
        forCapture: true,
        conditions: [],
        moveDefinition: {
            moveX: -1,
            moveY: 1,
            range: 1,
            moveStopConditions: ["inside_piece"]
        }
    }
}