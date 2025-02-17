import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const age = user.age;
  const gender = user.gender;
  const [toast, setToast] = useState(false);

  const updateProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        {
          firstName,
          lastName,
          about,
          photoUrl,
        },
        { withCredentials: true }
      );
      if (res.data?.message === "Updated Successfully") {
        dispatch(addUser(res.data?.result));
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 3000);
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex md:flex-row md:justify-center flex-col gap-4 m-4">
        <div className="flex  justify-center items-center">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title justify-center">Update Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Firstname</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Lastname</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">About</span>
                  </div>
                  <input
                    type="text"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs my-4">
                  <div className="label">
                    <span className="label-text">Image URL</span>
                  </div>
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <p className="text-red-700">{error}</p>
              </div>

              <div className="card-actions">
                <button
                  className="btn btn-primary w-full max-w-xs"
                  onClick={updateProfile}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  justify-center items-center">
          <UserCard
            user={{ firstName, lastName, about, photoUrl, age, gender }}
          />
        </div>
      </div>
      {toast && (
        <div className="toast toast-center z-10">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
