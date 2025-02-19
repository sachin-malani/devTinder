import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useState } from "react";
import { removeUser } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, gender, photoUrl, about } = user;
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const sendRequest = async (status, id) => {
    if (error) setError(null);
    try {
      const res = await axios.post(
        BASE_URL + `/request/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) dispatch(removeUser(id));
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="w-full">
        <img
          src={photoUrl || null}
          alt="Profile Image"
          className="w-full aspect-[4/3]"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p className="flex gap-2">
          <span>{age}</span>
          <span>{gender === "M" ? "Male" : "Female"}</span>
        </p>
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={() => sendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => sendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
