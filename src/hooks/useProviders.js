import { useContext } from "react";
import { ProvidersContext } from "context/providersContext";

// create a react hook that uses the providers context
export default function useProviders() {
  return useContext(ProvidersContext);
}
