import { Input } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
import { MdLockOpen, MdOutlineAlternateEmail } from "react-icons/md";
import { store } from "../../Store/store";
import { getAuthToken, setAuthToken } from "../../utils/memberUtil";
import { useLoginMutation } from "../../Store/membership/membershipReducer";
import { z } from "zod";

const LoginForm = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const loginScheme = z.object({
    email: z.string().email(),
    password: z.string().min(4),
  });

  const isValidEmail = (email) => {
    try {
      loginScheme.shape.email.parse(email);
      return true;
    } catch (error) {
      if (error) return false;
    }
  };
  const isValidPassword = (password) => {
    try {
      loginScheme.shape.password.parse(password);
      return true;
    } catch (error) {
      if (error) return false;
    }
  };
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    getAuthToken();
    setErrMsg("");
  }, [password, email]);

  const toRegister = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginData = await login({ email, password }).unwrap();

      setAuthToken(loginData.data.token);
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (error) {
      if (!error) {
        setErrMsg("no server response");
      } else if (error?.status === 400) {
        setErrMsg("wrong username or password");
      } else if (error?.status === 401) {
        setErrMsg("unauthorized");
      } else {
        setErrMsg("Login failed");
      }
    }
  };
  const handleUserInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePwdInput = (e) => setPassword(e.target.value);
  const validEmail = isValidEmail(email);
  const validPassword = isValidPassword(password);

  return (
    <>
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <div className="p-20 max-sm:p-8">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <form onSubmit={handleSubmit} id="login-form">
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
                id="email"
                className="w-10/12 rounded-xl border-2"
                type="email"
                required
                value={email}
                ref={userRef}
                isInvalid={!validEmail}
                errorMessage="Silahkan masukan Email yang valid"
                onChange={handleUserInput}
                placeholder="masukan Email aAnda"
                labelPlacement="inside"
                startContent={
                  <MdOutlineAlternateEmail className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
                }
              />
              <Input
                id="password"
                className="w-10/12 rounded-xl border-2"
                required
                value={password}
                isInvalid={!validPassword}
                errorMessage="masukan minimal 4 karakter"
                onChange={handlePwdInput}
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
      )}
    </>
  );
};

export default LoginForm;
