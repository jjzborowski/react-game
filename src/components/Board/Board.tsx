import * as React from 'react';
import { Component } from 'react';
import './Board.scss';
import {
    BOARD_PROPS,
    BOARD_STATE
} from '../../interfaces/Board.interfaces';
import {
    boardInitialState,
    BOARD_SETTINGS
} from '../../constants/Board.settings';
import {
    tileClasses,
    tileInitialState,
    neighborsPositions
} from '../../constants/Tile.settings';
import Tile from '../Tile/Tile';

class Board extends Component<BOARD_PROPS, BOARD_STATE> {
    constructor(props: any) {
        super(props);
        this.state = new boardInitialState();
    }

    // BOARD INITIALIZATION
    private initBoardData = (): void => {
        this.setTilesPool();
        this.setInitialTile();
        this.addLeadingRow();
        this.addTrailingRow();
        this.addLeadingColumn();
        this.addTrailingColumn();
        this.setBoardData();
    };
    private setTilesPool = () => {
        this.setState(state => {
            const tilesPool = [];
            const activeTiles = [];
            let index = 0;
            Object.entries(BOARD_SETTINGS.tiles)
            .forEach((elem) => {
                for (let i = elem[1].amount; i > 0; i--) {
                    index++;
                    tilesPool.push(new tileInitialState({
                        id: index,
                        type: elem[0]
                    }));
                }
            });
            for (let i = 0; i < 3; i++) {
                activeTiles.push(Math.floor(Math.random() * tilesPool.length));
            }
            return {
                tilesPool: tilesPool,
                activeTiles: activeTiles
            };
        });
    };
    private setInitialTile = (): void => {
        console.log('-----setInitialTile-----');
        this.setState(() => {
            const boardData = [
                [
                    new tileInitialState({
                        defined: true,
                        initial: true,
                        type: 'black'
                    })
                ]
            ];
            return { boardData: boardData };
        });
    };
    private setBoardData = (): void => {
        console.log('-----setBoardData-----');
        this.setState(state => {
            const boardData = [...state.boardData];
            boardData.forEach((row: tileInitialState[], rowIndex: number) => {
                row.forEach((tile: tileInitialState, columnIndex: number) => {
                    this.setTileData(boardData, tile, rowIndex, columnIndex);
                });
            });
            return { boardData: boardData };
        });
    };
    private setTileData = (boardData: tileInitialState[][], tile: tileInitialState, rowIndex: number, columnIndex: number): void => {
        console.log('-----setTileData-----');
        if (!tile.updated) {
            tile.rowIndex = rowIndex;
            tile.columnIndex = columnIndex;
            this.updateClasses(boardData, tile, rowIndex, columnIndex);
            if (!tile.defined) {
                tile.available = tile.neighbors > 0;
            }
            tile.updated = true;
        }
    };
    private updateClasses = (boardData: tileInitialState[][], tile: tileInitialState, rowIndex: number, columnIndex: number) => {
        tile.neighbors = 0;
        tile.classes = new tileClasses();
        Object.entries(new neighborsPositions(rowIndex, columnIndex).neighbors)
        .forEach((neighbor) => {
            if (boardData[neighbor[1].rowIndex]) {
                if (this.isDefined(boardData, neighbor[1].rowIndex, neighbor[1].columnIndex)) {
                    tile.classes[neighbor[0]] = true;
                    tile.neighbors++;
                }
            }
        });
    };
    private isDefined = (boardData: tileInitialState[][], rowIndex: number, columnIndex: number): boolean => {
        if (boardData[rowIndex]) {
            const tile = boardData[rowIndex][columnIndex];
            return tile && tile.defined;
        } else {
            return false;
        }
    };
    // BOARD TRANSFORMATION
    private addLeadingRow = (): void => {
        console.log('-----addLeadingRow-----');
        this.setState(state => {
            const boardData = [...state.boardData];
            boardData[0].forEach((tile: tileInitialState) => {
                tile.updated = false;
            });
            boardData.unshift([]);
            return { boardData: this.populateRow(boardData, 0) };
        });
    };
    private addTrailingRow = (): void => {
        console.log('-----addTrailingRow-----');
        this.setState(state => {
            const boardData = [...state.boardData];
            boardData[boardData.length - 1].forEach((tile: tileInitialState) => {
                tile.updated = false;
            });
            boardData.push([]);
            return { boardData: this.populateRow(boardData, boardData.length - 1) };
        });
    };
    private populateRow = (boardData: tileInitialState[][], rowIndex: number): tileInitialState[][] => {
        console.log('-----populateRow-----');
        for (let columnIndex = 0; columnIndex < boardData[1].length; columnIndex++) {
            boardData[rowIndex].push(new tileInitialState());
        }
        return boardData;
    };
    private addLeadingColumn = (): void => {
        console.log('-----addLeadingColumn-----');
        this.setState(state => {
            const boardData = [...state.boardData];
            boardData.forEach(row => {
                row[0].updated = false;
                row.unshift(new tileInitialState());
            });
            return { boardData: boardData };
        });
    };
    private addTrailingColumn = (): void => {
        console.log('-----addTrailingColumn-----');
        this.setState(state => {
            const boardData = [...state.boardData];
            boardData.forEach(row => {
                row[row.length - 1].updated = false;
                row.push(new tileInitialState());
            });
            return { boardData: boardData };
        });
    };
    private addTile = (rowIndex: number, columnIndex: number): void => {
        console.log('-----addTile-----');
        if (!this.state.mouseDrag) {
            const boardData = [...this.state.boardData];
            const tile = boardData[rowIndex][columnIndex];
            if (!tile.defined && tile.available) {
                this.setState(state => {
                    tile.defined = true;
                    tile.updated = true;
                    tile.available = false;
                    tile.type = 'black';
                    return {
                        boardData: boardData,
                        tileIndex: state.tileIndex + 1
                    };
                });
                this.updateBoard(rowIndex, columnIndex);
            }
        }
    };
    private updateBoard = (rowIndex: number, columnIndex: number): void => {
        console.log('-----updateBoard-----');
        const boardData = [...this.state.boardData];
        if (rowIndex === 0) {
            this.addLeadingRow();
        } else if (rowIndex === boardData.length - 1) {
            this.addTrailingRow();
        }
        if (columnIndex === 0) {
            this.addLeadingColumn();
        } else if (columnIndex === boardData[rowIndex].length - 1) {
            this.addTrailingColumn();
        }
        if (rowIndex > 0 && rowIndex < boardData.length - 1 && columnIndex > 0 && columnIndex < boardData[rowIndex].length) {
            this.setForUpdate(rowIndex, columnIndex);
        }
        this.setBoardData();
    };
    private setForUpdate = (rowIndex: number, columnIndex: number) => {
        console.log('-----setForUpdate-----');
        this.setState(state => {
            const boardData = [...state.boardData];
            Object.entries(new neighborsPositions(rowIndex, columnIndex).neighbors)
            .forEach((neighbor) => {
                if (boardData[neighbor[1].rowIndex]) {
                    boardData[neighbor[1].rowIndex][neighbor[1].columnIndex].updated = false;
                }
            });
            return { boardData: boardData };
        });
    };
    private getBoardTransform = (): any => {
        console.log('-----getBoardTransform-----');
        return {
            'transform': `translate(${ this.state.viewPositionX }px, ${ this.state.viewPositionY }px) scale(${ this.state.zoom })`
        };
    };
    // BOARD MOVEMENT
    private boardDragStart = (event: React.MouseEvent<HTMLDivElement>): void => {
        const mousePositionX = event.clientX;
        const mousePositionY = event.clientY;
        this.setState(() => ({
            mouseDrag: true,
            mouseStartPositionX: mousePositionX,
            mouseStartPositionY: mousePositionY
        }));
    };
    private boardDragMove = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (this.state.mouseDrag) {
            const mousePositionX = event.clientX;
            const mousePositionY = event.clientY;
            this.setState(state => ({
                viewPositionX: mousePositionX - state.mouseStartPositionX,
                viewPositionY: mousePositionY - state.mouseStartPositionY
            }));
        }
    };
    private boardDragStop = (): void => {
        this.setState(() => ({
            mouseDrag: false
        }));
    };
    private viewHorizontalMove = (factor: number): void => {
        this.setState(state => ({
            viewPositionX: state.viewPositionX + 100 * factor
        }));
    };
    private viewVerticalMove = (factor: number): void => {
        this.setState(state => ({
            viewPositionY: state.viewPositionY + 100 * factor
        }));
    };
    private zoomIn = (): void => {
        this.setState(state => ({
            zoom: state.zoom + BOARD_SETTINGS.zoom.ratio
        }));
    };
    private zoomOut = (): void => {
        this.setState(state => ({
            zoom: state.zoom - BOARD_SETTINGS.zoom.ratio
        }));
    };
    private zoomReset = (): void => {
        this.setState(() => ({
            zoom: BOARD_SETTINGS.zoom.initial
        }));
    };
    private viewReset = (): void => {
        this.setState(() => ({
            viewPositionX: 0,
            viewPositionY: 0,
            zoom: BOARD_SETTINGS.zoom.initial
        }));
    };
    private dragTile = (event) => {
        event.dataTransfer.setData('tile', event.target.id);
        console.log(event.target.id);
    };
    private dropTile = (event) => {
        event.preventDefault();
        console.log(event.dataTransfer.getData('tile'));
    };
    private renderActiveTiles = () => {
        console.log('------renderActiveTiles-----');
        return this.state.tilesPool.map((tile: tileInitialState, tileIndex) => {
            if (this.state.activeTiles.includes(tileIndex)) {
                return <Tile
                        key={ tileIndex }
                        className={ 'board-cell' }
                        tile={ tile }
                        draggable={ true }
                        onDragStart={ this.dragTile }
                />;
            } else {
                return null;
            }
        });
    };
    private renderGrid = () => {
        return this.state.boardData.map((row: tileInitialState[], rowIndex: number) => {
            const columns = row.map((tile: tileInitialState, columnIndex: number) => (
                    <Tile
                            key={ columnIndex }
                            className={ 'board-cell' }
                            tile={ tile }
                            clickEvent={ this.addTile.bind(this, rowIndex, columnIndex) }
                            onDrop={ this.dropTile }
                            onDragOver= { (event: any) => {event.preventDefault()} }
                    />));
            return (
                    <div
                            key={ rowIndex }
                            className={ 'board-row' }
                    >
                        { columns }
                    </div>
            );
        });
    };

    componentDidMount(): void {
        this.initBoardData();
    }

    render() {
        return (
                <div
                        className={ 'board' }
                        onDrop={ this.dropTile }
                >
                    <div
                            className={ 'board-wrapper' }
                            onMouseDown={ this.boardDragStart }
                            onMouseMove={ this.boardDragMove }
                            onMouseUp={ this.boardDragStop }
                            onMouseLeave={ this.boardDragStop }
                            onClick={ this.boardDragStop }
                    >
                        <div
                                className={ 'board-container' }
                                style={ this.getBoardTransform() }
                        >
                            { this.renderGrid() }
                        </div>
                    </div>

                    <div
                            className={ 'board-button board-button-top' }
                            onClick={ this.viewVerticalMove.bind(this, 1) }
                    >
                        <i className="fas fa-angle-double-up"/>
                    </div>
                    <div
                            className={ 'board-button board-button-bottom' }
                            onClick={ this.viewVerticalMove.bind(this, -1) }
                    >
                        <i className="fas fa-angle-double-down"/>
                    </div>
                    <div
                            className={ 'board-button board-button-left' }
                            onClick={ this.viewHorizontalMove.bind(this, 1) }
                    >
                        <i className="fas fa-angle-double-left"/>
                    </div>
                    <div
                            className={ 'board-button board-button-right' }
                            onClick={ this.viewHorizontalMove.bind(this, -1) }
                    >
                        <i className="fas fa-angle-double-right"/>
                    </div>

                    <div className={ 'board-buttons-panel' }>
                        <div
                                className={ 'board-button board-button-zoom-in' }
                                onClick={ this.zoomIn }
                        >
                            <i className="fas fa-search-plus"/>
                        </div>
                        <div
                                className={ 'board-button board-button-zoom-reset' }
                                onClick={ this.zoomReset }
                        >
                            <i className="fas fa-search"/>
                        </div>
                        <div
                                className={ 'board-button board-button-zoom-out' }
                                onClick={ this.zoomOut }
                        >
                            <i className="fas fa-search-minus"/>
                        </div>
                        <div
                                className={ 'board-button board-button-refresh' }
                                onClick={ this.viewReset }
                        >
                            <i className="fas fa-sync-alt"/>
                        </div>
                    </div>

                    <div className={ 'board-tiles-panel' }>
                        { this.renderActiveTiles() }
                    </div>
                </div>
        );
    }
}

export default Board;