import { Link } from "react-router-dom";
import { Search } from "./Search";

export function Home({ puppyData }) {
  const randomPuppy = puppyData[Math.floor(Math.random() * puppyData.length)];

  return (
    <>
      {<Search puppyData={puppyData} />}

      <h1>Congratulations to the Winner!!</h1>
      {randomPuppy && (
        <div key={randomPuppy.id} className="">
          <div className="puppyCard">
            <div className="puppyDetails">Player Name: {randomPuppy.name}</div>

            <div className="puppyDetails">
              Player Breed: {randomPuppy.breed}
            </div>

            <div className="puppyDetails">On the {randomPuppy.status}</div>

            <div className="puppyDetails">
              <img src={randomPuppy.imageUrl} />
            </div>
            <div className="puppyDetails">
              <Link to={`/singleplayer/${randomPuppy.id}`}>
                Fetch This Puppy?
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
