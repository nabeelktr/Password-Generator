import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/slice/authSlice";
import { useLoginMutation } from "../../redux/features/api/api";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../styles/styles";
import * as Yup from "yup";
import { useFormik } from "formik";

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

export default function Login({ setRoute, setOpen }: any) {
  const [show, setshow] = useState(false);
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
      setOpen(false);
    }
  }, [navigate, userInfo]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      try {
        const response = await login({ email, password }).unwrap();
        if (response.message) {
          console.log(response);
          dispatch(setCredentials({ deatils: response.user }));
          navigate("/admin");
          toast.success("Login success");
        } else if (response.error) {
          toast.error("inavlid credintials");
        }
      } catch (err) {
        if (err) throw err;
        toast.error("invalid credentials");
      }
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className={!setRoute ? "min-w-full justify-center items-center max-w-[400px] flex h-screen bg-gray-100" : ""}>


    <div className=" text-black bg-white">
      <h1
        className={`${styles.title} mb-6 mt-5 text-2xl uppercase tracking-wider `}
      >
        Log In
      </h1>
      <form onSubmit={handleSubmit} className="px-8">
        <label className={`${styles.label} `}>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="eduwise@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          } text-sm`}
        />
        {errors.email && touched.email && (
          <span className="block pt-1 text-sm text-red-500">
            {errors.email}
          </span>
        )}

        <div className="relative mt-5 w-full">
          <label className={`${styles.label} `}>Password</label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Eduwise@2024"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input} text-sm`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              size={20}
              className="z-1 absolute bottom-3 right-2 cursor-pointer"
              onClick={() => setshow(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className="z-1 absolute bottom-3 right-2 cursor-pointer"
              onClick={() => setshow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="block pt-1 text-sm text-red-500">
            {errors.password}
          </span>
        )}

        <div className="mt-10 w-full">
          <input
            type="submit"
            value="Login"
            className={`${styles.button} py-3  text-white `}
          />
        </div>
        <br />

        <h5 className="pt-4 text-center font-Poppins text-[14px]">
          Not have any account?{" "}
          <span
            className="cursor-pointer pl-1 text-[#2190ff]"
            onClick={() =>
              setRoute ? setRoute("Signup") : navigate("/signup")
            }
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
    </div>
  );
}
