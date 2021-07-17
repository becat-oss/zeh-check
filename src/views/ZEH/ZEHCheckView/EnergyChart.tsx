import { useZEHCheckViewContext,EnergyReductionInput, rowData } from "./ZEHCheckViewContext";
import React from 'react';
import { Bar,Line } from 'react-chartjs-2';
import { ChartOptions } from "chart.js";
import { energyColor } from 'src/constants';

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      stack:"test",
      label: '# of Red Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: 'rgb(255, 99, 132)',
    },
    {
      stack:"test",
      label: '# of Blue Votes',
      data: [2, 3, 20, 5, 1, 4],
      backgroundColor: 'rgb(54, 162, 235)',
    },
    {
      stack:"test",
      label: '# of Green Votes',
      data: [3, 10, 13, 15, 22, 30],
      backgroundColor: 'rgb(75, 192, 192)',
    },
  ],
};

const data1={
  labels:['design','standard'],
  datasets:[
    {
      stack:"",
      label:'heating',
      data:[1000,1200],
      backgroundColor:'rgb(250, 0, 0)',
    },
    {
      stack:"",
      label:'cooling',
      data:[1000,1200],
      backgroundColor:'rgb(0, 0, 250)',
    },
  ],
};

const createData =(labels=[],data:EnergyReductionInput)=>{

  // const dataLabels=[];
  // const dataSets:[];
  return{
    labels:labels,
    datasets:Object.entries(data).map(([label, dataset])=>{
      console.log('createdata',label,dataset);
      return{
        stack:"",
        data:Object.values(dataset),
        label:label,
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
          ['design','base'],
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