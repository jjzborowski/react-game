import * as React from 'react';
import { Component } from 'react';
import './Tile.scss';
import {
    TILE_PROPS,
    TILE_STATE
} from '../../interfaces/Tile.interfaces';

/** Class representing a Tile */
class Tile extends Component<TILE_PROPS, TILE_STATE> {
    /**
     * Create a Tile.
     * @param {TILE_PROPS} props - Properties passed from parent.
     */
    constructor(props: TILE_PROPS) {
        super(props);
    }

    /**
     * Assemble and return a string representing active classes for a Tile.
     * @return {string} The string representing active classes for a Tile.
     */
    getTileClassList = (): string => {
        return 'tile' +
                (this.props.tile.defined ? ' tile-defined' : '') +
                (this.props.tile.available && !this.props.tile.defined ? ' tile-available' : '') +
                (this.props.tile.classes.top ? ' tile-top' : '') +
                (this.props.tile.classes.right ? ' tile-right' : '') +
                (this.props.tile.classes.left ? ' tile-left' : '') +
                (this.props.tile.classes.bottom ? ' tile-bottom' : '');
    };
    /**
     * Assemble and return a JSX element with corners borders of a Tile.
     * @return {JSX.Element} JSX element with corners borders of a Tile.
     */
    getTileCornersBorder = (): JSX.Element => {
        return (
                <div>
                    { this.props.tile.classes.topLeft || this.props.tile.classes.top || this.props.tile.classes.left
                            ? <span className={ 'tile-top-left' }/>
                            : null }
                    { this.props.tile.classes.topRight || this.props.tile.classes.top || this.props.tile.classes.right
                            ? <span className={ 'tile-top-right' }/>
                            : null }
                    { this.props.tile.classes.bottomLeft || this.props.tile.classes.bottom || this.props.tile.classes.left
                            ? <span className={ 'tile-bottom-left' }/>
                            : null }
                    { this.props.tile.classes.bottomRight || this.props.tile.classes.bottom || this.props.tile.classes.right
                            ? <span className={ 'tile-bottom-right' }/>
                            : null }
                </div>
        );
    };

    render() {
        return (
                <div
                        id={ this.props.tile.id }
                        className={ this.getTileClassList() }
                        style={ { 'backgroundColor': this.props.tile.type } }
                >
                    { this.getTileCornersBorder() }
                    { this.props.tile.rowIndex } { this.props.tile.columnIndex }
                    <br/>
                    { +this.props.tile.updated }
                </div>
        );
    }
}

export default Tile;

