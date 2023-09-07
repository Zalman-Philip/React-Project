import { MouseEvent} from "react";
import { UserInterface } from "../components/interfaces";

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ,user: UserInterface) => {
    e.preventDefault();
    const requestBody = JSON.stringify(user);
    console.log(requestBody);

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
        console.log(localStorage.getItem("authorization"));})
      .catch((error) => 
        console.log(error.message)
      );
  };

export default handleSubmit