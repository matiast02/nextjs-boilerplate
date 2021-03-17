import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import axios from 'axios'

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      const user = await axios.post('http://127.0.0.1:8000/api/auth/login',
        {
         
            password: credentials.password,
            email: credentials.email
         
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        })
        .catch( error  => console.log(error));

      if (user.data) {
        return user
      } else {
        //return null
        //redirect to login page with errors
        throw '/signin?error=' + user.response.data.message;
      }
    },
    pages: {
        signIn : "/auth/signin",
    }
  })
]

const callbacks = {
  // Getting the JWT token from API response
  async jwt(token, user) {
    if (user) {
        token.accessToken = user.data.access_token
    }
    
    return token
},

async session(session, token) {
    session.accessToken = token.accessToken
    return session
  }
}

const options = {
  providers,
  callbacks
}

export default (req, res) => NextAuth(req, res, options)