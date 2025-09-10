import { useState } from "react";

function App() {
  const [data, setData] = useState(null);

  const callVisa = async () => {
    const res = await fetch("http://localhost:4000/api/visa-test");
    const json = await res.json();
    setData(json);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Visa Sandbox Test</h1>
      <button onClick={callVisa}>Call Visa API</button>
      <pre>{data ? JSON.stringify(data, null, 2) : "No response yet"}</pre>
    </div>
  );
}

export default App;