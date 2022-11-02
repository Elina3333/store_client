import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormContext} from "react-hook-form";
import AppTextInput from "../UI/AppTextInput";
import AppCheckBox from "../UI/AppCheckBox";

export default function AddressForm() {

    const {control,formState} = useFormContext();

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Shipping address
            </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput label='Full name' name='fullName' control={control}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput label='Last name' name='lastName' control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput label='Address line 1' name='address1' control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <AppTextInput label='Address line 2' name='address2' control={control}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput label='City' name='city' control={control}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput label='State' name='state' control={control}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput label='Zip' name='zip' control={control}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput label='Country' name='country' control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                       <AppCheckBox disabled={!formState.isDirty} label='Save as default address' name='saveAddress' control={control}/>
                    </Grid>
                </Grid>
        </>
    );
}