import React from 'react';
import TextField from "@mui/material/TextField";
import {useController, UseControllerProps} from "react-hook-form";


interface Props extends UseControllerProps {
    label: string;
}


const AppTextInput = (props: Props) => {
    const {fieldState, field} = useController({...props, defaultValue: ''})
    return (
        <TextField
            {...props}
            {...field}
            fullWidth
            variant = 'outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        >
        </TextField>
    );
};

export default AppTextInput;