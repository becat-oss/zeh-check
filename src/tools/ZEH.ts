import { rowData, EnergyReductionInput } from "src/views/ZEH/ZEHCheckView/ZEHCheckViewContext";

export function EnergyReduction(data:EnergyReductionInput):number{
    let base=0;
    let design=0;
    Object.values(data).forEach((dataset:rowData)=>{
        base += dataset.base;
        design += dataset.design;
    });

    const reduction = Math.round((base-design)/base*100*10)/10;

    return reduction;
}