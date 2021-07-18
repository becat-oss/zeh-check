import { rowData, EnergyReductionInput,ZEHconditions,ZEHgrade } from "src/views/ZEH/ZEHCheckView/ZEHCheckViewContext";

export function CalcSubTotal(data:EnergyReductionInput):rowData{
    let base=0;
    let design=0;
    Object.values(data).forEach((dataset:rowData)=>{
        base += dataset.base;
        design += dataset.design;
    });

    return {base:base,design:design};
}

export function checkZEHrequirement(data:ZEHconditions):ZEHgrade{
    if (!data.passUvalue || !data.passEnergyReduction){
        return '未達成';
    }else if(data.passZEH){
        return 'ZEH';
    }else if(data.passNearlyZEH){
        return 'nearly ZEH';
    }else{
        return 'ZEH oriented';
    }
}