import {Canvas} from "./Canvas.jsx";

class Clock extends Canvas {

    constructor(props) {
        super(props);
    }

    doPaint(canvas, context, width, height){
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, width, height);

        context.strokeStyle = "red";
        context.lineWidth = 2.5;

        circle(context, width/2-5, width/2-5, width/2-10);
        circle(context, width/2, width/2, width/2-10);
    }


}

function circle(context, x, y, radius){
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.stroke();
}

export default Clock;