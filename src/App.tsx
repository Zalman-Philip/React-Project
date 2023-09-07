import { useRouter } from "./router/Router";
import Home from "./components/Home";
import Trips from "./trips/Trips";
import UserLogin from "./components/UserLogin";
import PageNotFound from "./components/PageNotFound";
import NewTripForm from "./components/NewTripForm";
import TripDetails from "./trips/TripDetails";
import UserRegistration from "./components/UserRegistration";
import UpdateTripForm from "./components/UpdateTripForm";
import GetInfo from "./components/GetInfo";
import "./App.css";

function App() {
  const { page } = useRouter();
  if (page === "Home") return <Home />;
  if (page === "Trips") return <Trips />;
  if (page === "UserLogin") return <UserLogin />;
  if (page === "NewTripForm") return <NewTripForm />;
  if (page === "TripDetails") return <TripDetails />;
  if (page === "UserRegistration") return <UserRegistration />;
  if (page === "UpdateTripForm") return <UpdateTripForm />;
  if (page === "GetInfo") return <GetInfo/>
  return <PageNotFound />;
}

export default App;
