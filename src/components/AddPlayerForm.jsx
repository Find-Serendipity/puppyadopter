import { useEffect, useState } from "react";

export const AddPlayerForm = ({ API_URL, TEAM_API }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("field");
  const [imageUrl, setImageUrl] = useState("");
  const [teams, setTeams] = useState([]);
  const [teamId, setTeamId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          breed: breed,
          status: status,
          imageUrl: imageUrl,
          teamId: teamId,
        }),
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function fetchTeams() {
      try {
        let fetchAPI = await fetch(TEAM_API);
        let jsonHolder = await fetchAPI.json();
        setTeams(jsonHolder.data.teams);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTeams();
  }, []);

  return (
    <>
      <h2>Add Player:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Player Name:
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Player Breed:
          <input
            type="text"
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <label>
          Playing, or Benched?
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="bench">Benched</option>
            <option value="field">Playing</option>
          </select>
        </label>
        <label>
          Choose Team:
          <select id="team" onChange={(e) => setTeamId(e.target.value)}>
            {teams.map((eachTeam) => (
              <option key={eachTeam.id} value={eachTeam.id}>
                {eachTeam.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Player Pic:
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <input type="submit" value="Add Puppy" />
      </form>
    </>
  );
};
