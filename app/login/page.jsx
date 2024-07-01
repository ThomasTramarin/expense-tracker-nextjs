"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function Login({params}) {
  const router = useRouter();
  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: loginValues.email,
      password: loginValues.password,
      // callbackUrl: "/",
      redirect: false,
    });

    if(res.ok){
      router.push("/overview");
    }else{
      switch(res.error){
        case "CredentialsSignin":
          setErrors({ error: "Invalid email or password." });
          break;

      }
    }
    console.log(res)

  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center p-4">
        <h1 className="mb-5 text-center">Login with an existing account</h1>
        <form onSubmit={handleSubmit} className="max-w-96 w-full">
          <div className="flex flex-col mb-8">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full max-w-96"
              value={loginValues.email}
              onChange={(e) =>
                setLoginValues({
                  ...loginValues,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full max-w-96"
              value={loginValues.password}
              onChange={(e) =>
                setLoginValues({
                  ...loginValues,
                  password: e.target.value,
                })
              }
              maxLength={50}
            />
            {errors.error && <span className="text-red-500 text-sm mt-1">{errors.error}</span>}
          </div>
          <div className="mb-2">
            <input
              type="submit"
              className="w-full py-3 text-black bg-white hover:bg-gray-200 rounded-md font-semibold cursor-pointer"
              value="Login"
            />
          </div>
          <p className="text-white text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 underline underline-offset-2"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
