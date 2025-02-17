const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about } = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="w-full">
        <img src={photoUrl || null} alt="Profile Image" className="w-full aspect-[4/3]"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p className="flex gap-2">
          <span>{age}</span>
          <span>{gender === "M" ? "Male" : "Female"}</span>
        </p>
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
