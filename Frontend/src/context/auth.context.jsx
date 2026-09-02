import { createContext, useState, useEffect } from 'react'
import { getMe } from '../services/auth.api.js'

export const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

  const [user, setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data?.user || null);

      } catch (error) {

        setUser(null);

        console.error('Error fetching user data:', error);

      } finally {
        setLoading(false);
      }
    };

    fetchUser();

  }, []);



  return (

<AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
  {children}
</AuthContext.Provider>

  )
}