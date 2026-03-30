import { useEffect } from "react";

function App() {
    useEffect(() => {
    fetch("http://localhost:3000")
      .then(res => res.text())
      .then(console.log);
  }, []);
  return <h1>AI Workout Planner</h1>;
}

export default App;
