import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../components/button ";
export function InsufficientBalance(){
    const [searchParams]=useSearchParams()
    const navigate=useNavigate();
    return (
        <div className="flex flex-col justify-center h-screen">
        <div className="bg-white te-300 h-20 flex items-center justify-center px-4">
    <div className="rounded-lg bg-white w-80 p-4">
        <h1 className="text-2xl font-bold text-center">Transaction NOT Successful</h1>
        <p className="text-center">You dont have sufficient balance</p>
    </div>
    <div>
    <Button onClick={() => {
        navigate("/dashboard?firstName=" + searchParams.get("firstName"));
    }} label={"Go to Dashboard"} />
    </div>
</div>
</div>

    )

}