import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignupMutation } from "../../redux/features/api/api";
import { setUserDetails } from "../../redux/features/slice/authSlice";
import { useDispatch } from "react-redux";
import { styles } from "../styles/styles";
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Requires a combination of uppercase and lowercase letters.",
    })
    .matches(passwordNumberRule, { message: "At least one number (0-9)." })
    .required("Please enter your password"),
});

export default function SignUp({ setRoute }: any) {
  const [signup] = useSignupMutation();
  const dispatch = useDispatch();
  const [show, setshow] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      const data = {
        email,
        password,
      };
      dispatch(setUserDetails({ email, password }));
      try {
        const result = await signup({ email, password }).unwrap();
        if (result.message) {
          toast.info("account created");
        } else {
          toast.error(result);
        }
        setRoute ? setRoute("Login") : navigate("/login");
      } catch (err) {
        toast.info("User already exists");
        setRoute ? setRoute("Login") : navigate("/login");
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (

    <div className={!setRoute ? "min-w-full justify-center items-center max-w-[400px] flex h-screen  bg-gray-100" : ""}>
    <div className=" text-black bg-white">
      <h1
        className={`${styles.title} text-2xl  tracking-wider mb-6 mt-5 uppercase`}
      >
        Sign up
      </h1>
      <form onSubmit={handleSubmit} className="px-8">
        <label className={`${styles.label}`}>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your email"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          } text-sm`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.email}
          </span>
        )}

        <div className="w-full mt-5 relative">
          <label className={`${styles.label} `}>Password</label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input} text-sm`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              size={20}
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              onClick={() => setshow(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              onClick={() => setshow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.password}
          </span>
        )}
        <p className="text-xs mt-1 text-gray-600">- Uppercase letters (A-Z)</p>
        <p className="text-xs text-gray-600 ">- Lowercase letters (a-z)</p>
        <p className="text-xs text-gray-600 ">- Numbers (0-9)</p>

        <div className="w-full mt-10">
          <input
            type="submit"
            value="Sign Up"
            className={`${styles.button} text-white  py-3 `}
          />
        </div>
        <br />

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer "
            onClick={() => (setRoute ? setRoute("Login") : navigate("/login"))}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
    </div>
  );
}
