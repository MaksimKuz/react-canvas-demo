import React from 'react';
import Clock from "./Clock.tsx";
import {Timer} from "./Timer.tsx";

export type TimePanelProps = {
    width: number;
    height: number;
    showSeconds: boolean;
    showDate: boolean;
    romanNumerals?: boolean;
}

export default function TimePanel({width, height, showSeconds, showDate, romanNumerals}: TimePanelProps) {
    return (
        <div>
            <Clock width={width} height={height*5/6} showSecondsArrow={showSeconds} showDate={showDate} romanNumerals={romanNumerals} />
            <Timer width={width} height={height/6} showSeconds={showSeconds} backStyle={'lightgray'} textStyle={'black'}/>
        </div>
    );
}
