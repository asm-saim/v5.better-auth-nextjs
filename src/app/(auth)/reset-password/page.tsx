import React, { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";

const ResetPassword = () => {
  return (
    <div>
      <h1>Reset Password</h1>
      <Suspense fallback="Loading...">
        <ResetPasswordForm></ResetPasswordForm>
      </Suspense>
    </div>
  );
};

export default ResetPassword;
