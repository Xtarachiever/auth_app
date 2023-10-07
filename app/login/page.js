"use client";
import Link from "next/link";
import styles from "../../styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "@/lib/validate";

const Login = () => {
  const [show, setShow] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate:login_validate,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log(values);
  }

  async function handleGoogleSignIn() {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  }

  // Github login
  async function handleGithubSignIn() {
    signIn("github", { callbackUrl: "http://localhost:3000" });
  }
  return (
    <div>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Explore</h1>
          <p className="w-3/4 mx-auto text-gray-400">lore</p>
        </div>
        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`${styles.input_text}`}
              {...formik.getFieldProps('email')}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span>:<></>}
          <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
            <input
              type={`${show ? "text" : "password"}`}
              name="password"
              placeholder="Password"
              className={`${styles.input_text}`}
              {...formik.getFieldProps('password')}
            />
            <span className="icon flex items-center px-4">
              <HiFingerPrint size={25} onClick={() => setShow(!show)} />
            </span>
          </div>
          {/* {formik.errors.password && formik.touched.password ? <span className="text-rose-500">{formik.errors.password}</span>:<></>} */}
          {/* Login buttons */}
          <div className={styles.input_button}>
            <button type="submit" className={styles.button}>
              Login
            </button>
          </div>
          <div className={styles.input_button}>
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google{" "}
              <Image
                src={"/assets/google.svg"}
                width={20}
                height={20}
                alt="google"
              />
            </button>
          </div>
          <div className={styles.input_button}>
            <button
              type="button"
              className={styles.button_custom}
              onClick={handleGithubSignIn}
            >
              Sign in with Github{" "}
              <Image
                src={"/assets/github.svg"}
                width={25}
                height={25}
                alt="github"
              />
            </button>
          </div>
        </form>
        {/* Bottom */}
        <p className="text-center text-gray-400">
          Don&apos;t have an account yet?
          <Link href={"/register"}>
            <span className="text-blue-700">Sign Up</span>
          </Link>
        </p>
      </section>
    </div>
  );
};

export default Login;
