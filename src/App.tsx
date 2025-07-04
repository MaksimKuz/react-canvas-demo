import './App.css'
import TimePanel from "./TimePanel.tsx";

function App() {

  const blockStyle = {
        margin:"10px"}

  return (
      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
          <div style={blockStyle}><TimePanel width={500} height={700} showSeconds={true} showDate={true} /></div>
          <div style={blockStyle}><TimePanel width={200} height={300} showSeconds={false} showDate={false} /></div>

      </div>
  )
}

export default App
