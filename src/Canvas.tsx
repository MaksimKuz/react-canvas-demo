
import React, {Component} from 'react';

export type CanvasProps = {
    width: number;
    height: number
}

export class Canvas extends Component<CanvasProps> {
    private _canvasRef: React.RefObject<HTMLCanvasElement>;
    private _canvas: HTMLCanvasElement | undefined;
    private _context: CanvasRenderingContext2D | undefined;

    constructor({width, height}: CanvasProps)
    {
        super({width, height});
        this._canvasRef = React.createRef() as React.RefObject<HTMLCanvasElement>;
    }

    componentDidMount() {
        this._canvas = this._canvasRef.current;
        this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;
        this.doPaint(this._canvas, this._context);
    }

    doPaint(canvas: HTMLCanvasElement, _context: CanvasRenderingContext2D)
    {
        _context.fillStyle = 'blue';
        _context.fillRect(0, 0, this.width, this.height);
    }

    repaint(){
        this.doPaint(this._canvas, this._context);
    }

    public get width(): number {
        return (this.props as CanvasProps).width;
    }

    public get height(): number {
        return (this.props as CanvasProps).height;
    }

    render() {
        return (
            <div>
                <canvas ref={this._canvasRef} width={this.width} height={this.height}/>
            </div>
        );
    }
}
