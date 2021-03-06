function rangeBetween(): number {
    return Math.floor(Math.random() * 100)+ 1
}
const config = {
    X: 100,
    Y: 100
}

interface Coordinates {
    x: number,
    y: number
}

interface Dimensions {
    h: number,
    w: number
}

enum CellState {
    ALIVE = 1,
    DEATH = 0
}

class Cell {
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

class CanvasContext {
    private context;
    private dimensions: Dimensions = {w: 9, h: 9}

    constructor() {
        this.context = (document.getElementById("canvas") as HTMLCanvasElement).getContext('2d');
        this.context.fillStyle = 'rgb(200, 0, 0)';
    }

    paint(coordinates: Coordinates) {
        this.context.fillRect(coordinates.x * 10, coordinates.y * 10, this.dimensions.h, this.dimensions.w);
    }

    delete(coordinates: Coordinates) {
        this.context.clearRect(coordinates.x * 10, coordinates.y * 10, this.dimensions.h, this.dimensions.w);
    }
}

class Canvas {
    private readonly context;
    private grid: Array<Array<Cell>>;

    constructor() {
        this.context = new CanvasContext();
    }

    update() {
        for(let x = 0; x < config.X; x+= 1) {
            for(let y = 0; y < config.Y; y += 1) {
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
        this.grid = new Array(config.X);
        for(let x = 0; x < config.X; x += 1) {
            this.grid[x] = new Array<Cell>(config.Y);
            for(let y = 0; y < config.Y; y += 1) {

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

export class Game {
    private canvas: Canvas;

    init() {
       console.log("Init");
       this.canvas = new Canvas();

       this.canvas.createLife();
       setInterval(() => this.canvas.update(), 60);
    }
}