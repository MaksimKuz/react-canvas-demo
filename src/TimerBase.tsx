import {Canvas} from "./Canvas.tsx";

export class TimerBase extends Canvas {
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