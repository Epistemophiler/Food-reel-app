import "./globals.css";
import AppRoute from "./routes/appRoute";
import Back from "./components/Back";
import { useEffect, useState } from "react";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/test`)
      .then((res) => res.json())
      // eslint-disable-next-line no-undef
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <AppRoute />
      <p>Backend says: {message}</p>
    </>
  );
}

export default App;
