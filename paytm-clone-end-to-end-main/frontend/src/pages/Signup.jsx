import { useState } from "react"
import { BottomWarning } from "../components/bottomWarning"
import {Button} from "../components/button "
import { Heading } from "../components/heading"
import { InputBox } from "../components/inputBox"
import { SubHeading } from "../components/subHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export function Signup(){
    const navigate=useNavigate();
    const [firstName, setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const [error, setError]=useState("");
    const signupHandler=async()=>{
        if(!isValidFirstName(firstName)){
            setError("First name must be at least 3 characters long");
            return;
        }
        if(!isValidLastName(lastName)){
            setError("Last name must be at least 3 characters long");
            return;
        }
        if(!isValidUsername(username)){
            setError("username must be in email format");
            return;
        }
        if(!isValidPassword(password)){
            setError("password must be at least 6 characters long");
            return;
        }
        setIsLoading(true);
        try{
            await axios.post("http://localhost:3000/api/vi/user/signup", {
            username, firstName, lastName, password
        })
        navigate("/signin");
        }
        catch(error){
            console.error("Sign-up error:", error);
            setError("Username already exists. Please try again.");
        }
        finally{
            setIsLoading(false);
        }
        
    }
    const isValidUsername=function(username){
        const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return usernameRegex.test(username);

    }
    const isValidPassword=function(password){
        const passwordRegex = /^.{6,}$/;
        return passwordRegex.test(password);
    }
    const isValidFirstName=function(firstName){
        return firstName.length>=3;
    }
    const isValidLastName=function(lastName){
        return lastName.length>=3;
    }
    
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
                    <Heading label={"Sign Up"}/>
                    <SubHeading label={"Enter your credentials to create a new account"}/>
                    <InputBox onChange={e=>{
                        setFirstName(e.target.value);
                    }} placeholder="Satyam" label={"First Name"} />
                    <InputBox onChange={e=>{
                        setLastName(e.target.value);
                    }} placeholder="Chauhan" label={"Last Name"}/>
                    <InputBox onChange={e=>{
                        setUsername(e.target.value);
                    }} placeholder="satyamchauhan@example.com" label={"Email"}/>
                    <InputBox onChange={e=>{
                        setPassword(e.target.value);
                    }} placeholder="min 6 characters" label={"Password"}/>
                    {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                    <div className="pt-4" >
                        <Button onClick={signupHandler} label={"Sign Up"} disable={isLoading}/>
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}