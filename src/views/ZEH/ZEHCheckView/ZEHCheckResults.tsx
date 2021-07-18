import React, { useState, useEffect, useMemo } from 'react';
import { Typography, makeStyles, createStyles, Theme } from "@material-ui/core";
import { useZEHCheckViewContext } from './ZEHCheckViewContext';
import { DataSheetGrid, keyColumn,textColumn } from 'react-datasheet-grid';
import { checkZEHrequirement } from 'src/tools/ZEH';

const useStyles=makeStyles((theme:Theme)=>
    createStyles({
        result:{
            "& > *":{
                margin: theme.spacing(3),
            },
        },
    }),
);

type Data ={
    category:string;
    design: string;
    standard: string;
    pass: string;
}[]

interface DataSource {
    uvalue: number;
    passUvalue: boolean;
    er: string;
    passEnergyReduction: boolean;
    generationPercentage: number;
    passNearlyZEH: boolean;
    passZEH: boolean;
}

const createData = (source:DataSource):Data => {
    const data:Data=[];
    console.log('PV',source.generationPercentage);
    data.push({category:'外皮平均熱貫流率',design:`${String(source.uvalue)}W/m2K`,standard:'0.6W/m2K',pass:source.passUvalue?'達成':'未達成'});
    data.push({category:'エネルギー消費量削減率',design:source.er,standard:'20%',pass:source.passEnergyReduction?'達成':'未達成'});
    data.push({category:'エネルギー消費量に対するPV発電量',design:`${String(source.generationPercentage)}%`,standard:'75%',pass:source.passNearlyZEH?'達成':'未達成'});
    data.push({category:'エネルギー消費量に対するPV発電量',design:`${String(source.generationPercentage)}%`,standard:'100%',pass:source.passZEH?'達成':'未達成'});

    return data;
};

const ZEHCheckResults: React.VFC=()=>{
    const classes=useStyles();
    const { 
        uvalue, 
        passUvalue,
        energyReduction,
        passEnergyReduction,
        generationPercentage,
        passNearlyZEH,
        passZEH,
        grade,
        setGrade,
    }=useZEHCheckViewContext();

    const er = useMemo(()=>{
        return `${String(energyReduction)}%`;
    },[energyReduction]);

    const [data,setData]=useState<Data>(
        createData({
            uvalue,
            passUvalue,
            er,
            passEnergyReduction,
            generationPercentage,
            passNearlyZEH,
            passZEH,
        }),
    );

    const columns =[
        { ...keyColumn('category', textColumn), title: 'チェック項目', disabled: true, minWidth:350 },
        { ...keyColumn('design', textColumn), title: '設計案', disabled: true },
        { ...keyColumn('standard', textColumn), title: '基準', disabled: true},
        { ...keyColumn('pass', textColumn), title: '結果', disabled: true },
    ];

    useEffect(()=>{
        setData(
            createData({
            uvalue,
            passUvalue,
            er,
            passEnergyReduction,
            generationPercentage,
            passNearlyZEH,
            passZEH,
        }),
        );
    },[uvalue,er,passEnergyReduction,generationPercentage,passNearlyZEH,passZEH]);

    useEffect(()=>{
        const result=checkZEHrequirement({
            passUvalue,
            passEnergyReduction,
            passNearlyZEH,
            passZEH,
        });
        setGrade(result);

    },[passUvalue,passEnergyReduction,passNearlyZEH,passZEH]);

    return(
        <>
        <div className={classes.result}>
            <Typography component="h5" variant="h5">ZEH達成状況 : {grade} </Typography>
            <DataSheetGrid lockRows data={data} columns={columns}/>
        </div>
            
        </>
    );
};

export default ZEHCheckResults;