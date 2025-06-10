import React from 'react'
import { Button } from './ui/button'
import Axios from '@/services/axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const handleLogout = ()=>{
    
      Axios.get('/logout',{withCredentials:true})
      .then(()=>{
        navigate('/')
        console.log(`logged out successfully!`)})
      .catch(()=>console.log(`something went wrong`))
  }
  return (
    <>
    <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}

export default Home