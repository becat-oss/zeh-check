import React, { useState, useEffect, useMemo } from 'react';
import { Typography } from "@material-ui/core";
import { useZEHCheckViewContext } from './ZEHCheckViewContext';
import { DataSheetGrid, keyColumn,textColumn } from 'react-datasheet-grid';


type Data ={
    category:string;
    design: string;
    standard: string;
    pass: boolean;
}[]

const ZEHCheckResults: React.VFC=()=>{
    const {energyReduction,passEnergyReduction}=useZEHCheckViewContext();
    console.log('energyReduction',energyReduction);

    const er = useMemo(()=>{
        return `${String(energyReduction)}%`;
    },[energyReduction]);

    const [data,setData]=useState<Data>(
        [
            //{category:'エネルギー消費量削減率',design:`${String(energyReduction)}%`,standard:'20%',pass:passEnergyReduction},
            {category:'外皮平均熱貫流率',design:'0.5',standard:'0.6',pass:passEnergyReduction},
            {category:'エネルギー消費量削減率',design:er,standard:'20%',pass:passEnergyReduction},
            {category:'エネルギー消費量に対するPV発電量',design:'80%',standard:'75%',pass:passEnergyReduction},
            {category:'エネルギー消費量に対するPV発電量',design:'80%',standard:'100%',pass:passEnergyReduction},
        ],
    );

    const columns =[
        { ...keyColumn('category', textColumn), title: 'チェック項目', disabled: true },
        { ...keyColumn('design', textColumn), title: '設計案', disabled: true },
        { ...keyColumn('standard', textColumn), title: '基準', disabled: true },
        { ...keyColumn('pass', textColumn), title: '結果', disabled: true },
    ];

    useEffect(()=>{
        setData([
            {category:'外皮平均熱貫流率',design:'0.5',standard:'0.6',pass:passEnergyReduction},
            {category:'エネルギー消費量削減率',design:er,standard:'20%',pass:passEnergyReduction},
            {category:'エネルギー消費量に対するPV発電量',design:'80%',standard:'75%',pass:passEnergyReduction},
            {category:'エネルギー消費量に対するPV発電量',design:'80%',standard:'100%',pass:false},
        ]);
    },[er]);

    return(
        <>
            <Typography>ZEH達成状況 Nearly ZEH</Typography>
            <DataSheetGrid lockRows data={data} columns={columns}/>
        </>
    );
};

export default ZEHCheckResults;