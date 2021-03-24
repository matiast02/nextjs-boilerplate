import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CustomSelect } from './CustomSelect'



export const ProductsForms = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]
    
 

    const formik = useFormik({
        initialValues: {
            name: '', 
            stock: 0,
            brand: 'vanilla',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Ingrese un nombre para el producto').min(3,'Ingrese al menos 3 caracteres'),
            stock: Yup.number().required('Ingrese una cantidad'),
        }),
        onSubmit: values => {
            //send form
            try {
                console.log(values)
                
            } catch (error) {
                
            }
        }
    });
    

    return (
        <form 
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-1/2"
            onSubmit={formik.handleSubmit}>
            <div className="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                    Nombre del prodcuto
                </label>
                <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                id="name" 
                name="name"
                type="text" 
                placeholder="Nombre"
                values={formik.values.name}
                onChange={formik.handleChange} 
                onBlur={formik.onBlur}
                />
                { 
                    (formik.touched.name && formik.errors.name) ?
                    (<p class="text-red-500 text-xs italic">{formik.errors.name}</p>)
                    : null
                }
            </div>
            <div className="mb-4 flex space-x-10">
                <div className="flex-initial">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="price">
                        Precio
                    </label>
                    <input 
                    className="shadow appearence-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="price" 
                    name="price"
                    values={formik.values.price}
                    onChange={formik.handleChange} 
                    onBlur={formik.onBlur}
                    />
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>

                <div className="flex-initial">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="stock">
                        Stock
                    </label>
                    <input 
                    className="shadow appearence-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="stock" 
                    name="stock"
                    values={formik.values.stock}
                    onChange={formik.handleChange} 
                    onBlur={formik.onBlur}
                    />
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>

                <div className="flex-initial">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="code">
                        Codigo
                    </label>
                    <input 
                    className="shadow appearence-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="code" 
                    name="code"
                    values={formik.values.code}
                    onChange={formik.handleChange} 
                    onBlur={formik.onBlur}
                    />
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>

            </div>

            <div className="mb-4 flex space-x-5">
                <div className="flex-auto">
                    <label className="block text-gray-700 text-sm font-bold mb-2" for="brand">
                        Marca
                    </label>
                    <CustomSelect 
                        name="brand"
                        id="brand"
                        className="shadow" 
                        options={options}
                        value={formik.values.brand}
                        onChange={value => formik.setFieldValue('brand', value.value)} 
                        onBlur={formik.onBlur}    
                    />
                    <p class="text-red-500 text-xs italic">Please choose a password.</p>
                </div>
            </div>
            
            <div className="grid justify-items-end">
                <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                type="submit"
                >Cargar
                </button>
            </div>
        </form>
    )
}
