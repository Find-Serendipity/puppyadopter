import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Search = ({ puppyData, TEAM_API, findTeam }) => {
  const [searchString, setSearchString] = useState("");

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
        placeholder={"Which puppy do you seek?"}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      ></textarea>

      <br />

      {searchString && searchResults.length > 0 && <h2>Search Results</h2>}
      <div className="searchBox">
        {searchString &&
          searchResults.map((puppy) => (
            <div key={puppy.id} className="searchResult">
              <div className="searchCard">
                <div className="">Player Name: {puppy.name}</div>

                <div className="searchDetails">Player Breed: {puppy.breed}</div>

                <div className="searchDetails">
                  This player is on the {puppy.status}
                </div>

                <div className="searchDetails">
                  {!puppy.team
                    ? "This player needs a team!"
                    : `Go Team ${findTeam[puppy.teamId]}!`}
                </div>

                <div className="searchDetails">
                  <img className="" src={puppy.imageUrl} />
                </div>
                <button className="fetchButton">
                  <Link to={`/singleplayer/${puppy.id}`}>
                    Fetch This Puppy?
                  </Link>
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
