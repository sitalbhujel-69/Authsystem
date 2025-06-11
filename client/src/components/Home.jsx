import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Axios from '@/services/axios'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [user,setUser] = useState(null)
  const navigate = useNavigate()
  const handleLogout = ()=>{
    
      Axios.get('/logout',{withCredentials:true})
      .then(()=>{
        navigate('/')
        console.log(`logged out successfully!`)})
      .catch(()=>console.log(`something went wrong`))
  }
  useEffect(()=>{
    axios.get('http://localhost:3000/api/users/validate',{withCredentials:true})
    .then(res=>setUser(res.data.user))
    .catch(()=>setUser(null))
  },[])
  console.log(user)
  if(user===null) return <p>Loading</p>
  return (
    <>
    <h1>welcome, {user.email}</h1>
    <Button onClick={handleLogout}>Logout</Button>
    </>
  )
}

export default Home