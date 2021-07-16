import React, { useState, useMemo, useContext } from "react";

interface ZEHCheckViewState {
    heating: number|null;
    setHeating:(heating: number|null) => void;
    cooling: number|null;
    setCooling:(cooling: number|null) => void;
    ventilation: number|null;
    setVentilation:(ventilation: number|null) => void;
    hotwater: number|null;
    setHotwater:(hotwater: number|null) => void;
    lighting: number|null;
    setLighting:(lighting: number|null) => void;
    others: number|null;
    setOthers:(others: number|null) => void;
    generation: number|null;
    setGeneration:(generation: number|null) => void;

    baseHeating: number|null;
    setBaseHeating:(baseHeating: number|null) => void;
    baseCooling: number|null;
    setBaseCooling:(baseCooling: number|null) => void;
    // baseVentilation: number|null;
    // setBaseVentilation:(baseVentilation: number|null) => void;
    // baseHotwater: number|null;
    // setBaseHotwater:(baseHotwater: number|null) => void;
    // baseLighting: number|null;
    // setBaseLighting:(baseLighting: number|null) => void;
    // baseOthers: number|null;
    // setBaseOthers:(baseOthers: number|null) => void;
    // baseGeneration: number|null;
    // setBaseGeneration:(baseGeneration: number|null) => void;
}

const initialState: ZEHCheckViewState={
    heating:1000,
    setHeating:() => {},
    cooling: 1000,
    setCooling:() => {},
    ventilation: null,
    setVentilation:() => {},
    hotwater: null,
    setHotwater:() => {},
    lighting: null,
    setLighting:() => {},
    others: null,
    setOthers:() => {},
    generation: null,
    setGeneration:() => {},

    baseHeating: 1000,
    setBaseHeating:() => {},
    baseCooling: 1000,
    setBaseCooling:() => {},
    // baseVentilation: null,
    // setBaseVentilation:() => {},
    // baseHotwater: null,
    // setBaseHotwater:() => {},
    // baseLighting: null,
    // setBaseLighting:() => {},
    // baseOthers: null,
    // setBaseOthers:() => {},
    // baseGeneration: null,
    // setBaseGeneration:() => {},
}

export const ZEHCheckViewContext = React.createContext<ZEHCheckViewState>(initialState);

interface ZEHCheckViewProviderProps {
    children: React.ReactNode;
}
export function ZEHCheckViewProvider({children}:ZEHCheckViewProviderProps):React.ReactElement{
    const [heating,setHeating]=useState(initialState.heating);
    const [cooling,setCooling]=useState(initialState.cooling);
    const [ventilation,setVentilation]=useState(initialState.ventilation);
    const [hotwater,setHotwater]=useState(initialState.hotwater);
    const [lighting,setLighting]=useState(initialState.lighting);
    const [others,setOthers]=useState(initialState.others);
    const [generation,setGeneration]=useState(initialState.generation);

    const [baseHeating,setBaseHeating]=useState(initialState.baseHeating);
    const [baseCooling,setBaseCooling]=useState(initialState.baseCooling);

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
            baseHeating,
            setBaseHeating,
            baseCooling,
            setBaseCooling,
        };
    },[heating,cooling,ventilation,hotwater,lighting,others,generation,baseHeating,baseCooling]);

    return <ZEHCheckViewContext.Provider value={ZEHCheckViewState}>{children}</ZEHCheckViewContext.Provider>
}

export function useZEHCheckViewContext():ZEHCheckViewState{
    return useContext(ZEHCheckViewContext);
}
