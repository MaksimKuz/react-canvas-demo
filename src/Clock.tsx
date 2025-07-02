import {Canvas} from "./Canvas.tsx";

class Clock extends Canvas
{
    constructor(width: number, height: number) {
        super({width, height});
    }

    intervalId = 0;

    componentDidMount() {
        super.componentDidMount();

        this.intervalId = setInterval(() => {
            this.repaint();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    // координаты центра часов
    centerX = 0;
    centerY = 0;
    // внешний радиус часов
    radius = 0;

    doPaint(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D)
    {
        this.radius = Math.min(this.width, this.height)/2-30;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;

        this.paintBackground(context);

        // отрисовка часов
        for (let i = 0; i < 12; i++)
        {
            const angle = 360 / 12 * i;
            const [x, y] = this.pointOnCircle(this.radius, angle);
            circle(context, x, y, 3, "black");

            context.font = "normal "+16+"pt Arial ";
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            const textRadius = this.radius + 15;
            const [textX, textY] = this.pointOnCircle(textRadius, angle);
            context.fillText(hourToText(i), textX, textY);

           if (i > 0) this.showMinuteTicks(context, i);
        }

        this.paintArrows(context);
    }

    private paintBackground(context: CanvasRenderingContext2D) {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, this.width, this.height);
        circle(context, this.centerX, this.centerY, this.radius, "white");
        circle(context, this.centerX, this.centerY, 3, "black");
    }

    /**
     * Отрисовывает стрелки часов.
     * @param context
     * @private
     */
    private paintArrows(context: CanvasRenderingContext2D) {
        const [hours, minutes, seconds] = getArrowAngles();
        const [hoursX, hoursY] = this.pointOnCircle(this.radius - 40, hours);
        line(context, this.centerX, this.centerY, hoursX, hoursY, 3);
        const [minutesX, minutesY] = this.pointOnCircle(this.radius - 10, minutes);
        line(context, this.centerX, this.centerY, minutesX, minutesY, 2);
        const [secondsX, secondsY] = this.pointOnCircle(this.radius - 5, seconds);
        line(context, this.centerX, this.centerY, secondsX, secondsY, 1);
    }

    private showMinuteTicks(context: CanvasRenderingContext2D, hour: number)
    {
        for (let i = 0; i < 10; i++) {
            let angle: number = 2 * Math.PI / 12 * hour * i - Math.PI / 2;
            let [x, y] = this.pointOnCircle(this.radius-2, angle);
            circle(context, x, y, 5, "black");
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

function circle(context: CanvasRenderingContext2D, x: number, y: number, radius: number, color: string){
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fillStyle = color;
    context.fill();
    context.closePath();
}

function line(context: CanvasRenderingContext2D, x1: number, y1: number,
              x2: number, y2: number, thickness: number){
    context.lineWidth = thickness;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

export default Clock;