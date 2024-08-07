import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div className="bg-white w-3/4 max-w-[550px] h-auto rounded-2xl px-6 py-8 border-[3px] border-green-500" style={{boxShadow: "var(--shadow)"}}>
      <h2 className="text-gray-700 text-[1.2rem] text-center">
        Sign up on <span style={{ color: "var(--black)" , fontWeight:"bold" }}>WalletWise.</span>
      </h2>
      <form>
        <Input
          label={"Full Name"}
          state={name}
          setState={setName}
          placeholder={"John Doe"}
        />
        <Input
          label={"Email"}
          state={email}
          setState={setEmail}
          placeholder={"JohnDoe@gmail.com"}
        />
        <Input
          label={"Password"}
          state={password}
          setState={setPassword}
          placeholder={"Example@123"}
        />
        <Input
          label={"Confirm Password"}
          state={confirmPassword}
          setState={setConfirmPassword}
          placeholder={"Example@123"}
        />
        <Button text={"Signup Using Email and Password"}/>
        <p style={{textAlign:"center", fontWeight:"600", margin:"-0.4rem"}}>or</p>
        <Button text={"Signup Using Google" }green={true}/>
      </form>
    </div>
  );
}

export default SignupSigninComponent;
