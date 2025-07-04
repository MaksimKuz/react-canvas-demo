import {TimerBase} from "./TimerBase.tsx";

type TimerProps = {
    width: number;
    height: number;
    showSeconds?: boolean;
    backStyle: string;
    textStyle: string
}

export class Timer extends TimerBase<TimerProps> {

    doPaint(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D)
    {
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        context.fillStyle = this.props.backStyle;
        context.fillRect(0, 0, this.width, this.height);

        context.font = "normal "+30+"pt Arial ";
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = this.props.textStyle;
        context.fillText(this.getCurrentTimeStr(), centerX, centerY)
    }

    getCurrentTimeStr()
    {
        let formatter;
        if (this.props.showSeconds === undefined || this.props.showSeconds)
            formatter = new Intl.DateTimeFormat('ru-RU',
                {hour: '2-digit', minute: '2-digit', second: '2-digit'});
       else
            formatter = new Intl.DateTimeFormat('ru-RU',
                {hour: '2-digit', minute: '2-digit'});
        return formatter.format(Date.now());
    }
}