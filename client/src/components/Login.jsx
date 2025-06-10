import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import Axios from "@/services/axios";
import { toast, Toaster } from "sonner";

const Login = () => {
  const [user,setUser] = useState({})
  const navigate = useNavigate()
  const handleChange = (e)=>{
    setUser(prev=>({...prev,[e.target.id]:e.target.value}))
  }
  const handleSubmit =async (e)=>{
    e.preventDefault()
    try {
      const result = await Axios.post('/login',user,{withCredentials:true});
      console.log(result)
      if(!result){
        toast('wrong password')
        return
      }
      navigate('/home')
    } catch (error) {
      console.log(error)
      toast('something went wrong')
    }
  }
  return (
    <>
      <div className="grid place-items-center h-screen">
        <Card className="max-w-sm w-full">
          <form action="" onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Login to your account
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6 mb-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="m@example.com"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input type="password" id="password" onChange={handleChange} required />
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex-col gap-2'>
              <Button className='w-full' type="submit">Login</Button>
               <Link
                      to="/"
                      className=" inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Don't have account? Please sign up 
                    </Link>
            </CardFooter>
          </form>
        </Card>
        <Toaster/>
      </div>
    </>
  );
};

export default Login;
