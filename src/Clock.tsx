import {Canvas, type CanvasProps} from "./Canvas.tsx";
import React from "react";

class Clock extends Canvas
{
    constructor(width: number, height: number) {
        super(width, height);
        this.state = {
            value: this.getCurrentTimeStr(),
        };
    }

    getCurrentTimeStr() {
        const date = Date.now();
        let formatter;
            formatter = new Intl.DateTimeFormat('ru-RU',
                {hour: '2-digit', minute: '2-digit'});
        return formatter.format(date);
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

    doPaint(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D)
    {
        context.fillStyle = 'lightgray';
        context.fillRect(0, 0, this.width, this.height);

        const radius = Math.min(this.width, this.height)/2-30;
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        circle(context, centerX, centerY, radius, "white");
        circle(context, centerX, centerY, 3, "black");

        for (let i = 0; i < 12; i++) {
            const angle = 2 * Math.PI / 12 * i - Math.PI / 2;
            const [x, y] = pointOnCircle(centerX, centerY, radius, angle);
            circle(context, x, y, 3, "black");

            context.font = "normal "+16+"pt Arial ";
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            const textRadius = radius + 15;
            const [textX, textY] = pointOnCircle(centerX, centerY, textRadius, angle);
            context.fillText(i.toString(), textX, textY);
        }

        const [hours, minutes, seconds] = getTimeAngles();
        const [hoursX, hoursY] = pointOnCircle(centerX, centerY, radius-40, hours);
        line(context, centerX, centerY, hoursX, hoursY, 3);
        const [minutesX, minutesY] = pointOnCircle(centerX, centerY, radius-10, minutes);
        line(context, centerX, centerY, minutesX, minutesY, 2);
        const [secondsX, secondsY] = pointOnCircle(centerX, centerY, radius-5, seconds);
        line(context, centerX, centerY, secondsX, secondsY, 1);
    }
}

function getTimeAngles(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return [hours/12*2 * Math.PI- Math.PI / 2, minutes/60*2 * Math.PI- Math.PI / 2, seconds/60*2 * Math.PI- Math.PI / 2]
}

function pointOnCircle(centerX: number, centerY: number, radius: number, angle: number){
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return [x, y]
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