import React, { useState, useEffect } from "react";
import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import spendImg from "../../assets/spend.png";
import { MdDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import useGetUserInfo from "../../hooks/useGetUserInfo";

const Auth = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const user = useGetUserInfo();
  const {isAuth} = user || {};

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      console.log(results);
      const authDetails = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authDetails));
      navigate("/expense-tracker");
    } catch (error) {
      console.error(error);
    }
  };

  if(isAuth) {
    return <Navigate to={"/expense-tracker"} />
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center  text-white relative ${
        theme === "light"
          ? "bg-gradient-to-r from-blue-500 to-purple-500"
          : "bg-gradient-to-r from-black to-blue-900"
      }`}
    >
      <button onClick={toggleTheme} className="absolute top-5 right-5">
        {theme !== "dark" ? (
          <FaSun size={"2rem"} />
        ) : (
          <MdDarkMode size={"2rem"} />
        )}
      </button>
      <div className="text-center">
        <img src={spendImg} alt="" className="w-60 m-auto md:w-80" />
        <h1 className="text-4xl font-extrabold mb-4 md:text-6xl">
          Expense Tracker
        </h1>
        <p className="text-lg mb-6 md:text-3xl">
          Track, analyze, and optimize your expenses easily.
        </p>
        <button
          type="button"
          className="text-white bg-red-600 hover:bg-red-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
          onClick={signInWithGoogle}
        >
          <svg
            className="w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fillRule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clipRule="evenodd"
            />
          </svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
