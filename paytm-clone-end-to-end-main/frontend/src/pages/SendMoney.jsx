import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/button ";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import axios from "axios";
import { useState } from "react";

export function SendMoney(){
    const navigate=useNavigate();
    const [searchParams]=useSearchParams();
    const name=searchParams.get("name");
    const id=searchParams.get("id");
    const firstName=searchParams.get("firstName");
    const [amount, setAmount]=useState(0);
    const [error, setError]=useState("");
    const [isLoading, setIsLoading]=useState(false);
    const onClickHandler=async()=>{
        const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber) || amount.trim() === '') {
        setError("Amount must be a number");
        return;
    }
        try{
            setIsLoading(true);
            const response=await axios.post("http://localhost:3000/api/vi/account/transfer", {
                            to: id,
                            amount
                        },{
                            headers:{
                                Authorization: `Bearer ${localStorage.getItem("token")}`
                            }
                        });
                        response.data.msg=="low balance" ? navigate("/lowbalance?firstName="+firstName) :navigate("/success?firstName="+firstName);
        }
        catch(error){
            console.error("Transfer error:", error);
            setError("Transfer failed. Please try again.");
        }
        finally{
            setIsLoading(false);
        }
    }
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
                <Heading label={"Send Money"}/>
                <SubHeading label={"To: " + name} />
                <InputBox onChange={(e)=>{
                    setAmount(e.target.value);
                }} placeholder="Enter Amount" label={"Amount (in Rs)."}/>
                {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
                <div className="pt-4" >
                    <Button onClick={onClickHandler} disabled={isLoading} label={isLoading?"Transferring":"Initiate Transfer"}/>
                </div>
            </div>
        </div>
    </div>
    )
}