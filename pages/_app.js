import { Provider } from 'next-auth/client'
import 'tailwindcss/tailwind.css'


function MyApp({ Component, pageProps }) {
  console.log("env", process.env.NEXT_PUBLIC_API_ENDPOINT);
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
