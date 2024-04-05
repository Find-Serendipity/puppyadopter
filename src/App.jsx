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
  const [findTeam, setFindTeam] = useState({});

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

  useEffect(() => {
    async function getTeams() {
      try {
        let fetchAPI = await fetch(TEAM_API);

        let jsonHolder = await fetchAPI.json();

        const teamNames = {};

        for (let i = 0; i < jsonHolder.data.teams.length; i++) {
          const theTeam = jsonHolder.data.teams[i];
          teamNames[theTeam.id] = theTeam.name;
        }

        setFindTeam(teamNames);
      } catch (err) {
        console.log(err);
      }
    }
    getTeams();
  }, []);

  return (
    <>
      <div className="navBox">
        <div className="navRow">
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
        </div>
      </div>

      <Routes>
        <Route
          path="/"
          element={<Home puppyData={puppyData} TEAM_API={TEAM_API} />}
        />
        <Route
          path="/allplayers"
          element={
            <AllPlayers
              API_URL={API_URL}
              TEAM_API={TEAM_API}
              puppyData={puppyData}
              findTeam={findTeam}
            />
          }
        />
        <Route
          path="/addplayer"
          element={<AddPlayerForm API_URL={API_URL} TEAM_API={TEAM_API} />}
        />
        <Route
          path="/search"
          element={
            <Search
              puppyData={puppyData}
              TEAM_API={TEAM_API}
              findTeam={findTeam}
            />
          }
        />
        <Route
          path="/singleplayer/:id"
          element={<SinglePlayer API_URL={API_URL} />}
        />
      </Routes>
    </>
  );
}

export default App;
