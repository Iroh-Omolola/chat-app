import { useState } from "react";
import { supabase } from "../lib/api";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("signup");
  const [loading, setLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  async function signUpWithEmail() {
    const {  error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      throw new Error(error.message);
    }
  }
  const signUp = (e) => {
    e.preventDefault();
    setLoading(true);
    signUpWithEmail(email, password);
    if(error===""){
      setLoading(false);
      setType("login");
    }
      setError("");
   
  };

  async function signInWithOtp() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://we-chat-you.vercel.app/",
        shouldCreateUser: false,
      },
    });
    if (error) {
      setError(error.message);
      throw new Error(error.message);
    }
  }
  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithOtp(email);
    setLoading(false);
    setCheckEmail(true);
    setError("");
  };

  return (
    <div className="w-full my-[50%] md:my-[30%] lg:my-[10%] sm:w-1/2 xl:w-1/3">
      <div>
        <h4 className="text-[16px] text-center text-background_color">
         { type==="login"?"LOG IN" :"SIGN UP"}
        </h4>
      </div>
      {error && (
        <div>
          <h4 className="text-[red] text-center">{error}</h4>
        </div>
      )}
      {loading && <p>loading.....</p>}
      {checkEmail && error === "" (
        <p className="text-center text-[red]">
          Check your mail and click on the link!!!
        </p>
      )}
      {!loading && !checkEmail && type === "signup" && error=== ""&& (
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Email
            </label>
            <input
              type="text"
              className="block appearance-none focus:outline-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Password
            </label>
            <input
              type="text"
              className="block appearance-none focus:outline-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className=" flex justify-center flex-col gap-2">
              <button
                onClick={signUp}
                className="btn-black  cursor-pointer text-center hover:bg-[black] p-2 bg-background_color text-[white]"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
      {!loading && !checkEmail && type === "login" && (
        <div className="border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white">
          <div className="mb-4">
            <label className="font-bold text-grey-darker block mb-2">
              Email
            </label>
            <input
              type="text"
              className="block appearance-none focus:outline-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className=" flex justify-center flex-col gap-2">
              <button
                onClick={signIn}
                className="btn-black  cursor-pointer text-center hover:bg-[black] p-2 bg-background_color text-[white]"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
