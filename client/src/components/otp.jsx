import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {Button} from '@/components/ui/button'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import { useEffect, useState } from "react";
import Axios from "@/services/axios";
import { useNavigate } from "react-router-dom";

export function InputOTPDemo() {
  const [otp,setOtp] = useState('')
  const handleOtp = (e)=>{
    setOtp(e)
  }
  const navigate = useNavigate()
  const email = localStorage.getItem("email")
  useEffect( ()=>{
    if(!email){
      navigate('/')
    }
     Axios.get(`/verify-check?email=${email}`)
     .then(res=>{
      if(!res.data.valid){
        navigate('/')
      }
     })
     .catch(()=>navigate('/'))
  },[])
  const user  = {
    email,
    otp
  }
  const handleSubmit  =async ()=>{
    try {
      const response = await Axios.post('/verify-otp',user)
      console.log(response.data);
      localStorage.removeItem("email");
      console.log('success')
      setOtp('')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex flex-col gap-2 w-sm mx-auto">
      <h1 className="text-3xl font-bold">Enter your otp</h1>
       <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={handleOtp} value={otp}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
    <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
