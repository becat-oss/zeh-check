import { useZEHCheckViewContext,EnergyReductionInput, rowData } from "./ZEHCheckViewContext";
import React from 'react';
import { Bar,Line } from 'react-chartjs-2';
import { ChartOptions } from "chart.js";
import { energyColor,jp } from 'src/constants';

const createData =(labels=[],data:EnergyReductionInput)=>{

  return{
    labels:labels.map(label=>{
      return jp[label];
    }),
    datasets:Object.entries(data).map(([label, dataset])=>{
      console.log('createdata',label,dataset);
      return{
        stack:"",
        data:Object.values(dataset).reverse(),
        label:jp[label],
        backgroundColor:energyColor[label],
        };
      }),
  };
};

const options = {
  scales: {
    yAxes: [
      {
        stacked: true,
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [
      {
        stacked:true,
        barThickness: 50,
      },
    ],
  },
};

export default function EnergyChart () {
  const{ heating,cooling,ventilation,hotwater,lighting}=useZEHCheckViewContext();

  return(
    <>
      <Bar 
        type="bar" 
        data={createData(
          ['base','design'],
          {
            heating:heating,
            cooling:cooling,
            ventilation:ventilation,
            hotwater:hotwater,
            lighting: lighting,
          })} 
          options={options} />
    </>
  );
}





// export default function EnergyChart(){
//     const{ heating,cooling,ventilation,hotwater,lighting}=useZEHCheckViewContext();

//     return(
//         <>

//         </>
//     )
// }