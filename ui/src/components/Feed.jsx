import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Loader from "./Loader";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {}
  };

  useEffect(() => {
    if (!feed) getFeed();
  }, []);

  if (!feed) return <Loader />;

  if (feed.length === 0)
    return (
      <div className="text-center text-2xl font-bold text-white">
        No Users Found
      </div>
    );

  return (
    feed && (
      <div className="flex justify-center my-3.5">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
