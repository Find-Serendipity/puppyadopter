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
      <div>
        <div key={singlePuppyData.id} className="">
          <div className="">
            <div className="">Player Name: {singlePuppyData.name}</div>

            <div className="">Player Breed: {singlePuppyData.breed}</div>

            <div className="">On the {singlePuppyData.status}</div>

            <div className="">
              {!singlePuppyData.team
                ? "This player needs a team!"
                : singlePuppyData.team.name}
            </div>

            <div className="">
              <img src={singlePuppyData.imageUrl} />
            </div>

            <Link to={`/allplayers`}>Show me more puppies!</Link>
          </div>
        </div>
      </div>
    </>
  );
}
