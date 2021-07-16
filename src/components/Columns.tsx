import React from "react";
import DataSheet from "src/components/DataSheet";
import { toDataSheet } from "src/utils/datasheet";

const columns = 51;
const numbers = new Array(columns).fill(0).map((_, i) => i ? columns - i : "階数");

export default function Colums() {
  return (
    <DataSheet
      data={toDataSheet(numbers)}
      setData={() => {}}
      cellProps={{ style: { backgroundColor: "#aaa", textAlign: "center" }}}
    />
  );
}
