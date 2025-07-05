import {TimerBase} from "./TimerBase.tsx";
import type {CanvasProps} from "./Canvas.tsx";

const hourTickSize = 7;

export type ClockProps = {
    width: number;
    height: number;
    showSecondsArrow: boolean;
    showDate: boolean;
}

class Clock extends TimerBase<ClockProps>
{
    // координаты центра часов
    centerX = 0;
    centerY = 0;
    // внешний радиус часов
    radius = 0;
    fontSize = 0;
    formatter = new Intl.DateTimeFormat('ru-RU', {day: '2-digit', month: 'short'});

    doPaint(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D)
    {
        this.fontSize = this.height/20;
        context.font = `normal ${this.fontSize}px Arial`;
        const borderWidth = 4*context.measureText('3').width;
        this.radius = Math.min(this.width, this.height)/2-borderWidth;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        this.paintBackground(context);
        if (this.props.showDate) this.showDate(context);
        this.showTicks(context);
        this.showArrows(context);
    }

    private paintBackground(context: CanvasRenderingContext2D)
    {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, this.width, this.height);
        circle(context, this.centerX, this.centerY, this.radius, "white");
        circle(context, this.centerX, this.centerY, 3, "black");
    }

    private showTicks(context: CanvasRenderingContext2D)
    {
        for (let i = 0; i < 12; i++) {
            const angle = 360 / 12 * i;
            const [x1, y1] = this.pointOnCircle(this.radius-hourTickSize, angle);
            const [x2, y2] = this.pointOnCircle(this.radius, angle);
            line(context, x1, y1, x2, y2, 3);
            // circle(context, x2, y2, 3, "black");

            context.font = `normal ${this.fontSize}px Arial `;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = 'black';
            const textRadius = this.radius + 15;
            const [textX, textY] = this.pointOnCircle(textRadius, angle);
            context.fillText(hourToText(i), textX, textY);

            this.showMinuteTicks(context, i);
        }
    }

    /**
     * Отрисовывает метки минут для указанного часа.
     * @param context
     * @param hour
     * @private
     */
    private showMinuteTicks(context: CanvasRenderingContext2D, hour: number)
    {
        for (let i = 1; i < 5; i++) {
            // угол между метками - 360/60, угол между часами - 360/12
            const angle: number = 360 / 12 * hour + 360 / 60 * i;
            const [x1, y1] = this.pointOnCircle(this.radius - 6, angle);
            const [x2, y2] = this.pointOnCircle(this.radius - 2, angle);
            line(context, x1, y1, x2, y2, 2);
            // circle(context, x2, y2, 2, "black");
        }
    }

    /**
     * Отрисовывает стрелки часов.
     * @param context
     * @private
     */
    private showArrows(context: CanvasRenderingContext2D)
    {
        const [hours, minutes, seconds] = getArrowAngles();
        const [hoursX, hoursY] = this.pointOnCircle(this.radius/2*6/5, hours);
        line(context, this.centerX, this.centerY, hoursX, hoursY, 3);

        const [minutesX, minutesY] = this.pointOnCircle(this.radius - hourTickSize-2, minutes);
        line(context, this.centerX, this.centerY, minutesX, minutesY, 2);

        if (this.props.showSecondsArrow) {
            const [secondsX, secondsY] = this.pointOnCircle(this.radius - hourTickSize-2, seconds);
            line(context, this.centerX, this.centerY, secondsX, secondsY, 1);
        }
    }

    /**
     * Возвращает координаты точки на окружности указанного радиуса от центра часов и угла.
     * @param radius расстояние от центра часов
     * @param angle угол в градусах от вертикального направления
     * @private
     */
    private pointOnCircle(radius: number, angle: number)
    {
        const a = angle * 2 * Math.PI / 360 - Math.PI / 2;
        const x = this.centerX + radius * Math.cos(a);
        const y = this.centerY + radius * Math.sin(a);
        return [x, y]
    }

    private showDate(context: CanvasRenderingContext2D)
    {
        const dateText = this.formatter.format(Date.now());

        context.font = `normal ${this.fontSize*3/4}px Arial`;
        const textMetrics = context.measureText(dateText);

        context.fillStyle = 'lightgray';
        const datePanelWidth = textMetrics.width*3/2;
        const datePanelHeight = this.fontSize*3/2;
        context.fillRect(this.centerX-datePanelWidth/2,
                         this.centerY + this.radius/2-datePanelHeight/2, datePanelWidth, datePanelHeight);

        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = 'black';
        context.fillText(dateText, this.centerX, this.centerY + this.radius/2)
    }
}

function hourToText(hour: number): string
{
    if (hour === 0) return '12';
    return hour.toString()
}

function getArrowAngles()
{
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const k = 360/60
    return [hours*k*5, minutes*k, seconds*k]
}

function circle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string)
{
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function line(context: CanvasRenderingContext2D, x1: number, y1: number,
              x2: number, y2: number, thickness: number)
{
    context.lineWidth = thickness;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

export default Clock;