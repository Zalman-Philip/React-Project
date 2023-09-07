import { useState, useEffect } from "react";
import { useId } from "../provider/IdContext";
import TripInterface from "../components/interfaces";
import { useRouter } from "../router/Router";

const TripDetails = () => {
  const {setPage} = useRouter()
  const { id } = useId();
  const [trip, setTrip] = useState<TripInterface | null>(null);
  useEffect(() => {
    setTimeout(() => setPage("GetInfo"))
    fetch(`http://localhost:3000/api/trips/${id}`)
      .then((data) => data.json())
      .then((tripDetails) => {
        console.log(tripDetails);
        setTrip(tripDetails);
        setPage("TripDetails")
      })
      .catch((err) => {
        console.log(err);
        setPage("")
      })
  }, [id]);
  if (!trip) return <p>trip not found</p>;
  if (trip && !Object.keys(trip).length)
    return <span>trip details not found</span>;
  return (
    <>
    <h1>Trip details</h1>
      <div className="card-trip">
        <p>{trip.name}</p>
        <p>{trip.destination}</p>
        <img style={{ height: "100px", margin: "1px" }} src={trip.image} />
        <span>start date: {trip.startDate}</span>
        <span> end date {trip.endDate} </span>
        <span>price: {trip.price}</span>
        <span> {trip?.activities.join(", ")} </span>
        <p> {trip.description} </p>
      <button onClick={()=> setPage("Trips")}>Trips</button>
      </div>
    </>
  );
};

export default TripDetails;
