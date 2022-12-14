import React, { FormEvent, useContext, useState } from "react";
import LabeldInput from "../../General/LabeldInput";
import axios from "axios";
import {
  DashboardContext,
  TDashbaordContext,
} from "../../../Contexts/DashbaordContext";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { setUser } = useContext(DashboardContext) as TDashbaordContext;

  const navigate = useNavigate();

  const signupHandler = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/api/user/signup", {
        email: email,
        password: password,
        username: username,
        roll: "admin",
      });

      const userData = res.data;

      setUser(userData);
      navigate("/dashboard");
    } catch (err: any) {
      alert(err.response.data.message);
    }

    clearForm();
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <form action="" className="flex flex-col gap-6" onSubmit={signupHandler}>
      <div>
        <LabeldInput
          type="username"
          label="Username:"
          state={username}
          setState={setUsername}
        />
        <LabeldInput
          type="email"
          label="Email:"
          state={email}
          setState={setEmail}
        />
        <LabeldInput
          type="password"
          label="Password:"
          state={password}
          setState={setPassword}
        />
      </div>
      <button type="submit" className="bg-gray-200">
        Signup
      </button>
    </form>
  );
};

export default SignupPage;
