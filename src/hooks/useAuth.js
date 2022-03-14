import { useContext } from "react";
import { AuthContext } from "context/authContext";

// create a react hook that uses the auth context
export default function useAuth() {
  return useContext(AuthContext);
}
