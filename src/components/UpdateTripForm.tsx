import { useId } from "../provider/IdContext";
import { useRouter } from "../router/Router";
import { useState, useEffect, ChangeEvent } from "react";
import TripInterface, { TripTypeForm  } from "./interfaces";
const UpdateTripForm = () => {

  const { setPage } = useRouter();
  const { id } = useId();
  const [trip, setTrip] = useState<TripInterface>(TripTypeForm);

  useEffect(() => {
    fetch(`http://localhost:3000/api/trips/${id}`)
      .then((data) => data.json())
      .then((tripDetails) => {
        console.log(tripDetails);
       setTrip(tripDetails);
      });
  }, [id]);
  
  if (!trip) return <p>trip not found</p>;
  if (trip && !Object.keys(trip).length)
    return <span>trip details not found</span>;
    
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "activities") {
      setTrip((prevTrip) => ({
        ...prevTrip,
        [name]: value.split(",").map((value) => value.trim()),
      }));
    }
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const token = localStorage.getItem("authorization")
    if(!token) throw new Error("please login!")
    const tokenS = JSON.parse(token)
    console.log(tokenS);
    const requestBody = JSON.stringify(trip);
    setTimeout(()=> setPage("GetInfo"),0)
    fetch(`http://localhost:3000/api/trips/${trip.id}`, {
      method: "PUT",
      headers: { "authorization": tokenS, "Content-Type": "application/json" },
      body: requestBody,
    })
      .then(()=> setPage("Trips"))
      .catch((error) => {console.log(error.message);
      setPage("PageNotFound")}
      );
  };

  return (
    <>
      <h1>in Update Trip Form </h1>;
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          required
          name="name"
          defaultValue={trip.name}
          onChange={handleInputChange}
        />
        <label>Destination</label>
        <input
          required
          name="destination"
          value={trip.destination}
          onChange={handleInputChange}
        />
        <label>Image</label>
        <input
          required
          name="image"
          value={trip.image}
          onChange={handleInputChange}
        />
        <label>Start date</label>
        <input
          required
          name="startDate"
          value={trip.startDate}
          onChange={handleInputChange}
        />
        <label>End date</label>
        <input
          required
          name="endDate"
          value={trip.endDate}
          onChange={handleInputChange}
        />
        <label>Price</label>
        <input
          required
          name="price"
          value={trip.price}
          onChange={handleInputChange}
        />
        <label>Activities</label>
        <input
          required
          name="activities"
          value={trip.activities.join(", ")}
          onChange={handleInputChange}
        />
        <label>Description</label>
        <input
          required
          name="description"
          value={trip.description}
          onChange={handleInputChange}
        />
        <button>submit</button>
      </form>
      <button onClick={()=> setPage("Trips")}>Trips</button>
    </>
  );
};

export default UpdateTripForm;
