import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Toast from "./Toast";

const Request = () => {
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const getRequest = async () => {
    setError(null);
    try {
      const res = await axios.get(BASE_URL + "/user/received", {
        withCredentials: true,
      });
      if (res.status === 200) dispatch(addRequest(res.data));
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
      showToast();
    }
  };

  const reviewRequest = async (status, id) => {
    setError(null);
    try {
      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeRequest(id));
        setMessage(res.data?.message);
        showToast();
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
      showToast();
    }
  };

  function showToast() {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2500);
  }

  useEffect(() => {
    getRequest();
  }, []);

  if (!requests) return <Loader />;

  if (requests.length === 0)
    return (
      <div>
        <div className="text-center text-2xl font-bold text-white">
          No Pending Request
        </div>
        {toast && <Toast message={error || message} error={!!error} />}
      </div>
    );

  return (
    <div>
      <div className="mx-2 my-4">
        <p className="text-center text-2xl font-bold text-white">Requests</p>
        <div className="flex flex-col gap-2 max-w-lg mx-auto mt-4">
          {requests.map((request) => {
            const { _id } = request;
            const { firstName, lastName, photoUrl, age, gender, about } =
              request.fromUserId;
            return (
              <div
                key={_id}
                className="bg-base-300 flex gap-2 items-center p-2"
              >
                <figure className="p-2">
                  <img
                    src={photoUrl}
                    alt="Photo"
                    className="w-20 h-20 rounded-full"
                  />
                </figure>
                <div>
                  <p className="text-xl">{firstName + " " + lastName}</p>
                  <p>{age + " " + gender}</p>
                  <p>{about}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 p-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => reviewRequest("rejected", _id)}
                  >
                    Reject
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => reviewRequest("accepted", _id)}
                  >
                    Accept
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {toast && <Toast message={error || message} error={!!error} />}
    </div>
  );
};

export default Request;
