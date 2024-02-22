import { useNavigate } from "react-router-dom"

export function UserElement({users,firstName}){
  const navigate = useNavigate()
    return (
<div class="relative overflow-x-auto  sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-md font-bold text-gray-700 uppercase bg-white dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    FirstName
                </th>
                <th scope="col" class="px-6 py-3">
                    LastName
                </th>
                <th scope="col" class="px-6 py-3">
                    UserName
                </th>
            </tr>
        </thead>
        <tbody>
      {users.map(user => (
        <tr key={user.username} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td  className="px-6 py-4 ">
            {user.firstName}
          </td>
          <td className="px-6 py-4 ">
            {user.lastName}
          </td>
          <td className="px-6 py-4">
            {user.username}
          </td>
          <td className="px-6 py-4 text-right">
          <button onClick={()=>{
            navigate("/send-money/?id="+user._id + "&name="+user.firstName +"&firstName="+firstName)
          }} className=" px-5 py-2.5 text-sm font-medium text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300">
                Send Money
            </button>
          </td>
        </tr>
      ))}
    </tbody>
    </table>
</div>

    )
}