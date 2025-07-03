import React from 'react';
import Clock from "./Clock.tsx";
import {Timer, type TimerProps} from "./Timer.tsx";

export default function TimePanel({width, height, showSeconds, showDate}) {
    return (
        <div>
            <Clock width={width} height={height*2/3} showSecondsArrow={showSeconds} showDate={showDate}/>
            <Timer width={width} height={height/3} showSeconds={showSeconds}/>
        </div>
    );
}
