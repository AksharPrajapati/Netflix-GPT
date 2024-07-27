import React, { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Login() {
  const [isSignIn, setIsSignIn] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div>
        <img
          className="absolute"
          alt="background"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/21a8ba09-4a61-44f8-8e2e-70e949c00c6f/6678e2ea-85e8-4db2-b440-c36547313109/IN-en-20240722-POP_SIGNUP_TWO_WEEKS-perspective_WEB_3457a8b1-284d-4bb5-979e-2a2e9bb342b3_large.jpg"
        />
      </div>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(6, "Must be 6 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (!isSignIn) {
            createUserWithEmailAndPassword(auth, values.email, values.password)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log("user", user);
                setSubmitting(false);
                navigate("/browse");
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                setSubmitting(false);
                console.log("SIGNUP", errorCode, errorMessage);
              });
          } else {
            signInWithEmailAndPassword(auth, values.email, values.password)
              .then((userCredential) => {
                const user = userCredential.user;
                console.log("user", user);
                setSubmitting(false);
                navigate("/browse");
              })
              .catch((error) => {
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                console.log(errorCode, errorMessage);
                setSubmitting(false);
              });
          }
        }}
      >
        {({ isSubmitting }) => (
          <div>
            <Form className="absolute bg-black rounded-lg py-16 px-14 mt-32 bg-opacity-80 mx-auto left-0 right-0 w-1/3 flex flex-col gap-4">
              <h1 className="text-white text-3xl font-bold mb-5">
                {isSignIn ? "Sign In" : "Sign Up"}
              </h1>
              <Field
                className="p-3 rounded-sm !bg-opacity-40 !text-white !bg-slate-500"
                type="email"
                name="email"
              />
              <ErrorMessage
                className="text-red-600 mt-[-1em]"
                name="email"
                component="div"
              />
              <Field
                className="p-3 rounded-sm bg-opacity-40 text-white bg-slate-500"
                type="password"
                name="password"
              />
              <ErrorMessage
                className="text-red-600 mt-[-1em]"
                name="password"
                component="div"
              />
              <button
                className="bg-red-600 p-2 rounded-sm text-white opacity-100"
                type="submit"
                disabled={isSubmitting}
              >
                {isSignIn ? "Sign In" : "Create Account"}
              </button>
              {isSignIn ? (
                <>
                  <p className="text-white text-center">OR</p>
                  <button className="bg-gray-600 p-2 rounded-sm text-white opacity-100 bg-opacity-80">
                    Use a sign-in code
                  </button>
                  <p className="text-white text-center">Forgot Password?</p>
                  <p className="text-white">Remember me</p>
                  <p className="text-slate-300">
                    New to Netflix?{" "}
                    <span
                      className="text-slate-50 font-bold cursor-pointer"
                      onClick={() => setIsSignIn(false)}
                    >
                      Sign up now →
                    </span>
                  </p>
                  <p className="text-xs text-slate-50">
                    This page is protected by Google reCAPTCHA to ensure you're
                    not a bot.
                  </p>
                </>
              ) : (
                <p className="text-slate-300">
                  Are you a member already?{" "}
                  <span
                    className="text-slate-50 font-bold cursor-pointer"
                    onClick={() => setIsSignIn(true)}
                  >
                    Sign in now →
                  </span>
                </p>
              )}
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default Login;
