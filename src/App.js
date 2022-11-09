import { Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <>
      <Route exact path="/home" component={Dashboard} />
    </>
  );
}

export default App;
