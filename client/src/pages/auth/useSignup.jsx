import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/user/userSlice";
import { signUpUserApi } from "../../api/user.api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useSignup = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      })
    );
  };

  const signupUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Check if passwords match
    if (user.password != user.cpassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // try to insert new user into database
    const response = await signUpUserApi(user);
    setLoading(false);
    if (response.success) {
      dispatch(setUser(response.user));
      toast.success("Registered Successfully");
      // Route the user to the home page
      navigate("/resident/profile");
    } else {
      setError(response.error);
    }
  };

  return { handleChange, signupUser, error, loading };
};
