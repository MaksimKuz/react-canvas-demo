
import React, {Component, useRef} from 'react';

export class Canvas extends Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
    }

    doPaint(canvas, context, width, height){
        context.fillStyle = 'red';
        context.fillRect(0, 0, width, height);
    }

    componentDidMount() {
        this.canvas = this.canvasRef.current;
        this.context = this.canvas.getContext('2d');

        this.doPaint(this.canvas, this.context, this.props.width, this.props.height);
    }

    render() {
        return (
            <div>
                <canvas ref={this.canvasRef} width={this.props.width} height={this.props.height}/>
            </div>
        );
    }
}
