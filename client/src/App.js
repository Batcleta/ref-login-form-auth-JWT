import "./App.css";
import { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
// pages
import Login from "./pages/Login";
import DashBoard from "./pages/Dashboard";
import { useAuth } from "./helpers/AuthContext";
import { useHistory } from "react-router-dom";
import api from "./helpers/api";

function App() {
  const history = useHistory();
  const { authState, setAuthState } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("apiKey")) {
      api
        .get("/users/auth", {
          headers: {
            apiKey: localStorage.getItem("apiKey"),
          },
        })
        .then((resp) => {
          if (resp.data.error) {
            setAuthState({
              ...authState,
              status: false,
            });
            history.push("/");
          } else {
            setAuthState({
              username: resp.data.username,
              id: resp.data.id,
              authorization: resp.data.authorization,
              status: true,
            });
            history.push("/dashboard");
          }
        });
    } else {
      history.push("/");
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("apiKey");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    history.push("/");
  };

  return (
    <div className="App">
      <div>
        <p>{authState.username}</p>
        {authState.status && <button onClick={logOut}>Logout</button>}
      </div>

      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/dashboard" component={DashBoard} />
      </Switch>
    </div>
  );
}

export default App;
