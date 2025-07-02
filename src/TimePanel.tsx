import React from 'react';
import Clock from "./Clock.tsx";
import Timer from "./Timer.tsx";

export default function TimePanel(props) {
    return (
        <div>
            <Clock width={props.width} height={props.height*2/3}/>
            <Timer width={props.width} height={props.height*1/3}/>
        </div>
    );
}
