import React from "react";
import Input from "../Input";
import Button from "../Button";

const ForgotPassword = () => {
  return (
    <>
      <Input
        extraClass="mt-[15px]"
        placeholder="Enter email"
        type="email"
        name="email"
      />
      <Button extraStyle="!w-full mt-[27px]" title="Login" type="submit" />
    </>
  );
};

export default ForgotPassword;
