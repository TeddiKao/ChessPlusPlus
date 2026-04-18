import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import useVariantsStore from "@/features/variants/common/stores/variantsStore";
import type { VariantInfo } from "@/features/variants/common/types/variants";

type Piece = {
    x: number;
    y: number;
    pieceName: string;
    pieceId: number;
};

type GameState = {
    boardXSize: number;
    boardYSize: number;
    pieces: Piece[];
};

const SESSION_ID = crypto.randomUUID();
const API = "http://localhost:8000";

export default function GamePage() {
    const navigate = useNavigate();
    const { variants, hasHydrated } = useVariantsStore();
    const variantList = Object.entries(variants);

    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [selectedSquare, setSelectedSquare] = useState<{ x: number; y: number } | null>(null);
    const [legalMoves, setLegalMoves] = useState<{ x: number; y: number }[]>([]);

    // Start game when variant is selected
    async function startGame(variantId: string, variant: VariantInfo) {
        setSelectedVariantId(variantId);
        const res = await fetch(`${API}/game/start`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId: SESSION_ID, variant }),
        });
        const state = await res.json();
        setGameState(state);
    }

    async function handleSquareClick(x: number, y: number) {
        if (!gameState) return;

        const clickedPiece = gameState.pieces.find(p => p.x === x && p.y === y);

        // If nothing selected yet — select a piece
        if (!selectedSquare) {
            if (!clickedPiece) return;
            setSelectedSquare({ x, y });
            const res = await fetch(`${API}/game/legal-moves?sessionId=${SESSION_ID}&x=${x}&y=${y}`);
            const data = await res.json();
            setLegalMoves(data.legalMoves);
            return;
        }

        // Clicked the same square — deselect
        if (selectedSquare.x === x && selectedSquare.y === y) {
            setSelectedSquare(null);
            setLegalMoves([]);
            return;
        }

        // Clicked a legal move — make the move
        const isLegal = legalMoves.some(m => m.x === x && m.y === y);
        if (isLegal) {
            const res = await fetch(`${API}/game/move`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    sessionId: SESSION_ID,
                    fromX: selectedSquare.x,
                    fromY: selectedSquare.y,
                    toX: x,
                    toY: y,
                }),
            });
            const newState = await res.json();
            setGameState(newState);
            setSelectedSquare(null);
            setLegalMoves([]);
            return;
        }

        // Clicked another piece — switch selection
        if (clickedPiece) {
            setSelectedSquare({ x, y });
            const res = await fetch(`${API}/game/legal-moves?sessionId=${SESSION_ID}&x=${x}&y=${y}`);
            const data = await res.json();
            setLegalMoves(data.legalMoves);
        }
    }

    // ── Variant selection screen ──
    if (!gameState) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full gap-4 bg-linear-to-b from-white to-purple-400">
                <h1 className="text-4xl font-bold">Select a Variant</h1>
                {!hasHydrated && <p>Loading variants...</p>}
                {hasHydrated && variantList.length === 0 && (
                    <p className="text-gray-500">No variants yet. Create one first!</p>
                )}
                <div className="flex flex-col gap-2 w-64">
                    {variantList.map(([id, variant]) => (
                        <Button key={id} onClick={() => startGame(id, variant)} className="w-full">
                            {variant.variantName}
                        </Button>
                    ))}
                </div>
                <Button variant="outline" onClick={() => navigate("/")}>Back</Button>
            </div>
        );
    }

    // ── Game board screen ──
    const { boardXSize, boardYSize, pieces } = gameState;
    const cellSize = Math.min(Math.floor(560 / boardXSize), Math.floor(560 / boardYSize));

    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 bg-linear-to-b from-white to-purple-400">
            <h1 className="text-2xl font-bold">Chess++</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${boardXSize}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${boardYSize}, ${cellSize}px)`,
                    border: "2px solid #333",
                }}
            >
                {Array.from({ length: boardYSize }, (_, row) =>
                    Array.from({ length: boardXSize }, (_, col) => {
                        const piece = pieces.find(p => p.x === col && p.y === row);
                        const isLight = (row + col) % 2 === 0;
                        const isSelected = selectedSquare?.x === col && selectedSquare?.y === row;
                        const isLegal = legalMoves.some(m => m.x === col && m.y === row);

                        return (
                            <div
                                key={`${col}-${row}`}
                                onClick={() => handleSquareClick(col, row)}
                                style={{
                                    width: cellSize,
                                    height: cellSize,
                                    backgroundColor: isSelected
                                        ? "#f6f669"
                                        : isLegal
                                        ? "#cdd16e"
                                        : isLight
                                        ? "#f0d9b5"
                                        : "#b58863",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: cellSize * 0.55,
                                    position: "relative",
                                }}
                            >
                                {isLegal && !piece && (
                                    <div style={{
                                        width: cellSize * 0.3,
                                        height: cellSize * 0.3,
                                        borderRadius: "50%",
                                        backgroundColor: "rgba(0,0,0,0.2)",
                                        position: "absolute",
                                    }} />
                                )}
                                {piece && <span title={piece.pieceName}>{piece.pieceName[0].toUpperCase()}</span>}
                            </div>
                        );
                    })
                )}
            </div>
            <Button variant="outline" onClick={() => { setGameState(null); setSelectedVariantId(null); }}>
                ← Change Variant
            </Button>
        </div>
    );
}