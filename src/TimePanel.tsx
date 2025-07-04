import React from 'react';
import Clock from "./Clock.tsx";
import {Timer} from "./Timer.tsx";

export type TimePanelProps = {
    width: number;
    height: number;
    showSeconds: boolean;
    showDate: boolean;
}

export default function TimePanel({width, height, showSeconds, showDate}: TimePanelProps) {
    return (
        <div>
            <Clock width={width} height={height*2/3} showSecondsArrow={showSeconds} showDate={showDate} borderWidth={30}/>
            <Timer width={width} height={height/3} showSeconds={showSeconds} backStyle={'lightgray'} textStyle={'black'}/>
        </div>
    );
}
