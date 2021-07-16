import React from 'react';
import Typography from '@material-ui/core/Typography';
import { ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateColor } from 'src/utils/color';
import { amp1DOF, kdIRDT } from 'src/tools/amplification';
import { useIRDTViewContext } from './IRDTViewContext';

let iRDTAmp = [];
let Oil1Amp = [];
let Oil2Amp = [];
const ndOil = 2;
let labels = [];
const oilFmax = 2000;
const oilVmax = 0.15;
const cOil = Number((oilFmax / oilVmax).toFixed(0));

const createData = (dataLabels: (string | number)[] = [], dataSets: number[][] = [], labels = []) => {
  return {
    labels,
    datasets: dataSets.map((data, i) => {
      const color = generateColor(i * 0.2);
      return {
        label: dataLabels[i],
        data,
        backgroundColor: color,
        borderColor: color,
      };
    }),
  };
};

const options: ChartOptions = {
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display: true,
        text: '振動数比',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: '変位応答倍率',
      },
    },
  },
};

export default function Amplification() {
  const { t0, m, md, nd, cdOpt, kbOpt, error } = useIRDTViewContext();

  if (t0 && m && md && nd) {
    const k = (4 * Math.PI ** 2 * m) / t0 ** 2;
    [labels, iRDTAmp] = amp1DOF(m, 1, k, (w: number) => kdIRDT(md * nd, cdOpt * nd, kbOpt * nd, w));
    [, Oil1Amp] = amp1DOF(m, cOil * nd, k);
    [, Oil2Amp] = amp1DOF(m, cOil * nd * ndOil, k);
  }

  return (
    <>
      {!error && nd && (
        <>
          <Line id="amp" type="line" data={createData(['iRDT', `オイルダンパー${nd}基`, `オイルダンパー${nd * ndOil}基`], [iRDTAmp, Oil1Amp, Oil2Amp], labels)} options={options} />
          <Typography>
            ※オイルダンパーは減衰係数{cOil}[kNm/s/基]（最大減衰荷重{oilFmax}kN、最大速度{oilVmax}[m/s]）で算定
          </Typography>
        </>
      )}
    </>
  );
}
