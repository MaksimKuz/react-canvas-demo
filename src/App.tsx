import './App.css'
// @ts-ignore
import {Canvas} from './Canvas.jsx';
import Timer from "./Timer.jsx";

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
      <div style={{"display":"flex"}}>
          <Canvas style={{"margin":"10px"}} width={500} height={300} onPaint={myPaint} onInit={myInit} onDestroy={myDestroy}/>
          <Canvas width={200} height={600} onPaint={myPaint} onInit={myInit} onDestroy={myDestroy}/>
          <Timer/>
      </div>
  )
}

export default App
