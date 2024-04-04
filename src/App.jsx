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
  }, []);

  return (
    <div className="nav">
      <Link to="/">
        <div className="navItem">Home</div>
      </Link>

      <Link to="/allplayers">
        <div className="navItem">All Players</div>
      </Link>

      <Link to="/addplayer">
        <div className="navItem">Add Player</div>
      </Link>

      <Link to="/search">
        <div className="navItem">Search</div>
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
