import React, {Component} from 'react';

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.getCurrentTimeStr(),
        };
    }

    render() {
        return (
            <h1>
                {this.state.value}
            </h1>
        );
    }

    intervalId = 0;

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({value: this.getCurrentTimeStr()});
       }, 1000);
    }

    getCurrentTimeStr() {
        const date = Date.now();
        let formatter;
        if (this.props.showSeconds)
            formatter = new Intl.DateTimeFormat('ru-RU',
                {hour: '2-digit', minute: '2-digit', second: '2-digit'});
       else
            formatter = new Intl.DateTimeFormat('ru-RU',
                {hour: '2-digit', minute: '2-digit'});
        return formatter.format(date);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
}

export default Timer;