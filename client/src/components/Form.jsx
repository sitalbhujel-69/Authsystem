import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Form = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate()
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response = await Axios.post('/register',user)
      console.log(response.data)
      localStorage.setItem("email",user?.email)
      navigate('/verify-otp')
      setUser({})
    } catch (error) {
      console.error(error)
    }
  };
  const gotoLogin = ()=>{
    navigate('/login')
  }
  const googleLogin = ()=>{
        window.location.href = 'http://localhost:3000/auth/google';

  }
  return (
    <>
    <div className="grid place-items-center h-screen">

      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">SignUp to your account</CardTitle>
            <CardDescription>
              Enter all details below to SignUp to your account
            </CardDescription>
            <CardAction>
          <Button variant="link" onClick={gotoLogin}>Login</Button>
        </CardAction>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 mb-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  value={user.email || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  placeholder="enter fullname"
                  value={user.fullname || ""}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={user.password || ""}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              SignUp
            </Button>
            <Button variant="outline" className="w-full" onClick={googleLogin}>
              Login with Google
            </Button>
          </CardFooter>
        </form>
      </Card>
          </div>

    </>
  );
};

export default Form;
