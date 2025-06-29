import './App.css'
// @ts-ignore
import {Canvas} from './Canvas.jsx';
import {useEffect} from "react";

function App() {

  const myPaint =
      (canvas, context, width, height) =>
      {
        context.fillStyle = 'red';
        context.fillRect(0, 0, width, height);
      }

    let ch;
    function myInit(canvas, context, width, height)
    {
        const clickHandler = () =>
        {
            context.fillStyle = 'blue';
            context.fillRect(0, 0, width, height);
        };
        canvas.addEventListener('click', clickHandler); ch = clickHandler;
    }

    const myDestroy =
      (canvas, context, width, height) =>
      {
         canvas.removeEventListener('click', ch);
      }

  return (
    <Canvas width={500} height={500} onPaint={myPaint} onInit={myInit} onDestroy={myDestroy} />
  )
}

export default App
