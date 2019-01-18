export class tileClasses {
    public topLeft: boolean;
    public top: boolean;
    public topRight: boolean;
    public bottom: boolean;
    public bottomLeft: boolean;
    public bottomRight: boolean;
    public left: boolean;
    public right: boolean;
    [key: string]: boolean;

    constructor(props: any = {}) {
        this.topLeft = props.topLeft || false;
        this.top = props.top || false;
        this.topRight = props.topRight || false;
        this.bottom = props.bottom || false;
        this.bottomLeft = props.bottomLeft || false;
        this.bottomRight = props.bottomRight || false;
        this.left = props.left || false;
        this.right = props.right || false;
    }
}

export class tileInitialState {
    public id: string;
    public available: boolean;
    public classes: tileClasses;
    public defined: boolean;
    public updated: boolean;
    public initial: boolean;
    public neighbors: number;
    public rowIndex: number;
    public columnIndex: number;
    public type: string;

    constructor(props: any = {}) {
        this.id = props.id || 0;
        this.available = props.available || false;
        this.classes = props.classes || new tileClasses();
        this.defined = props.defined || false;
        this.updated = props.updated || false;
        this.initial = props.initial || false;
        this.neighbors = props.neighbors || 0;
        this.rowIndex = props.rowIndex || 0;
        this.columnIndex = props.columnIndex || 0;
        this.type = props.type || 'transparent';
    }
}

export class neighborsPositions {
    public baseRowIndex: number;
    public baseColumnIndex: number;
    public neighbors: {
        topLeft: any,
        top: any,
        topRight: any,
        left: any,
        right: any,
        bottomLeft: any,
        bottom: any,
        bottomRight: any
    };

    constructor(baseRowIndex: number, baseColumnIndex: number) {
        this.baseRowIndex = baseRowIndex;
        this.baseColumnIndex = baseColumnIndex;
        this.neighbors = {
            topLeft: {
                rowIndex: baseRowIndex - 1,
                columnIndex: baseColumnIndex - 1
            },
            top: {
                rowIndex: baseRowIndex - 1,
                columnIndex: baseColumnIndex
            },
            topRight: {
                rowIndex: baseRowIndex - 1,
                columnIndex: baseColumnIndex + 1
            },
            left: {
                rowIndex: baseRowIndex,
                columnIndex: baseColumnIndex - 1
            },
            right: {
                rowIndex: baseRowIndex,
                columnIndex: baseColumnIndex + 1
            },
            bottomLeft: {
                rowIndex: baseRowIndex + 1,
                columnIndex: baseColumnIndex - 1
            },
            bottom: {
                rowIndex: baseRowIndex + 1,
                columnIndex: baseColumnIndex
            },
            bottomRight: {
                rowIndex: baseRowIndex + 1,
                columnIndex: baseColumnIndex + 1
            }
        };
    }
}