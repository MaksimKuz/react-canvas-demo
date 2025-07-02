import React, {Component} from 'react';

export type TimerProps = {
    width: number;
    height: number;
    showSeconds?: boolean;
}

type TimerState = {
    displayText: string
}

export class Timer extends Component<TimerProps, TimerState> {

    constructor({width, height, showSeconds = true}: TimerProps) {
        super({width, height, showSeconds});
        this.state = {
            displayText: this.getCurrentTimeStr(),
        };
    }

    render() {
        return (
            <h1>
                {this.state.displayText}
            </h1>
        );
    }

    intervalId = 0;

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({displayText: this.getCurrentTimeStr()});
       }, 500);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    getCurrentTimeStr() {
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