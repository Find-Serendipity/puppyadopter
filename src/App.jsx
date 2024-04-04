import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import { AllPlayers } from "./components/AllPlayers";
import { AddPlayerForm } from "./components/AddPlayerForm";
import { Search } from "./components/Search";
import { SinglePlayer } from "./components/SinglePlayer";

const CLASSID = "2402-FTB-ET-WEB-FT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${CLASSID}/players`;
const TEAM_API = `https://fsa-puppy-bowl.herokuapp.com/api/${CLASSID}/teams`;

function App() {
  const [puppyData, setPuppyData] = useState([]);

  useEffect(() => {
    async function getPuppies() {
      try {
        let fetchAPI = await fetch(API_URL);
        let jsonHolder = await fetchAPI.json();
        setPuppyData(jsonHolder.data.players);
      } catch (err) {
        console.log(err);
      }
    }
    getPuppies();
  }, [API_URL]);

  return (
    <div className="nav">
      <Link to="/">
        <h1>Home</h1>
      </Link>

      <Link to="/allplayers">
        <h1>All Players</h1>
      </Link>

      <Link to="/addplayer">
        <h1>Add Player</h1>
      </Link>

      <Link to="/search">
        <h1>Search</h1>
      </Link>

      <Routes>
        <Route path="/" element={<Home puppyData={puppyData} />} />
        <Route
          path="/allplayers"
          element={
            <AllPlayers
              API_URL={API_URL}
              TEAM_API={TEAM_API}
              puppyData={puppyData}
              setPuppyData={setPuppyData}
            />
          }
        />
        <Route
          path="/addplayer"
          element={<AddPlayerForm API_URL={API_URL} TEAM_API={TEAM_API} />}
        />
        <Route
          path="/search"
          element={<Search puppyData={puppyData} TEAM_API={TEAM_API} />}
        />
        <Route
          path="/singleplayer/:id"
          element={<SinglePlayer API_URL={API_URL} />}
        />
      </Routes>
    </div>
  );
}

export default App;
