/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export function SinglePlayer({ API_URL }) {
  const [singlePuppyData, setSinglePuppyData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    async function getPuppy() {
      try {
        let fetchAPI = await fetch(`${API_URL}/${id}`);
        let jsonHolder = await fetchAPI.json();
        setSinglePuppyData(jsonHolder.data.player);
      } catch (err) {
        console.log(err);
      }
    }
    getPuppy();
  }, [API_URL, id]);

  return (
    <>
      <div key={singlePuppyData.id} className="singleBox">
        <div className="singleDetails">
          <img className="singleImage" src={singlePuppyData.imageUrl} />
        </div>

        <div className="singleCard">
          <div className="singleDetails">
            Player Name: {singlePuppyData.name}
          </div>

          <div className="singleDetails">
            Player Breed: {singlePuppyData.breed}
          </div>

          <div className="singleDetails">
            This player is on the {singlePuppyData.status}!
          </div>

          <div className="singleDetails">
            {!singlePuppyData.team
              ? "This player needs a team!"
              : `Go Team ${singlePuppyData.team.name}!`}
          </div>

          <div className="singleDetails">
            <button className="buttons fetchButton">
              <Link to={`/allplayers`}>See More Players?</Link>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
