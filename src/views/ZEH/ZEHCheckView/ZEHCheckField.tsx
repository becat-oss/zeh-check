import React from "react";
import { FormControl, Input, InputAdornment, makeStyles, Theme, createStyles, TextField } from "@material-ui/core";
import { useZEHCheckViewContext } from "./ZEHCheckViewContext";

const useStyles=makeStyles((theme:Theme)=>
    createStyles({
        form:{
            "& > *":{
                margin: theme.spacing(3),
                width:400,
            },
        },
    }),
);

export default function ZEHCheckField(){
    const{ uvalue,setUvalue,generation,setGeneration } = useZEHCheckViewContext();
    const classes=useStyles();
    return(
        <>
            <form className={classes.form}>
                <TextField 
                    id="pv-generation"
                    label="2.PV発電量"
                    value={generation}
                    InputProps={{
                        'aria-label': 'PV',
                        endAdornment:<InputAdornment position="end">MJ</InputAdornment>,
                    }}
                    onChange={(e)=>setGeneration(Number(e.target.value))}
                    variant="outlined"
                />
                <TextField 
                    id="uvalue"
                    label="3.外皮平均熱貫流率"
                    value={uvalue}
                    InputProps={{
                        'aria-label': 'uvalue',
                        endAdornment:<InputAdornment position="end">W/m2K</InputAdornment>,
                    }}
                    onChange={(e)=>setUvalue(Number(e.target.value))}
                    variant="outlined"
                />
            </form>
            
        </>
    );
}