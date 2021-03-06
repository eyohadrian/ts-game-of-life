import {Dimensions} from "./Dimensions";
import {Coordinates} from "./Coordinates";

export class CanvasContext {
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
