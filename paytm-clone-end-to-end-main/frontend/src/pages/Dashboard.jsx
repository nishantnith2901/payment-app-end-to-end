import {useSearchParams } from "react-router-dom";
import { AppBar } from "../components/appBar";
import { Balance } from "../components/balance";
import { SearchUsers } from "../components/users";

export function Dashboard(){
    
    const [searchParams] = useSearchParams();
    const firstName = searchParams.get("firstName");
    return (
        <div>
            <AppBar firstName={firstName}/>
            <Balance/>
            <SearchUsers firstName={firstName}/>
        </div>
    )
}