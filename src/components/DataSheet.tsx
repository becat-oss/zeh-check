import React from "react";
import ReactDataSheet from "react-datasheet";

export interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: number | string | null;
}

class MyReactDataSheet extends ReactDataSheet<GridElement, number> {}

type Props = {
  setData: (data: GridElement[][]) => void;
  cellProps?: Partial<ReactDataSheet.CellRendererProps<GridElement, number>>;
} & Omit<React.ComponentProps<typeof MyReactDataSheet>, 'valueRenderer'>;

export default function DataSheet({ data, setData, cellProps, ...others }: Props) {
  const cellRenderer: ReactDataSheet.CellRenderer<GridElement, number> = (props) => {
    return (
      <td
        {...props}
        {...cellProps}
        style={{
          ...props.style,
          width: 80,
          height: 29,
          verticalAlign: "middle",
          padding: 4,
          ...cellProps?.style,
        }}
      />
    );
  };

  return (
    <MyReactDataSheet
      {...others}
      data={data}
      valueRenderer={(cell) => cell.value}
      onCellsChanged={(changes) => {
        const grid = data.map((row) => [...row]);
        changes.forEach(({ cell, row, col, value }) => {
          grid[row][col] = { ...grid[row][col], value };
          cell.disableEvents = false;
        });
        setData(grid);
      }}
      cellRenderer={cellRenderer}
    />
  );
}
