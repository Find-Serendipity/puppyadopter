import { Link, useNavigate } from "react-router-dom";

export function AllPlayers({ API_URL, puppyData, findTeam }) {
  const navigate = useNavigate();

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
        navigate(0);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="allPlayers">
        <h1>All Players</h1>
      </div>
      <div className="allPups">
        {puppyData.map((puppy) => (
          <div key={puppy.id} className="onePuppy">
            <div className="puppyCard">
              <div className="puppyDetails">
                <img className="puppyImage" src={puppy.imageUrl} />
              </div>
              <div className="buttons">
                <button className="fetchButton">
                  <Link to={`/singleplayer/${puppy.id}`}>Fetch</Link>
                </button>

                <button
                  className="adoptButton"
                  onClick={() => handleAdoption(puppy.id)}
                >
                  Adopt
                </button>
              </div>
              <div className="puppyDetails">Player Name: {puppy.name}</div>

              <div className="puppyDetails">Player Breed: {puppy.breed}</div>

              <div className="puppyDetails">On the {puppy.status}</div>

              <div className="puppyDetails">
                {puppy.teamId === null
                  ? "This player needs a team!"
                  : `Go Team ${findTeam[puppy.teamId]}!`}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
