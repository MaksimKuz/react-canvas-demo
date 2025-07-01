import './App.css'
// @ts-ignore
import {Canvas} from './Canvas.jsx';
import Timer from "./Timer.jsx";
import Clock from "./Clock.jsx";

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

  const blockStyle = {
        margin:"10px"}

  return (
      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
          <div style={blockStyle}>
              <Canvas width={500} height={200} onPaint={myPaint} onInit={myInit}
                     onDestroy={myDestroy}/>
          </div>
          <div style={blockStyle}>
              <Canvas width={300} height={300} onPaint={myPaint} onInit={myInit}
                     onDestroy={myDestroy}/>
          </div>
          <div style={blockStyle}><Timer showSeconds={true}/></div>
          <div style={blockStyle}><Timer/></div>
          <div style={blockStyle}><Clock width={300} height={300} onPaint={myPaint} /></div>
      </div>
  )
}

export default App
