import React from "react";
import { ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { generateColor } from "src/utils/color";
import { exportToCsv } from "src/utils/csv";
import { useVDWForceViewContext } from "./VDWForceViewContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
);

const createData = (
  dataLabels: (string | number)[] = [],
  dataSets: number[][] = [],
  labels = [],
) => {
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
        text: "速度[cm/s]",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "減衰力[kN]",
      },
    },
  },
};

function transpose(a: any[]) {
  return a[0].map((_, c) => a.map((r) => r[c]));
}

export default function Force() {
  const classes = useStyles();
  const { velocity, force, force2, error } = useVDWForceViewContext();

  const handleClick = () => {
    // @ts-ignore
    exportToCsv("VDW.csv", transpose([["velocity[cm/s]"].concat(velocity), ["kani[kN]"].concat(force), ["zoubun[kN]"].concat(force2)]));
  };

  return (
    <>
      {!error && (
        <>
          <Line
            id="amp"
            type="line"
            data={createData(
              ["簡易式", "増分式"],
              [force, force2],
              velocity.map((v) => v.toFixed(1)),
            )}
            options={options}
          />
          <Button
            className={classes.button}
            variant="contained"
            size="small"
            onClick={handleClick}
          >
            CSVへエクスポート
          </Button>
        </>
      )}
    </>
  );
}
