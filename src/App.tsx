import './App.css'
// @ts-ignore
import Timer from "./Timer.jsx";
import {Canvas} from './Canvas.tsx';
import Clock from "./Clock.tsx";

function App() {

    // let ch;
    // function myInit(canvas, context, width, height)
    // {
    //     const clickHandler = () =>
    //     {
    //         context.fillStyle = 'blue';
    //         context.fillRect(0, 0, width, height);
    //     };
    //     canvas.addEventListener('click', clickHandler); ch = clickHandler;
    // }
    //
    // const myDestroy =
    //   (canvas, context, width, height) =>
    //   {
    //      canvas.removeEventListener('click', ch);
    //   }

  const blockStyle = {
        margin:"10px"}

  return (
      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
          <div style={blockStyle}>
              <Canvas width={500} height={200} />
          </div>
          <div style={blockStyle}>
              <Canvas width={300} height={300} />
          </div>
          <div style={blockStyle}><Timer showSeconds={true}/></div>
          <div style={blockStyle}><Timer/></div>
          <div style={blockStyle}><Clock width={300} height={200} /></div>
          <div style={blockStyle}><Clock width={200} height={300} /></div>
      </div>
  )
}

export default App
