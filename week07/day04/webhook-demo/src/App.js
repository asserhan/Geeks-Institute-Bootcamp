import React from "react";

function App() {
  // Replace with your real webhook URL from webhook.site
  const webhookUrl = "https://webhook.site/0b2e3a19-0c2b-481f-89bc-e05c88aeb980";

  const sendData = async () => {
    const payload = {
      key1: "myusername",
      email: "mymail@gmail.com",
      name: "Isaac",
      lastname: "Doe",
      age: 27
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.text(); // or response.json() if JSON
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Send Data to Webhook</h1>
      <button onClick={sendData}>Send JSON</button>
    </div>
  );
}

export default App;
