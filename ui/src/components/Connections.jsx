import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addConnections } from "../utils/connectionSlice";
const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      if (res.status === 200) dispatch(addConnections(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections)
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="text-center text-2xl font-bold text-white">
        No Connections
      </div>
    );

  return (
    <div className="mx-2 my-4">
      <p className="text-center text-2xl font-bold text-white">Connections</p>
      <div className="flex flex-col gap-2 max-w-lg mx-auto mt-4">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about, _id } =
            connection;
          return (
            <div key={_id} className="bg-base-300 flex gap-2 items-center">
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
