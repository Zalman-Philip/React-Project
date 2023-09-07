import TripInterface from "../components/interfaces";
import { FC } from "react";
import { useId } from "../provider/IdContext";
import { useRouter } from "../router/Router";

type TripCardProps = { trip: TripInterface, onDelete: (tripId: string) => void;};

const TripCard: FC<TripCardProps> = ({ trip, onDelete}) => {
  const { setId } = useId();
  const { setPage } = useRouter();
  const deleteTrip =  (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const token = localStorage.getItem("authorization")
    if(!token) throw new Error("please login!")
    const tokenS = JSON.parse(token)
    console.log(tokenS);
    setTimeout(() => setPage("GetInfo"))
    fetch(`http://localhost:3000/api/trips/${trip.id}`, {
      method: "DELETE",
      headers:{ "authorization": tokenS, "Content-Type": "application/json" },
    })
      .then(() => {
        console.log("delete success!!!");
        
        setPage("Trips"); 
      onDelete(trip.id as string)
      })
      .catch((error) => {
        setPage("");
        console.log(error.message);
      });
      
  };
  return (
    <div
      className="card-trip"
      onClick={() => {
        setId(trip.id as string);
        setPage("TripDetails");
      }}
    >
      <p>{trip.name}</p>
      <p>{trip.destination}</p>
      <img style={{ height: "100px", margin: "1px" }} src={trip.image} />
      <span>start date: {trip.startDate}</span>
      <span> end date {trip.endDate} </span>
      <button onClick={deleteTrip}>Delete</button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setId(trip.id as string);
          setPage("UpdateTripForm");
        }}
      >
        Update trip
      </button>
    </div>
  );
};

export default TripCard;
