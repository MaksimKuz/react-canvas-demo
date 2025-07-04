import {TimerBase} from "./TimerBase.tsx";

type TimerProps = {
    width: number;
    height: number;
    showSeconds?: boolean;
    backStyle: string;
    textStyle: string
}

export class Timer extends TimerBase<TimerProps> {

    private showColon: boolean = true;

    constructor(props: TimerProps)
    {
        super(props);
    }

    doPaint(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D)
    {
        // если нет секунд, то мигать двоеточием
        if (!this.props.showSeconds) this.showColon = !this.showColon;

        const centerX = this.width / 2;
        const centerY = this.height / 2;

        context.fillStyle = this.props.backStyle;
        context.fillRect(0, 0, this.width, this.height);


        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = this.props.textStyle;
        let text = this.getCurrentTimeStr();
        if (!this.showColon) text = text.replace(':', ' ').replace(':', ' ');
        context.font = `normal ${this.height*2/3}px Arial `;
        context.fillText(text, centerX, centerY)
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