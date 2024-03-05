import React from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { TextField, Grid } from '@mui/material'

function FormInput({ name, label, required }) {
  const { control } = useFormContext()
  const isError = false

  return (
    <Grid item xs={12} sm={6}>
      <Controller
        control={control}
        name={name}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            fullWidth
            name={name}
            {...field}
            inputRef={ref}
            label={label}
            required
          />
        )}
      />
    </Grid>
  )
}

export default FormInput
