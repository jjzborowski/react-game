import { tileInitialState } from './Tile.settings';

export const BOARD_SETTINGS = {
    zoom: {
        initial: 1,
        ratio: 0.1
    },
    tiles: {
        red: {
            amount: 5
        },
        green: {
            amount: 10
        },
        blue: {
            amount: 7
        },
        purple: {
            amount: 6
        },
        brown: {
            amount: 3
        }
    }
};

export class boardInitialState {
    public boardData: tileInitialState[][];
    public tilesPool: tileInitialState[];
    public activeTiles: number[];
    public tileIndex: number;
    public mouseDrag: boolean;
    public mouseStartPositionX: number;
    public mouseStartPositionY: number;
    public viewPositionX: number;
    public viewPositionY: number;
    public zoom: number;

    constructor(props: any = {}) {
        this.boardData = props.boardData || [[new tileInitialState()]];
        this.tilesPool = props.tilesPool || [new tileInitialState()];
        this.activeTiles = props.activeTiles || [0, 1, 2];
        this.tileIndex = props.tileIndex || 0;
        this.mouseDrag = props.mouseDrag || false;
        this.mouseStartPositionX = props.mouseStartPositionX || 0;
        this.mouseStartPositionY = props.mouseStartPositionY || 0;
        this.viewPositionX = props.viewPositionX || 0;
        this.viewPositionY = props.viewPositionY || 0;
        this.zoom = props.zoom || BOARD_SETTINGS.zoom.initial;
    };
}