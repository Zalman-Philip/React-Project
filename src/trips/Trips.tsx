import { useRouter } from "../router/Router";
import { useEffect, useState } from "react";
import "./Trip.css"
import TripInterface from "../components/interfaces";
import TripCard from "./TripCard";
const Trips = () => {
  const { setPage } = useRouter();
  const [trips, setTrips] = useState<TripInterface[] | null>(null);
  useEffect(() => {
    const data = () => {
      setTimeout(()=> setPage("GetInfo"))
      fetch("http://localhost:3000/api/trips")
      .then((data) => data.json())
      .then((allTrips) => {
        console.log(allTrips);
        setPage("Trips");
        setTrips(allTrips);
      })
      .catch((error) => {
        console.log(error);
        setPage("")
      })
    }
    data()
    
  }, []);
  if (!trips) return <span>no data found</span>;
  if (trips && !trips.length) return <span>no trips</span>;
  const handleDelete = (tripId: string) => {
    setTrips((prevTrips) => prevTrips?.filter((trip) => trip.id !== tripId) as TripInterface[])
  }
  return (
    <>
      <h1>Trips</h1>
      <header>
        <button onClick={() => setPage("Home")}>Home</button>
        <button onClick={() => setPage("NewTripForm")}>Create new Trip</button>
      </header>
      {trips.map((trip, i) => {
        return (
          <TripCard key={i} trip={trip} onDelete={() => handleDelete(trip.id as string)}/>
        );
      })}
    </>
  );
};

export default Trips;
