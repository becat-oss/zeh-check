import React, { useState, useMemo, useContext, useEffect } from "react";
import { EnergyReduction } from "src/tools/ZEH";

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

    energyReduction:number|null;
    setEnergyReduction:(energyReduction: number|null) => void;
    passEnergyReduction:boolean;
    setPassEnergyReduction:(passEnergyReduction:boolean) => void;

    uvalue:number|null;
    setUvalue:(uvalue:number|null)=>void;
    passUvalue:boolean;
    setPassUvalue:(passUvalue:boolean)=>void;
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
    generation: null,
    setGeneration:() => {},

    energyReduction:null,
    setEnergyReduction:() => {},
    passEnergyReduction:false,
    setPassEnergyReduction:() => {},

    uvalue:0.6,
    setUvalue:()=>{},
    passUvalue:true,
    setPassUvalue:()=>{},
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

    useEffect(()=>{
        const result=EnergyReduction({
            heating: heating,
            cooling: cooling,
            ventilation: ventilation,
            hotwater: hotwater,
            lighting: lighting,
        });

        const checkEnergyReduction = result>=20 ? true: false;

        setEnergyReduction(result);
        setPassEnergyReduction(checkEnergyReduction);

    },[heating,cooling,ventilation,hotwater,lighting,energyReduction]);

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
            energyReduction,
            setEnergyReduction,
            passEnergyReduction,
            setPassEnergyReduction,
            uvalue,
            setUvalue,
            passUvalue,
            setPassUvalue,
        };
    },[heating,cooling,ventilation,hotwater,lighting,others,generation,energyReduction,passEnergyReduction,uvalue,passUvalue]);

    return <ZEHCheckViewContext.Provider value={ZEHCheckViewState}>{children}</ZEHCheckViewContext.Provider>;
}

export function useZEHCheckViewContext():ZEHCheckViewState{
    return useContext(ZEHCheckViewContext);
}
