import { tileClasses } from '../constants/Tile.settings';

export interface TILE_PROPS {
    key: number;
    className: string;
    tile: TILE_STATE;
}

export interface TILE_STATE {
    id: string;
    available: boolean;
    classes: tileClasses;
    defined: boolean;
    updated: boolean;
    initial: boolean;
    neighbors: number;
    rowIndex: number;
    columnIndex: number;
    type: string;
}