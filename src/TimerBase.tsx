import {Canvas, type CanvasProps} from "./Canvas.tsx";

export class TimerBase<T extends CanvasProps> extends Canvas<T> {
    intervalId = 0;

    componentDidMount() {
        super.componentDidMount();
        this.intervalId = setInterval(() => {
            this.update();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    update(){
        this.repaint();
    }

}