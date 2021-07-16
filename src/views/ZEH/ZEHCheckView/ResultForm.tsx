import React, { useState, useCallback } from "react";
import { createStyles, FormControl, TextField } from "@material-ui/core";
import { useZEHCheckViewContext } from "./ZEHCheckViewContext";
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

type Category = 'heating'|'cooling'|'ventilation';

type Case = 'design' | 'base';

interface DataSource {
    heating: number | null;
    cooling: number | null;
    baseHeating: number | null;
    baseCooling: number | null;
}

const createData = (source: DataSource): Data => {
    const data: Data =[];
    console.log(source);
    data.push({category:'heating',design:source.heating,base:source.baseHeating});
    data.push({category:'cooling',design:source.cooling,base:source.baseCooling});
    
    return data;
};

function fromData(data: Data,category: Category, designCase:Case):number{
    const values = data.filter(
        dataset => dataset.category === category,
    );
    return values[designCase];
}

const ResultForm: React.VFC=() => {
    const{ heating, setHeating,cooling, setCooling,baseHeating,setBaseHeating, baseCooling,setBaseCooling }=useZEHCheckViewContext();
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
            baseHeating,
            baseCooling,
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
            setHeating(fromData(values,'heating','design'));
            setCooling(fromData(values,'cooling','design'));
            setBaseHeating(fromData(values,'heating','base'));
            setBaseCooling(fromData(values,'cooling','base'));
        },
        [setHeating,setCooling,setBaseHeating,setBaseCooling],
    );

    return(
        <>
            <DataSheetGrid lockRows data={data} columns={columns} onChange={handleChange}/>
        </>
    );
};

export default ResultForm;