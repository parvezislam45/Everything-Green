'use client'

import { useState } from "react";

const Webhook = () => {
    const [eventType, setEventType] = useState("");
  const [data, setData] = useState("");
  const [response, setResponse] = useState("");

  const sendWebhook = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventType, data: JSON.parse(data) }),
      });

      const result = await response.json();
      if (response.ok) {
        setResponse("Saved successfully in DB!");
      } else {
        setResponse(`Error: ${result.message}`);
      }
    } catch (error) {
      setResponse("Failed to save in DB!!!");
    }
  };
    return (
        <div>
            <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Webhook Page</h1>
      <input
        type="text"
        placeholder="Event Type"
        value={eventType}
        onChange={(e) => setEventType(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <textarea
        placeholder='Webhook Data (JSON format) e.g. {"message": "Hello"}'
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button
        onClick={sendWebhook}
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Submit
      </button>
      {response && <p className="mt-4">{response}</p>}
    </div>
        </div>
    );
};

export default Webhook;