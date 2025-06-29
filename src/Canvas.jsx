import { useRef, useEffect } from 'react';

export function Canvas({width, height, onPaint, onInit, onDestroy}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (onInit) onInit(canvas, context, width, height)
        if (onPaint) onPaint(canvas, context, width, height);

        return () => {
            if (onDestroy) onDestroy(canvas, context, width, height);
        };
    }, []);

    return (
        <canvas ref={canvasRef} width={width} height={height} />
    );
}