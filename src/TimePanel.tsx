import React from 'react';
import Clock from "./Clock.tsx";
import {Timer, type TimerProps} from "./Timer.tsx";

export default function TimePanel(props: TimerProps) {
    return (
        <div>
            <Clock width={props.width} height={props.height*2/3}/>
            <Timer width={props.width} height={props.height/3} showSeconds={props.showSeconds}/>
        </div>
    );
}
