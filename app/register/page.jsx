"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();

  const [registrationValues, setRegistrationValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  //Functions for validating registration values
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    return re.test(String(password));
  };

  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9._]{3,16}$/;
    return re.test(String(username));
  };

  //Form submitted
  const handleSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    //Validate values ​​​​pre sending
    if (!validateUsername(registrationValues.username)) {
      validationErrors.username =
        "Username must be 3-16 characters long and can only contain letters, numbers, dots, and underscores.";
    }
    if (!validateEmail(registrationValues.email)) {
      validationErrors.email = "Invalid email format.";
    }
    if (!validatePassword(registrationValues.password)) {
      validationErrors.password =
        "Password must be 8-50 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    if (registrationValues.password !== registrationValues.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    //Send registration request to server
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationValues),
      });

      if (response.status === 201) {
        //Registration successful
        setErrors({});

        setRegistrationValues({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        router.push("/login");
      } else {
        const result = await response.json();
        setErrors({ server: result.message });
      }
    } catch (err) {
      setErrors({ server: "An unexpected error occurred." });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center p-4">
        <h1 className="mb-5 text-center">Create your account</h1>
        <form onSubmit={handleSubmit} className="max-w-96 w-full">
          <div className="flex flex-col mb-8">
            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="max-w-96"
              value={registrationValues.username}
              onChange={(e) =>
                setRegistrationValues({
                  ...registrationValues,
                  username: e.target.value,
                })
              }
              maxLength={16}
            />
            {errors.username && (
              <span className="text-red-500 text-sm mt-1">
                {errors.username}
              </span>
            )}
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="email" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full max-w-96"
              value={registrationValues.email}
              onChange={(e) =>
                setRegistrationValues({
                  ...registrationValues,
                  email: e.target.value,
                })
              }
            />
            {errors.email && (
              <span className="text-red-500 text-sm mt-1">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="password" className="mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full max-w-96"
              value={registrationValues.password}
              onChange={(e) =>
                setRegistrationValues({
                  ...registrationValues,
                  password: e.target.value,
                })
              }
              maxLength={50}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mt-1">
                {errors.password}
              </span>
            )}
          </div>
          <div className="flex flex-col mb-8">
            <label htmlFor="confirm-password" className="mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className=" w-full max-w-96"
              value={registrationValues.confirmPassword}
              onChange={(e) =>
                setRegistrationValues({
                  ...registrationValues,
                  confirmPassword: e.target.value,
                })
              }
              maxLength={50}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </span>
            )}
          </div>
          <div className="mb-2">
            <input
              type="submit"
              className="w-full py-3 text-black bg-white hover:bg-gray-200 rounded-md font-semibold cursor-pointer"
              value="Register"
            />
            {errors.server && (
              <span className="text-red-500 text-sm mt-1">{errors.server}</span>
            )}
          </div>
          <p className="text-white text-sm">
            Do you already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 underline underline-offset-2"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

