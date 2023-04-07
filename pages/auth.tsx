import Input from "@/components/Input";
import { useCallback, useState } from "react";

export default function auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  return (
    <div className="flex flex-wrap text-xl">
      <div className="flex w-full md:w-2/5 bg-[url('/images/bg-auth.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="w-full h-screen bg-black bg-opacity-90 px-8 sm:py-5 md:py-20">
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
          <div className="flex flex-col gap-9 sm:w-2/4 md:w-full lg:w-2/3 m-auto">
            {variant === "register" && (
              <Input
                label="Username"
                onChange={(e: any) => {
                  setName(e.target.value);
                }}
                id="name"
                type="name"
                value={name}
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
            />
            <Input
              label="Password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
              id="password"
              type="password"
              value={password}
            />
            <button className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Sign up"}
            </button>
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
}
