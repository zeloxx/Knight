namespace YeakelRobert {
    export type Board = (string | null)[][];
    export type Position = [number, number];
    export type Delta = [number, number];

    export interface IKnightMoves {
        solve(): number;
    }

    export class YeakelRobert implements IKnightMoves {
        private board: Board;
        private moveDeltas: Delta[];
        private restrictedCharacters: Set<string>;
        private maxMoves: number;
        private maxRestrictedCharacters: number;

        constructor({
            board,
            moveDeltas,
            restrictedCharacters,
            maxMoves,
            maxRestrictedCharacters,
        }: {
            board: Board;
            moveDeltas: Delta[];
            restrictedCharacters: Set<string>;
            maxMoves: number;
            maxRestrictedCharacters: number;
        }) {
            this.board = board;
            this.moveDeltas = moveDeltas;
            this.restrictedCharacters = restrictedCharacters;
            this.maxMoves = maxMoves;
            this.maxRestrictedCharacters = maxRestrictedCharacters;
        }

        private isValidPosition(position: Position): boolean {
            const [x, y] = position;
            const value = this.board[x]?.[y];
            return !!value;
        }

        private getNextPosition(position: Position, delta: Delta): Position {
            return [position[0] + delta[0], position[1] + delta[1]];
        }

        private isRestrictedCharacter(position: Position): boolean {
            const [x, y] = position;
            return this.restrictedCharacters.has(this.board[x][y]!);
        }

        private knightDfs(position: Position, totalMoves = 0, badCharacterCount = 0): number {
            if (this.isRestrictedCharacter(position)) {
                badCharacterCount += 1;
            }
            if (badCharacterCount === this.maxRestrictedCharacters) {
                return 0;
            }
            if (totalMoves === this.maxMoves) {
                return 1;
            }

            let totalPaths = 0;

            for (const delta of this.moveDeltas) {
                const nextPosition = this.getNextPosition(position, delta);

                const isValidMove = this.isValidPosition(nextPosition);
                if (isValidMove) {
                    totalPaths += this.knightDfs(nextPosition, totalMoves + 1, badCharacterCount);
                }
            }

            return totalPaths;
        }

        private traverseBoard(callback: (position: Position) => void): void {
            for (let x = 0; x < this.board.length; x++) {
                const row = this.board[x];

                for (let y = 0; y < row.length; y++) {
                    const position: Position = [x, y];
                    callback(position);
                }
            }
        }

        private calculateTotalPaths(position: Position): number {
            return this.knightDfs(position);
        }

        public solve(): number {
            let totalPathsForAllCells = 0;
            this.traverseBoard((position) => {
                if (this.isValidPosition(position)) {
                    totalPathsForAllCells += this.calculateTotalPaths(position);
                }
            });
            return totalPathsForAllCells;
        }
    }
}

const KNIGHT_MOVE_DELTAS: YeakelRobert.Delta[] = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
];

const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

const board: YeakelRobert.Board = [
    ["a", "b", "c", null, "e"],
    [null, "g", "h", "i", "j"],
    ["k", "l", null, "n", "o"],
    ["p", "q", "r", "s", "t"],
    ["u", "v", null, null, "y"],
];

const knightTraversal = new YeakelRobert.YeakelRobert({
    board,
    moveDeltas: KNIGHT_MOVE_DELTAS,
    restrictedCharacters: VOWELS,
    maxMoves: 9,
    maxRestrictedCharacters: 3,
});
const totalPaths = knightTraversal.solve();
console.log(totalPaths);
