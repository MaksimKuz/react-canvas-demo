import './App.css'
import TimePanel from "./TimePanel.tsx";

function App() {

  const blockStyle = {
        margin:"10px"}

  return (
      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
          <div style={blockStyle}><TimePanel width={500} height={700} showSeconds={true} showDate={true} /></div>
          <div>
              <div style={blockStyle}><TimePanel width={250} height={340} showSeconds={false} showDate={true}/></div>
              <div style={blockStyle}><TimePanel width={250} height={340} showSeconds={false} showDate={false}
                                                 romanNumerals={true}/></div>
          </div>
      </div>
  )
}

export default App
