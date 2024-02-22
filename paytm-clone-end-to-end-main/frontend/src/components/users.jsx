
import { UserElement } from "./userElement";
import { useState } from "react";
import axios from "axios";
export function SearchUsers({firstName}) {
    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState([]);
    const[pageNo, setPageNo] = useState(1);
    const[totalPages, setTotalPages] = useState(0);
    const[isLoading, setIsLoading] = useState(false);
    const onClickHandler=async(pageNo)=>{
        setIsLoading(true);
        const response = await axios.get("http://localhost:3000/api/vi/user/bulk?filter="+filter +"&page="+pageNo, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setUsers(response.data.users);
                setTotalPages(response.data.totalPages);
                setIsLoading(false);
    }
    return (
        <div>
    <div className="font-bold text-2xl pl-4 pt-4">
        Users
    </div>
    <div className="flex flex-col justify-center">

    <div className="p-4 flex justify-between items-center">
        <div className="w-5/6">
            <form>
                <label htmlFor="default-search" className="block mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input onChange={e=>{
                        setFilter(e.target.value);
                    }} type="search" id="default-search" className="block w-full py-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Users..." />
                </div>
            </form>
        </div>
      
            <button  onClick={()=>{
                setPageNo(1);
                onClickHandler(pageNo);
            }} className="w-1/6 ml-6 px-6 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300">
                {isLoading?"Loading":"Search Users"}
            </button>
    
    </div>
    <div className=" p-4 flex flex-col justify-between" >
        <div>
    <UserElement users={users} firstName={firstName} > </UserElement>
    </div>
    
    {users.length>0 ? (
  <div className="flex justify-center pt-8 px-8">
    <button onClick={()=>{
        setPageNo(pageNo-1);
        onClickHandler(pageNo-1);
    }} disabled={pageNo==1} className="px-5 py-2.5 text-sm font-medium text-black bg-white hover:font-bold">
      {"<-prev"}
    </button>
    <div className=" pt-3 px-8 text-sm font-medium text-black">
      {pageNo} of {totalPages}
    </div>
    <button onClick={()=>{
        setPageNo(pageNo+1);
        onClickHandler(pageNo+1);
    }} disabled={pageNo==totalPages} className="px-5 py-2.5 text-sm font-medium text-black bg-white hover:font-bold">
      {"next->"}
    </button>
  </div>
) : null}

    </div>
        </div>
</div>
    )
}
