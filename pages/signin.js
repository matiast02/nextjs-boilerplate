import React from 'react'
import { signIn } from 'next-auth/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Router, { useRouter } from 'next/router'

const SignIn = () => {

  const router = useRouter();
  const [loginError, setloginError] = useState(false);
  const [ session ] = useSession();
  
  useEffect(() => {

    if (session?.user) {
      Router.push('/admin/dashboard')
    }

    const error = router.query.error;
    if (error) {
      setloginError(true);
    }else{
      setloginError(false);
    }
  }, [router])

  //form validate
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema : Yup.object({
      email: Yup.string().required('Ingrese una direcciond de email').email('Ingrese una dirección valida'),
      password: Yup.string().required('Ingrese una contraseña').min(6, 'El password es demaciado corto'),
    }),
    onSubmit: values => {
      //handle login with next-auth
      signIn('credentials',
      {
        email: formik.values.email,
        password: formik.values.password,
        // The page where you want to redirect to after a 
        // successful login
        callbackUrl: `${window.location.origin}/admin/dashboard` 
      }
    )
    }
  });



    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="flex flex-col bg-gray-100 p-10 space-y-4 " onSubmit={formik.handleSubmit}>
              <h1 className="mb-5">Login</h1>
              { loginError ? 
                (<div className="bg-red-50 p-3 border-l-4 border-red-500">
                  <p>Error</p>
                  <p>{router.query.error}</p>
                </div> )
                : null }
              <div className="flex flex-col">
                <label htmlFor="emial">Email</label>
                <input 
                    name="email" 
                    value={formik.values.email} 
                    onChange={formik.handleChange} 
                    onBlur={formik.onBlur}
                />
              </div>

              { formik.touched.email && formik.errors.email ? 
                (<div>
                  <p>Error</p>
                  <p>{formik.errors.email}</p>
                </div> )
                : null }

              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.onBlur} 
                />
              </div>

              { formik.touched.password && formik.errors.email ? 
                (<div className="bg-red-50 p-3 border-l-4">
                  <p>Error</p>
                  <p>{formik.errors.password}</p>
                </div>)
                : null }

              <button className="p-2 bg-blue-500 hover:bg-blue-600" type="submit">login</button>
            </form>
        </div>
    )
}


export default SignIn;
