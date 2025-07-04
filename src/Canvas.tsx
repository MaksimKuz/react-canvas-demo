
import React, {Component} from 'react';

export type CanvasProps = {
    width: number;
    height: number
}

export class Canvas<T extends CanvasProps> extends Component<T> {
    private _canvasRef: React.RefObject<HTMLCanvasElement>;
    private _canvas?: HTMLCanvasElement;
    private _context?: CanvasRenderingContext2D;

    constructor(props: CanvasProps)
    {
        super(props as T);
        this._canvasRef = React.createRef() as React.RefObject<HTMLCanvasElement>;
    }

    componentDidMount() {
        this._canvas = this._canvasRef.current;
        this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D;
        this.doPaint(this._canvas, this._context);
    }

    /**
     * Реализация отрисовки по умолчанию.
     * @param canvas
     * @param _context
     */
    doPaint(canvas: HTMLCanvasElement, _context: CanvasRenderingContext2D)
    {
        _context.fillStyle = 'white';
        _context.fillRect(0, 0, this.width, this.height);
    }

    repaint(){
        this.doPaint(this._canvas as HTMLCanvasElement, this._context as CanvasRenderingContext2D);
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
