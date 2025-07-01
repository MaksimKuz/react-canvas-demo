import {Canvas, type CanvasProps} from "./Canvas.tsx";

class Clock extends Canvas
{
    constructor(props: CanvasProps)
    {
        super(props);
    }

    doPaint(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D)
    {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, this.width, this.height);

        const radius = Math.min(this.width, this.height)/2-2;
        circle(context, this.width/2, this.height/2, radius);
    }
}

function circle(context: CanvasRenderingContext2D, x: number, y: number, radius: number){
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
}

export default Clock;