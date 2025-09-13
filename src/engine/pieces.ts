export type Color = 'W' | 'B';

// P: Pawn, R: Rook, N: Knight, B: Bishop, Q: Queen, K: King
export type PieceType = 'P' | 'R' | 'N' | 'B' | 'Q' | 'K';

export interface Piece {
    type: PieceType;
    color: Color;
}