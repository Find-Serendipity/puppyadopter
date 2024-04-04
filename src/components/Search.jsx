import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Search = ({ puppyData, TEAM_API }) => {
  const [searchString, setSearchString] = useState("");
  const [findTeam, setFindTeam] = useState({});

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
  }, [TEAM_API]);

  const searchResults = puppyData.filter(
    (puppy) => puppy.name.toLowerCase().indexOf(searchString.toLowerCase()) >= 0
  );

  return (
    <>
      <br />
      <textarea
        type="text"
        rows="1"
        cols="35"
        placeholder={
          searchString.length > 0
            ? "continue your search"
            : "start your search here"
        }
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      ></textarea>

      <br />

      <h2>Search Results</h2>
      {searchString &&
        searchResults.map((puppy) => (
          <div key={puppy.id} className="">
            <div className="">
              <div className="">Player Name: {puppy.name}</div>

              <div className="">Player Breed: {puppy.breed}</div>

              <div className="">On the {puppy.status}</div>

              <div className="">
                {puppy.teamId === null
                  ? "This player needs a team!"
                  : findTeam[puppy.teamId]}
              </div>

              <div className="">
                <img src={puppy.imageUrl} />
              </div>
              <Link to={`/singleplayer/${puppy.id}`}>Fetch This Puppy?</Link>
            </div>
          </div>
        ))}
    </>
  );
};
