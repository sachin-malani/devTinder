import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("sachin@gmail.com");
  const [password, setPassword] = useState("hello@1234");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [error, setError] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (error) setError(null);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignup = async () => {
    if (error) setError(null);
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email: emailId,
          password,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data));
        navigate("/profile");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex my-10 mx-4 justify-center items-center">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLogin ? "Login" : "Signup"}
          </h2>
          <form>
            {!isLogin && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email / Username</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            {!isLogin && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="input input-bordered w-full max-w-xs [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-moz-appearance]:textfield"
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Gender</span>
                  </div>
                  <select
                    className="select select-bordered"
                    value={gender}
                    onChange={(e) => {
                      console.log("Selected Gender:", e.target.value);
                      setGender(e.target.value);
                    }}
                  >
                    <option value="" disabled defaultChecked>
                      Pick one
                    </option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </label>

                <label className="form-control my-2">
                  <div className="label">
                    <span className="label-text">Tell us about yourself</span>
                  </div>
                  <textarea
                    className="textarea textarea-bordered h-24 resize-none overflow-hidden"
                    placeholder="About"
                    value={about}
                    maxLength={100}
                    onChange={(e) => {
                      if (e.target.value.length <= 100)
                        setAbout(e.target.value);
                    }}
                  ></textarea>
                  <div className="text-sm text-gray-500 mt-2">
                    {about.length}/100 characters
                  </div>
                </label>
              </>
            )}
            <p className="text-red-700">{error}</p>
            <div>
              {isLogin ? "New User ? Signup " : "Existing User ? Login "}
              <span
                className="cursor-pointer underline"
                onClick={() => {
                  setError(null);
                  setIsLogin((value) => !value);
                }}
              >
                Here
              </span>
            </div>
          </form>

          <div className="card-actions">
            <button
              className="btn btn-primary w-full max-w-xs"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
