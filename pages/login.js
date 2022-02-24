import React, { useRef } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();

  const email = useRef();
  const password = useRef();

  const loginHandler = (e) => {
    e.preventDefault();

    console.log(
      "login handler data :::",
      email.current.value,
      password.current.value
    );

    signIn("credentials", {
      email: email.current.value,
      password: password.current.value,
      redirect: true,
      callbackUrl: `${window.location.origin}/dashboard` 
    });
  };

  return (
    <div style={{ width: "40%", margin: "20px auto" }}>
      <h3>Login</h3>
      <div>
        <form onSubmit={(e) => loginHandler(e)}>
          <input type="email" name="email" ref={email} />
          <br />
          <br />

          <input type="password" name="password" ref={password} />
          <br />
          <br />

          <input type="submit" value="Submit" />
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

export default Login;
