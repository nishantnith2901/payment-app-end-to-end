import axios from "axios";
import { useEffect, useState } from "react";

export function Balance(){
    const [balance, setBalance] = useState(0);
    useEffect(()=>{
        const getBalance=async()=>{
            const token=localStorage.getItem("token");
            const response=await axios.get("http://localhost:3000/api/vi/account/balance",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setBalance(response.data.balance);
        }
        getBalance();
    },[])
    return (
        <div className="font-bold flex flex-col  justify-center pl-4 pt-4 text-xl">
            Your Account Balance: ₹{balance}

        </div>

    )
}