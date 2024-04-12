import { styles } from "@/app/styles/style";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { useFormik } from "formik";
import React, { FC, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useSelector } from "react-redux";
import * as Yup from "yup";

type Props = {
  setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});
type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const PasswordVerification: FC<Props> = ({ setRoute }) => {
  const { token } = useSelector((state: any) => state.auth);
  const [changePassword, { isSuccess, error }] = useChangePasswordMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
      setRoute("Login");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
        setInvalidError(true);
      } else {
        console.log("An error occured:", error);
      }
    }
  }, [isSuccess, error]);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: schema,
    onSubmit: () => {     
    },
  });

  const verificationHandler = async (password: string) => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }
    await changePassword({
      activation_token: token,
      activation_code: verificationNumber,
      password
    });
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  const { errors, touched, values, handleChange } = formik;

  return (
    <div>
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
        <div className="w-full flex items-center justify-center mt-2">
          <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
            <VscWorkspaceTrusted size={40} />
          </div>
        </div>
        <br />
        <br />
        <div className="m-auto flex items-center justify-around">
          {Object.keys(verifyNumber).map((key, index) => (
            <input
              type="number"
              key={key}
              ref={inputRefs[index]}
              className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                invalidError
                  ? "shake border-red-500"
                  : "dark:border-white border-[#0000004a]"
              }`}
              placeholder=""
              maxLength={1}
              value={verifyNumber[key as keyof VerifyNumber]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <br />
        <br />
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <br />
        <div className="w-full flex justify-center">
          <button className={`${styles.button}`} onClick={()=>verificationHandler(values.password)}>
            Change Password
          </button>{" "}
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Go back to sign in?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
    </div>
  );
};

export default PasswordVerification;
