import React from 'react'
import Select from 'react-select'

/*
    if are using forkim 
    onChange={value => formik.setFieldValue('brand', value.value)} 
*/

export const CustomSelect = ({ onChange, options, value }) => {

    const defaultValue = ( options, value ) => {
        return options ? options.find( option => option.value === value) : '';
    }

    return (
        <Select
            value={defaultValue(options, value)}
            onChange={ value => onChange(value)}
            options={options}
        />
    )
}