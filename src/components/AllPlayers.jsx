import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function AllPlayers({ API_URL, TEAM_API, puppyData }) {
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

  const handleAdoption = async (playerID) => {
    const confirmation = confirm(
      "Are you sure you want to adopt this puppy?\n\nRemember: you're about to adopt this pup into a FUR-ever home, which means they cannot come back as a participant!"
    );
    if (confirmation === true) {
      try {
        const response = await fetch(`${API_URL}/${playerID}`, {
          method: "DELETE",
        });
        const result = await response.json();
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div>
        {puppyData.map((puppy) => (
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

            <button onClick={() => handleAdoption(puppy.id)}>Adopt?</button>
          </div>
        ))}
        ;
      </div>
    </>
  );
}
