import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Axios from '@/services/axios';

const ProtectedRoute = ({children}) => {
  const [isAuth,setIsAuth] = useState(null);
  useEffect(()=>{
    Axios.get('/validate',{withCredentials:true})
    .then(()=>{
      setIsAuth(true)
      console.log(1)
    })
    .catch(()=>setIsAuth(false))

  },[])

  if(isAuth===false) return <Navigate to ='/login' replace ></Navigate>
  if(isAuth===null) return <p>Loading...</p>
  return (
    <>
    {
      children
    }
    </>
  )
}

export default ProtectedRoute