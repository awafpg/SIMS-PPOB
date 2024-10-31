import { Input } from "@nextui-org/react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdLockOpen, MdOutlineAlternateEmail } from "react-icons/md";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
    passwordVisible: false,
  });

  const toRegister = () => {
    navigate("/register");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-resep-three.vercel.app/api/v1/auth/login",
        {
          email: loginState.email,
          password: loginState.password,
        }
      );
      const role = response.data.user.role;
      const token = response.data.token;
      const status = response.data.status;
      const user = response.data.user;
      console.log("🚀 ~ handleLogin ~ user:", user);

      if (status === "success") {
        localStorage.setItem("authToken", token);
        localStorage.setItem("dataUser", JSON.stringify(user));

        dispatch({
          type: "LOGIN",
          payload: token,
        });
        dispatch({
          type: "MASUK",
          payload: JSON.stringify(user),
        });

        Swal.fire({
          title: "Confirmation",
          text: `Hello Selamat Datang`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "rgb(3 150 199)",
        }).then((res) => {
          if (res.isConfirmed) {
            if (role === "admin") {
              navigate("/dashboard-admin");
            } else if (role === "user") {
              navigate("/homepage-user");
            }
          }
        });
      } else {
        handleLoginError("Email atau password salah");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat login:", error);
      handleLoginError("Login gagal. Silakan coba lagi.");
    }
  };
  const handleLoginError = (error) => {
    if (error.message === "Network Error") {
      Swal.fire({
        title: "Warning",
        text: "Tidak terkoneksi ke database",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      });
    } else if (
      error.response &&
      error.response.data.message === "record not found, invalid email"
    ) {
      Swal.fire({
        title: "Warning",
        text: "Anda Belum Punya akun, Anda harus registrasi dulu",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/register");
        }
      });
    } else {
      Swal.fire({
        title: "Confirmation",
        text: "Password anda Salah",
        icon: "error",
        showCancelButton: true,
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(255 10 10)",
      }).then(() => {
        setLoginState({
          email: "",
          password: "",
          passwordVisible: false,
        });
      });
    }
  };
  return (
    <div className="p-20 max-sm:p-8">
      <form onSubmit={handleLogin} id="login-form">
        <div className="flex flex-col justify-center items-center gap-5">
          <span
            className="font-bold text-[1.3rem] mt-5 font-['Poppins']"
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
            Masuk atau buat akun untuk memulai
          </span>
          <Input
            id="email-input"
            className="w-10/12 rounded-xl border-2"
            type="email"
            required
            value={loginState.email}
            onChange={(e) =>
              setLoginState((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="masukan Email aAnda"
            labelPlacement="inside"
            startContent={
              <MdOutlineAlternateEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Input
            id="email-input"
            className="w-10/12 rounded-xl border-2"
            required
            value={loginState.password}
            onChange={(e) =>
              setLoginState((prev) => ({ ...prev, password: e.target.value }))
            }
            type="password"
            placeholder="masukan Password Anda"
            labelPlacement="inside"
            startContent={
              <MdLockOpen className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
            }
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
              Belum punya akun? registrasi
              <span
                onClick={toRegister}
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

export default LoginForm;
