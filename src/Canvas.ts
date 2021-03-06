import {Cell} from "./Cell";
import {CanvasContext} from "./CanvasContext";
import {Coordinates} from "./Coordinates";
import {CellState} from "./CellState";

export class Canvas {
    private readonly context;
    private grid: Array<Array<Cell>>;
    private readonly config = {
        X: 100,
        Y: 100
    }
    constructor() {
        this.context = new CanvasContext();
    }

    update() {
        for(let x = 0; x < this.config.X; x+= 1) {
            for(let y = 0; y < this.config.Y; y += 1) {
                const cell = this.grid[x][y];
                const neighbors = this.countNeighbors({x, y})

                if (cell.isDead() && neighbors === 3) {
                    cell.born();
                } else if(cell.isAlive() && (neighbors === 3 || neighbors === 2)) {
                    cell.isAlive();
                } else {
                    cell.kill();
                }
            }
        }
    }

    createLife() {
        this.grid = new Array(this.config.X);
        for(let x = 0; x < this.config.X; x += 1) {
            this.grid[x] = new Array<Cell>(this.config.Y);
            for(let y = 0; y < this.config.Y; y += 1) {

                this.grid[x][y] = new Cell({x, y}, this.context);

            }
        }

    }

    private countNeighbors(coordinates: Coordinates) {
        let count = 0;

        count += this.checkTop(coordinates);
        count += this.checkRight(coordinates);
        count += this.checkLeft(coordinates);
        count += this.checkBottom(coordinates);
        count += this.checkTopRigth(coordinates);
        count += this.checkTopLeft(coordinates);
        count += this.checkBotomLeft(coordinates);
        count += this.checkBottomRight(coordinates);

        return count;
    }

    private checkPosition(coorinates: Coordinates) {
        let cellState = CellState.DEATH
        try {
            cellState = this.grid[coorinates.x][coorinates.y].state
        } catch (e) {}

        return cellState;
    }

    private checkTop(coordinates: Coordinates) { return this.checkPosition({ x: coordinates.x, y: coordinates.y - 1 })}
    private checkLeft(coordinates: Coordinates) { return this.checkPosition({ x: coordinates.x - 1, y: coordinates.y})}
    private checkRight(coordinates: Coordinates) { return this.checkPosition({ x: coordinates.x + 1, y: coordinates.y})}
    private checkBottom(coordinates: Coordinates) { return this.checkPosition({ x: coordinates.x, y: coordinates.y + 1 })}
    private checkTopRigth(coordinates: Coordinates) { return this.checkPosition({ x: coordinates.x + 1, y: coordinates.y - 1 })}
    private checkTopLeft(coordinates: Coordinates) { return this.checkPosition({ x: coordinates.x - 1, y: coordinates.y - 1 })}
    private checkBottomRight(coordinates: Coordinates) { return this.checkPosition({ x: coordinates.x + 1, y: coordinates.y + 1 })}
    private checkBotomLeft(coordinates: Coordinates) { return this.checkPosition({ x: coordinates.x - 1, y: coordinates.y + 1 })}
}