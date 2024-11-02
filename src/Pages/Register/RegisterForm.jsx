import { Input } from "@nextui-org/react";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdLockOpen, MdOutlineAlternateEmail, MdPerson } from "react-icons/md";
import { useRegisterMutation } from "../../Store/membership/membershipReducer";
import { z } from "zod";
import { BsEyeFill } from "react-icons/bs";
import { FaEyeSlash } from "react-icons/fa";

const RegisterForm = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  const [ErrorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const registerScheme = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  });

  const isValidEmail = (email) => {
    try {
      registerScheme.shape.email.parse(email);
      return true;
    } catch (error) {
      if (error) return false;
    }
  };
  const isValidPassword = (password) => {
    try {
      registerScheme.shape.password.parse(password);
      return true;
    } catch (error) {
      if (error) return false;
    }
  };
  // const isValidConfirmPassword = (confirmPassword) => {
  //   try {
  //     registerScheme.shape.confirmPassword.parse(confirmPassword);
  //     return true;
  //   } catch (error) {
  //     if (error) return false;
  //   }
  // };
  const isValidConfirmPassword = (password, confirmPassword) => {
    if (password === confirmPassword) return true;
    else return false;
  };
  const validEmail = isValidEmail(formData.email);
  const validPassword = isValidPassword(formData.password);
  const validConfirmPassword = isValidConfirmPassword(
    formData.password,
    formData.confirmPassword
  );

  const toLogin = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "confirmPassword" || e.target.name === "password") {
      setErrorMsg(
        e.target.name === "confirmPassword" &&
          formData.password !== e.target.value
          ? "Passwords do not match"
          : ""
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const result = await register({ ...formData }).unwrap();
      console.log(result);
      if (result.status == 0) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message);
    }

    // Here you can add form submission logic, such as sending data to an API
  };

  return (
    <div className="p-10 max-sm:p-8">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-center items-center gap-5">
          <span
            className="font-bold text-[1.3rem] font-['Poppins']"
            id="sign-in-heading"
          >
            <div className="flex gap-2">
              <img src="/src/assets/Website Assets/Logo.png" alt="" />
              <p>SIMS PPOB</p>
            </div>
          </span>
          <span
            className="font-bold text-center text-[2rem] mb-5 font-['Poppins']"
            id="sign-in-heading"
          >
            Lengkapi data untuk membuat Akun
          </span>
          <Input
            className="w-10/12 rounded-xl border-2"
            clearable
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            isInvalid={!validEmail}
            errorMessage="masukan Email yang Valid"
            value={formData.email}
            onChange={handleChange}
            placeholder="masukan Email aAnda"
            labelPlacement="inside"
            startContent={
              <MdOutlineAlternateEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Input
            className="w-10/12 rounded-xl border-2"
            clearable
            label="First Name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            required
            fullWidth
            placeholder="Nama Depan"
            labelPlacement="inside"
            startContent={
              <MdPerson className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Input
            className="w-10/12 rounded-xl border-2"
            clearable
            label="Last Name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            required
            fullWidth
            placeholder="Nama Belakang"
            labelPlacement="inside"
            startContent={
              <MdPerson className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Input
            className="w-10/12 rounded-xl border-2"
            clearable
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!validPassword}
            errorMessage="masukan minimal 4 karakter"
            required
            fullWidth
            placeholder="Buat Password"
            labelPlacement="inside"
            startContent={
              <MdLockOpen className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Input
            id="password-input"
            className="w-10/12 rounded-xl border-2"
            clearable
            label="Confirm Password"
            name="confirmPassword"
            isInvalid={!validConfirmPassword}
            errorMessage="Password tidak Cocok"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            fullWidth
            placeholder="Konfirmasi Password"
            labelPlacement="inside"
            startContent={
              <MdLockOpen className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <BsEyeFill className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <div className="flex w-10/12 flex-col items-center gap-9">
            <button
              type="submit"
              className=" py-3 w-full rounded-md text-white font-bold font-['Poppins'] bg-[#f43424] hover:opacity-70"
              id="sign-in-button"
            >
              Masuk
            </button>
            <span
              className="text-black flex justify-center mt-1"
              id="no-account-message"
            >
              Sudah punya akun? Login
              <span
                onClick={toLogin}
                className="cursor-pointer underline ml-1 text-[#f43424]"
                id="register-link"
              >
                di sini
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
