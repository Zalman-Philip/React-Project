import { useRouter } from "../router/Router";
import { FormEvent, useState, ChangeEvent } from "react";
import { UserInterface, userTypeForm} from "./interfaces";
import usePassword from "../util/password";

const UserLogin = () => {
const {passwordRef,hidePassword,showPassword} = usePassword()
   const [user, setUser] = useState<UserInterface>(userTypeForm);
  const { setPage } = useRouter()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(user);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const requestBody = JSON.stringify(user);
    console.log(requestBody);
    setTimeout(()=> setPage("GetInfo"))
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: requestBody,
    })
      .then((res) => res.json())
      .then((data)=>{
        localStorage.setItem("authorization", JSON.stringify(data.responseObj.token));
        setPage("Trips")
        console.log(localStorage.getItem("authorization"));})
      .catch((error) => {
        console.log(error.message)
        setPage("PageNotFound")
      }
      );
  };

  return <>
  <h1>In login page</h1>
  <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleInputChange}
        ></input>
        <label>Password</label>
        <input
        ref={passwordRef}
          type="password"
          name="password"
          required
          onChange={handleInputChange}
        ></input>
        <button>submit</button>
      </form>
        <button onMouseDown={showPassword} onMouseOut={hidePassword}>show password</button>
<button onClick={()=> setPage("Home")}>Home</button>
  </>;
};

export default UserLogin;