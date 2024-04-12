"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { styles } from "../../../app/styles/style";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
  refetch:any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
});

const ForgotPassword: FC<Props> = ({ setRoute,refetch }) => {
  const [show, setShow] = useState(false);
  const [forgotPassword, { isSuccess, error }] = useForgotPasswordMutation();
  const formik = useFormik({
    initialValues: { email: ""},
    validationSchema: schema,
    onSubmit: async ({ email }) => {
      await forgotPassword({ email });
    },
  });

  useEffect(() => {
    if(isSuccess){
       const message = "OTP sent to Mail";
       toast.success(message);
       setRoute("Password-Verification");
    }
    if(error){
     if("data" in error){
       const errorData = error as any;
       toast.error(errorData.data.message);
     }
    }
   }, [isSuccess,error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <label className={`${styles.label}`} htmlFor="email">
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        
        
        <div className="w-full mt-5">
          <input type="submit" value="Verify using OTP" className={`${styles.button}`} />
        </div>
        <br />
        
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Remember your password?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default ForgotPassword;
