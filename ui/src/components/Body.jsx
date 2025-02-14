import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) navigate("/login");
      else console.error(error);
    }
  };

  useEffect(() => {
    if (!user) getUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
