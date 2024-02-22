import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import {Dashboard} from "./pages/Dashboard"
import {SendMoney} from "./pages/SendMoney"
import { TransactionSuccessful } from './pages/transactionSuccess'
import { InsufficientBalance } from './pages/lowBalance'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/send-money" element={<SendMoney />} />
        <Route path="/lowbalance" element={<InsufficientBalance />} />
        <Route path="/success" element={<TransactionSuccessful />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
