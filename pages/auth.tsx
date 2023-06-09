import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Regex for email validation
  const isButtonDisabled =
    variant === "login" && (!email || !password || !isEmailValid); // Include isEmailValid condition
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="flex flex-wrap text-xl">
      <div className="flex w-full md:w-2/5 bg-[url('/images/bg-auth.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="w-full h-screen bg-black md:bg-opacity-90 bg-opacity-80  px-8 sm:py-5 md:py-20">
          <nav className="py5">
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="mx-auto my-8"
              width={300}
            />
          </nav>
          <h2 className="text-white text-4xl mb-8 font-semibold text-center">
            {variant === "login" ? "Sign in" : "Create an Account"}
          </h2>
          <div className="flex flex-col gap-9  sm:w-2/4 md:w-full lg:w-2/3 m-auto">
            {variant === "register" && (
              <Input
                label="Username"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
                id="name"
                type="name"
                value={name}
                sx={'w-full'}
              />
            )}

            <Input
              label="Email"
              onChange={(e: any) => {
                setEmail(e.target.value);
              }}
              id="email"
              type="email"
              value={email}
              sx={'w-full'}
            />
            <Input
              label="Password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              id="password"
              type="password"
              value={password}
              sx={'w-full'}
            />
            <button
              onClick={variant === "login" ? login : register}
              className={`py-3 text-white rounded-md w-full transition ${
                isButtonDisabled
                  ? "bg-red-600 disabled:opacity-75 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              disabled={isButtonDisabled}
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center gap-4 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-20
                 h-10
                  bg-white
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-20
                h-10
              bg-white
              flex
              items-center
              justify-center
              cursor-pointer
              hover:opacity-80
              transition
              "
              >
                <img
                  src="/images/icons8-github.svg"
                  alt=""
                  width={35}
                  height={35}
                />
              </div>
            </div>
            <p className="text-neutral-400">
              {variant === "login"
                ? "First time in Cinematrix?"
                : "Already have an account?"}
              <br />
              <span
                onClick={toggleVariant}
                className="text cursor-pointer text-white hover:underline"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full md:w-3/5">
        <div className="relative h-full w-full bg-[url('/images/bg-auth.jpg')] bg-no-repeat bg-center bg-fixed bg-cover"></div>
      </div>
    </div>
  );
};
export default Auth;