import { TILE_STATE } from './Tile.interfaces';

export interface BOARD_PROPS {
}

export interface BOARD_STATE {
    boardData: TILE_STATE[][];
    tilesPool: TILE_STATE[];
    activeTiles: number[];
    tileIndex: number;
    mouseDrag: boolean;
    mouseStartPositionX: number;
    mouseStartPositionY: number;
    viewPositionX: number;
    viewPositionY: number;
    zoom: number;
}