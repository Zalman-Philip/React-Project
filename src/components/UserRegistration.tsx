import { useRouter } from "../router/Router";
import { MouseEvent, useState, ChangeEvent } from "react";
import { UserInterface, userTypeForm } from "./interfaces";
import usePassword from "../util/password";
const UserRegistration = () => {
  
  const {passwordRef,hidePassword,showPassword} = usePassword()
  const [user, setUser] = useState<UserInterface>(userTypeForm);
  const { setPage } = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    console.log(user);
  };

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    const requestBody = JSON.stringify(user);
    console.log(requestBody);
    setTimeout(()=> setPage("GetInfo"),0)
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "authorization": "test-token",
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then(()=> setPage("UserLogin")
      )
      .catch((error) => {
        console.log(error.message)
        setPage("PageNotFound")
      }
       
      );
  };

  return (
    <>
      <h1>In sign in page</h1>
      <form style={{ display: "flex", flexDirection: "column" }}>
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
        <button onClick={handleSubmit}>submit</button>
      </form>
      <button onMouseDown={showPassword} onMouseOut={hidePassword}>show password</button>
      <button onClick={() => setPage("Home")}>Home</button>
    </>
  );
};

export default UserRegistration;
