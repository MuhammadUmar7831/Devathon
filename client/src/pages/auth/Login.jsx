import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../api/user.api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/user/userSlice";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await loginApi({ email, password });
    if (res.success) {
      dispatch(setUser(res.data.user));
      if (res.data.user.role === "admin"){
        navigate("/admin/manageAccounts")
      } else if (res.data.user.role === "resident") {
        navigate("/resident/viewBills")
      } else {
        navigate("/")
      }
      toast.success("Login Successful");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-center text-black">
        <div className="flex flex-col gap-4 bg-white rounded-md p-4 w-1/2 min-w-[280px] max-w-[600px]">
          <span className="w-full flex justify-center">
            {/* TODO: Add logo */}
          </span>
          <h1 className="text-center text-3xl mt-2">Login</h1>
          {/* <div className="w-full mt-5 text-md text-center">
            <button
              className="flex justify-center items-center gap-2 w-full bg-gray-100 rounded-md py-2 hover:bg-gray focus:bg-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FcGoogle className="text-xl" /> Continue with Google
            </button>
          </div> */}
          <form onSubmit={login} className="flex flex-col items-center">
            <div className="flex flex-col justify-center items-center md:w-2/3 w-full gap-4">
              <input
                className="w-full focus:outline-none bg-gray-100 p-4 rounded-md"
                type="email"
                name="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                className="w-full focus:outline-none bg-gray-100 p-4 rounded-md pr-10"
                name="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-gray-900 hover:bg-gray-800 rounded-md text-white py-2 px-4 mt-2 w-full bg-orange disabled:cursor-not-allowed"
                type="submit"
              >
                Continue
              </button>
            </div>
          </form>
          <div className="mt-5 flex justify-center w-full gap-2">
            <span>Not have an account?</span>
            <Link
              to="/auth/signup"
              className="text-orange hover:text-black hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
