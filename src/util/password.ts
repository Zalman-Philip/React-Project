import { useRef} from "react";
const usePassword = () => {
   
  const passwordRef = useRef<HTMLInputElement>(null);
  const hidePassword = () => {
    const password = passwordRef.current as HTMLInputElement;
    password.type = "password";
  };
  
  const showPassword = () => {
    const password = passwordRef.current as HTMLInputElement;
    password.type = "text";
  };
  return {passwordRef, hidePassword, showPassword}
};

export default usePassword
