import React, { useState, useEffect } from 'react';
import ChartBubble from './ChartBubble';
import { bubbleChart } from "./data"
// import _ from 'lodash'


// // const data1 = [12, 36, 15, 25, 35, 10, 40];
// // const data2 = [5, 10, 15, 20, 25, 30];
// // const w = 500;
// // const h = 400;

// function App(){
//   const [data, setData] = useState([
//     { id: 1, radius: 20, color: 'red', x: 400, y: 500 },
//     { id: 2, radius: 30, color: 'green', x: 600, y: 400 },
//     { id: 3, radius: 70, color: 'orange', x: 900, y: 3600 },
//     { id: 1, radius: 40, color: 'blue', x: 100, y: 100 },
//     { id: 2, radius: 30, color: 'green', x: 5000, y: 5000 },
//     { id: 3, radius: 20, color: 'red',x: 300, y: 300 },
//     { id: 4, radius: 35, color: 'purple', x: 9000, y: 7000},
//     { id: 5, radius: 25, color: 'orange', x: 1500, y: 6250 },
//     { id: 1, radius: 40, color: 'blue', x: 100, y: 100 },
//     { id: 2, radius: 30, color: 'green', x: 5000, y: 5000 },
//     { id: 3, radius: 20, color: 'red',x: 300, y: 300 },
//     { id: 4, radius: 35, color: 'purple', x: 9000, y: 7000},
//     { id: 5, radius: 25, color: 'orange', x: 1500, y: 6250 },
//   ]);

//   return (
//     <div className='App'>
//       {/*<Chart1 data={data1} w={w} h={h} color="green"/>*/}
//       <BubbleChart data={data} />

//     </div>
    
//   )
// }

// export default App;


export default function App() {
  return (
    <div><ChartBubble
    height={1000}                // Height of Graph (Number)
    width={1000}                 // Width of Graph (Number)
    tooltipSize={10}            // Tooltip text Size (Number)
    tooltipColor={'black'}      // Tooltip text Color (String)
    tooltipFont={"sans-serif"}  // Tooltip text Font (String)
    chartData={bubbleChart}              // Chart Data (Array)            // Chart Colour set (Array)
    fillOpacity={0.7}           // Fill Opacity (Number Range - [0,1])
/></div>
  )
}
