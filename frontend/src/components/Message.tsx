// src/HelloMessage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

const HelloMessage = () => {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    axios
      .get("http://localhost:8000/test/")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("API error:", error);
        setMessage("Failed to fetch message");
      });
  }, []);

  return <h1>{message}</h1>;
};

export default HelloMessage;
