import React, { useState, useCallback } from "react";
import { createStyles, FormControl, TextField } from "@material-ui/core";
import { useZEHCheckViewContext, rowData } from "./ZEHCheckViewContext";
import { keyColumn, textColumn, DataSheetGrid } from "react-datasheet-grid";
import DataSheet from "src/components/DataSheet";



// export default function ResultForm(){
//     return(
//         <>
//             <form>
//                 <FormControl>
//                     <TextField
//                         id=""
//                         label="暖房設備[MJ]"
//                         type="number"
//                         required
//                         value={heating}
//                         onChange={(e) => setHeating(e.target.value ? Number(e.target.value) : "")}
//                     />

//                 </FormControl>
//             </form>
//         </>
//     )
// }

type Data = {
    category: Category;
    design: number | null;
    base: number | null;
}[]

type Category = 'heating'|'cooling'|'ventilation'|'hotwater'|'lighting';

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
    data.push({category:'heating', ...source.heating});
    data.push({category:'cooling', ...source.cooling});
    data.push({category:'ventilation', ...source.ventilation});
    data.push({category:'hotwater', ...source.hotwater});
    data.push({category:'lighting', ...source.lighting});
    //console.log('data',data);
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
    // const [data,setData]=useState<Data>(
    //     [
    //         {category: '暖房設備',design:1000,base:1200},
    //         {category: '冷房設備',design:700,base:1000},
    //     ],
    // );

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
        {...keyColumn('design',textColumn),title:'設計一次 [MJ]'},
        {...keyColumn('base',textColumn),title:'基準一次 [MJ]'},
    ];

    const handleChange=useCallback(
        (values:Data) =>{
            setData(values);
            setHeating(fromData(values,'heating'));
            setCooling(fromData(values,'cooling'));
            setVentilation(fromData(values,'ventilation'));
            setHotwater(fromData(values,'hotwater'));
            setLighting(fromData(values,'lighting'));
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