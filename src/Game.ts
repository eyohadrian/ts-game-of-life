import {Canvas} from "./Canvas";

export class Game {
    private canvas: Canvas;

    init() {
       console.log("Init");
       this.canvas = new Canvas();

       this.canvas.createLife();
       setInterval(() => this.canvas.update(), 60);
    }
}