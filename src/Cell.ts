import {Coordinates} from "./Coordinates";
import {CellState} from "./CellState";
import {CanvasContext} from "./CanvasContext";
import {rangeBetween} from "./utils/rangeBetween";

export class Cell {
    private readonly _coordinates: Coordinates;
    private _state: CellState;
    private _context: CanvasContext;

    get state() {
        return this._state
    }

    set state(state: CellState) {
        this._state = state;

        switch (this._state) {
            case CellState.ALIVE: this._context.paint(this.coordinates); break;
            case CellState.DEATH: this._context.delete(this.coordinates); break;
            default: throw ("State does not exist");
        }
    }

    get coordinates() {
        return this._coordinates;
    }

    constructor(coordinates: Coordinates, context: CanvasContext) {
        this._coordinates = coordinates;
        this._context = context;
        this.state = rangeBetween() > 95 ? CellState.ALIVE : CellState.DEATH
    }

    isAlive() {
        return this.state === CellState.ALIVE;
    }

    isDead() {
        return this.state === CellState.DEATH;
    }

    kill() {
        this.state = CellState.DEATH;
    }

    born() {
        this.state = CellState.ALIVE
    }
}