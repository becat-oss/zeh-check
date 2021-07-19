import React, { useState, useCallback } from "react";
import { createStyles, FormControl, TextField } from "@material-ui/core";
import { useZEHCheckViewContext, rowData } from "./ZEHCheckViewContext";
import { keyColumn, textColumn, DataSheetGrid } from "react-datasheet-grid";

type Data = {
    category: Category;
    design: number | null;
    base: number | null;
}[]

//type Category = 'heating'|'cooling'|'ventilation'|'hotwater'|'lighting';
type Category = '暖房設備'|'冷房設備'|'換気設備'|'給湯設備'|'照明設備';

type Case = 'design' | 'base';

interface DataSource {
    heating: rowData;
    cooling: rowData;
    ventilation: rowData;
    hotwater: rowData;
    lighting: rowData;
}

const createData = (source: DataSource): Data => {
    const data: Data =[];
    console.log(source);
    data.push({category:'暖房設備', ...source.heating});
    data.push({category:'冷房設備', ...source.cooling});
    data.push({category:'換気設備', ...source.ventilation});
    data.push({category:'給湯設備', ...source.hotwater});
    data.push({category:'照明設備', ...source.lighting});
    return data;
};

function fromData(data: Data,category: Category):rowData{
    const values = data.filter(
        dataset => dataset.category === category,
    ).map((d)=>{
        return {design:Number(d.design),base:Number(d.base)};
        },
    );
    return values[0];
}

const ZEHCheckForm: React.VFC=() => {
    const{ 
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
     }=useZEHCheckViewContext();

    const [data,setData]=useState<Data>(
        createData({
            heating,
            cooling,
            ventilation,
            hotwater,
            lighting,
        }),
    );

    const columns = [
        {...keyColumn('category',textColumn),title:'内訳項目',disabled: true},
        {...keyColumn('base',textColumn),title:'基準一次 [MJ]'},
        {...keyColumn('design',textColumn),title:'設計一次 [MJ]'},
    ];

    const handleChange=useCallback(
        (values:Data) =>{
            setData(values);
            setHeating(fromData(values,'暖房設備'));
            setCooling(fromData(values,'冷房設備'));
            setVentilation(fromData(values,'換気設備'));
            setHotwater(fromData(values,'給湯設備'));
            setLighting(fromData(values,'照明設備'));
        },
        [setHeating,setCooling,ventilation,hotwater,lighting],
    );

    return(
        <>
            <DataSheetGrid lockRows data={data} columns={columns} onChange={handleChange}/>
        </>
    );
};

export default ZEHCheckForm;