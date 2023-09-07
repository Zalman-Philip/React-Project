import { useRouter } from "../router/Router";
import { useState, ChangeEvent, FormEvent } from "react";
import getToken from "../util/getToken";
// import { TripInterfaceForm } from "./interfaces";

const NewTripForm = () => {
  const [trip, setTrip] = useState<Record<string, unknown> | null>(null);
  const { setPage } = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "activities")
      return setTrip((prevTrip) => ({
        ...prevTrip,
        [name]: value.split(",").map((value) => value.trim()),
      }));
    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const token = getToken()
    const requestBody = JSON.stringify(trip);
    setTimeout(()=> setPage("GetInfo"),0)
    await fetch("http://localhost:3000/api/trips", {
      method: "POST",
      headers: { "authorization":token as string, "Content-Type": "application/json" },//////////////////////////
      body: requestBody
    })
      .then(() => setPage("Trips"))
      .catch((error) => console.log(error.message));
    setPage("PageNotFound");
  };

  return (
    <>
      {" "}
      <h1>New trip</h1>
      <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        <label>Name</label>
        <input required name="name" />
        <label>Destination</label>
        <input required name="destination" onChange={handleInputChange} />
        <label>Image</label>
        <input required name="image" onChange={handleInputChange} />
        <label>Start date</label>
        <input required name="startDate" onChange={handleInputChange} />
        <label>End date</label>
        <input required name="endDate" onChange={handleInputChange} />
        <label>Price</label>
        <input required name="price" onChange={handleInputChange} />
        <label>Activities</label>
        <input required name="activities" onChange={handleInputChange} />
        <label>Description</label>
        <input required name="description" onChange={handleInputChange} />
        <button>submit</button>
      </form>
      <button onClick={() => setPage("Trips")}>Trips</button>
    </>
  );
};

export default NewTripForm;
