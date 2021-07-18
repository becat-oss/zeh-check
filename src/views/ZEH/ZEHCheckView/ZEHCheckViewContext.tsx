import React, { useState, useMemo, useContext, useEffect } from "react";
import { CalcSubTotal } from "src/tools/ZEH";

export type rowData={
    design: number | null;
    base: number | null;
}

interface ZEHCheckViewState {
    heating: rowData;
    setHeating:(heating: rowData) => void;
    cooling: rowData;
    setCooling:(cooling: rowData) => void;
    ventilation: rowData;
    setVentilation:(ventilation: rowData) => void;
    hotwater: rowData;
    setHotwater:(hotwater: rowData) => void;
    lighting: rowData;
    setLighting:(lighting: rowData) => void;
    others: number|null;
    setOthers:(others: number|null) => void;
    generation: number|null;
    setGeneration:(generation: number|null) => void;

    subTotal: rowData;
    setSubTotal:(subTotal: rowData)=>void;

    energyReduction:number|null;
    setEnergyReduction:(energyReduction: number|null) => void;
    passEnergyReduction:boolean;
    setPassEnergyReduction:(passEnergyReduction:boolean) => void;

    uvalue:number|null;
    setUvalue:(uvalue:number|null)=>void;
    passUvalue:boolean;
    setPassUvalue:(passUvalue:boolean)=>void;

    generationPercentage: number;
    setGenerationPercentage:(generationPercentage: number) => void;
    passNearlyZEH:boolean;
    setPassNearlyZEH:(passNearlyZEH:boolean)=>void;
    passZEH:boolean;
    setPassZEH:(passZEH:boolean)=>void;
    grade: ZEHgrade;
    setGrade:(grade: ZEHgrade)=>void;
}

const initialState: ZEHCheckViewState={
    heating: {design:1000,base:1200},
    setHeating:() => {},
    cooling: {design:1000,base:1200},
    setCooling:() => {},
    ventilation: {design:1000,base:1200},
    setVentilation:() => {},
    hotwater: {design:1000,base:1200},
    setHotwater:() => {},
    lighting: {design:600,base:1200},
    setLighting:() => {},
    others: null,
    setOthers:() => {},
    generation: 0,
    setGeneration:() => {},

    subTotal: {design:4600,base:6000},
    setSubTotal:() => {},

    energyReduction:null,
    setEnergyReduction:() => {},
    passEnergyReduction:false,
    setPassEnergyReduction:() => {},

    uvalue:0.6,
    setUvalue:()=>{},
    passUvalue:true,
    setPassUvalue:()=>{},

    generationPercentage: 0,
    setGenerationPercentage:() => {},
    passNearlyZEH:false,
    setPassNearlyZEH:() => {},
    passZEH:false,
    setPassZEH:()=>{},
    grade: 'ZEH oriented',
    setGrade:() => {},
};

export const ZEHCheckViewContext = React.createContext<ZEHCheckViewState>(initialState);

interface ZEHCheckViewProviderProps {
    children: React.ReactNode;
}

export interface EnergyReductionInput{
    heating:rowData;
    cooling:rowData;
    ventilation: rowData;
    hotwater: rowData;
    lighting: rowData;
}

export interface ZEHconditions{
    passUvalue:boolean;
    passEnergyReduction:boolean;
    passNearlyZEH:boolean;
    passZEH:boolean;
}

export type ZEHgrade='ZEH'|'nearly ZEH'|'ZEH oriented'|'未達成'

export function ZEHCheckViewProvider({children}:ZEHCheckViewProviderProps):React.ReactElement{
    const [heating,setHeating]=useState(initialState.heating);
    const [cooling,setCooling]=useState(initialState.cooling);
    const [ventilation,setVentilation]=useState(initialState.ventilation);
    const [hotwater,setHotwater]=useState(initialState.hotwater);
    const [lighting,setLighting]=useState(initialState.lighting);
    const [others,setOthers]=useState(initialState.others);
    const [generation,setGeneration]=useState(initialState.generation);
    const [energyReduction,setEnergyReduction]=useState(initialState.energyReduction);
    const [passEnergyReduction,setPassEnergyReduction]=useState(initialState.passEnergyReduction);
    const [uvalue,setUvalue]=useState(initialState.uvalue);
    const [passUvalue,setPassUvalue]=useState(initialState.passUvalue);
    const [subTotal,setSubTotal]=useState(initialState.subTotal);
    const [generationPercentage,setGenerationPercentage]=useState(initialState.generationPercentage);
    const [passNearlyZEH,setPassNearlyZEH]=useState(initialState.passNearlyZEH);
    const [passZEH,setPassZEH]=useState(initialState.passZEH);
    const [grade,setGrade]=useState(initialState.grade);

    useEffect(()=>{
        const result=CalcSubTotal({
            heating: heating,
            cooling: cooling,
            ventilation: ventilation,
            hotwater: hotwater,
            lighting: lighting,
        });

        setSubTotal(result);
        
        const reduction = Math.round((result.base-result.design)/result.base*100*10)/10;
        const checkEnergyReduction = reduction>=20 ? true: false;

        setEnergyReduction(reduction);
        setPassEnergyReduction(checkEnergyReduction);

    },[heating,cooling,ventilation,hotwater,lighting,energyReduction]);

    useEffect(()=>{
        const checkUvalue = uvalue<=0.6 ? true:false;
        setPassUvalue(checkUvalue);
    },[uvalue]);

    useEffect(()=>{

        const percentage=generation!=0? Math.round(subTotal.design/generation*100):0;
        const checkNearlyZEH = percentage>=75 ? true:false;
        const checkZEH = percentage>=100 ? true:false;

        console.log('percentage',percentage);
        setGenerationPercentage(percentage);
        setPassNearlyZEH(checkNearlyZEH);
        setPassZEH(checkZEH);

    },[subTotal,generation]);

    const ZEHCheckViewState = useMemo(()=>{
        return{
            heating,
            setHeating,
            cooling,
            setCooling,
            ventilation,
            setVentilation,
            hotwater,
            setHotwater,
            lighting,
            setLighting,
            others,
            setOthers,
            generation,
            setGeneration,

            subTotal,
            setSubTotal,
            energyReduction,
            setEnergyReduction,
            passEnergyReduction,
            setPassEnergyReduction,
            uvalue,
            setUvalue,
            passUvalue,
            setPassUvalue,

            generationPercentage,
            setGenerationPercentage,
            passNearlyZEH,
            setPassNearlyZEH,
            passZEH,
            setPassZEH,
            grade,
            setGrade,
        };
    },[heating,cooling,ventilation,hotwater,lighting,others,generation,energyReduction,passEnergyReduction,uvalue,passUvalue,passNearlyZEH,passZEH,grade]);

    return <ZEHCheckViewContext.Provider value={ZEHCheckViewState}>{children}</ZEHCheckViewContext.Provider>;
}

export function useZEHCheckViewContext():ZEHCheckViewState{
    return useContext(ZEHCheckViewContext);
}
