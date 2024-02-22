import { useState, useCallback } from "react";
import { BottomWarning } from "../components/bottomWarning";
import { Button } from "../components/button ";
import { Heading } from "../components/heading";
import { InputBox } from "../components/inputBox";
import { SubHeading } from "../components/subHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/api/vi/user/signin", {
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate(`/dashboard?firstName=${response.data.firstName}`);
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("Invalid username or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [username, password, navigate]);

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 p-2 h-max px-4">
          <Heading label="Sign In" />
          <SubHeading label="Enter your credentials to access your account" />
          <InputBox
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="satyamchauhan@example.com"
            label="Email"
          />
          <InputBox
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="min 6 characters"
            label="Password"
          />
          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
          <div className="pt-4">
            <Button onClick={handleSignIn} label={isLoading?"Signing In":"Sign In"} disabled={isLoading} />
          </div>
          <BottomWarning label="Don't have an account?" buttonText="Sign Up" to="/signup" />
        </div>
      </div>
    </div>
  );
}
