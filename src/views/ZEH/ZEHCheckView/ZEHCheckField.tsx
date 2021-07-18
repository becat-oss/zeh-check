import React from "react";
import { FormControl, Input, InputAdornment } from "@material-ui/core";
import { useZEHCheckViewContext } from "./ZEHCheckViewContext";


export default function ZEHCheckField(){
    const{ uvalue,setUvalue,generation,setGeneration } = useZEHCheckViewContext();
    return(
        <>
            <FormControl>
                <Input
                    id="pv-generation"
                    value={uvalue}
                    endAdornment={<InputAdornment position="end">W/m2K</InputAdornment>}
                    inputProps={{
                        'aria-label': 'weight',
                    }}
                />
            </FormControl>
        </>
    );
}