import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
export const INITIAL_USER = {
    id: '',
    email: '',
    name: '',
    username: '',
    imageUrl: '',
    bio: '',
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthincated: false,
    setUser : () => {},
    setIsAuthenticated : () => {},
    checkAuthUser : async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);
const AuthProvider = ({children} : {children : ReactNode}) => {
      
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthincated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();
   
   const checkAuthuser = async () => {
      
    try{
       const currentAccount = await getCurrentUser();
       if(currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        })

        setIsAuthenticated(true);
        return true;
    }
    // No user found, redirect to login
    setIsAuthenticated(false);
    navigate('/sign-in');
    return false;
    
  }
    catch(error){
      console.log(error);
      return false;
    }
    finally{
      setIsLoading(false);
    }

   };


   useEffect(() => {
     // localStorage.getItem('cookieFallback') === 'null'
    if(
    localStorage.getItem('cookieFallback') === '[]'
    ) navigate('/sign-in')

    checkAuthuser();
}, []);

// useEffect(() => {
//   const currentPath = window.location.pathname; // Get current route path

//   // Skip redirect for /sign-up route and other public routes
//   if (currentPath !== '/sign-up' && !localStorage.getItem('cookieFallback')) {
//       navigate('/sign-in');
//   } else {
//       checkAuthuser(); // Perform authentication check on all other routes
//   }
// }, []);
   const value = {
    user,
    setUser,
    isLoading,
    isAuthincated,
    setIsAuthenticated,
    checkAuthuser
   }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);


