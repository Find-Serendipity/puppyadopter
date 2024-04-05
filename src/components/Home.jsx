import { Link } from "react-router-dom";
import { Search } from "./Search";

export function Home({ puppyData, TEAM_API }) {
  const randomPuppy = puppyData[Math.floor(Math.random() * puppyData.length)];

  return (
    <>
      {<Search puppyData={puppyData} TEAM_API={TEAM_API} />}

      <h1>Leader of the Pack</h1>
      {randomPuppy && (
        <div key={randomPuppy.id} className="singleBox">
          <div className="winnerCard">
            <div className="winnerDetails">
              You can do it {randomPuppy.name}!
            </div>

            <div className="winnerDetails">
              You make all {randomPuppy.breed} so proud!
            </div>

            <div className="winnerDetails">
              <button className="fetchButton">
                <Link to={`/singleplayer/${randomPuppy.id}`}>
                  Fetch This Puppy?
                </Link>
              </button>
            </div>

            <div className="winnerDetails">
              <img className="singleImage" src={randomPuppy.imageUrl} />
            </div>

            <div className="winnerDetails">
              Currently located on the {randomPuppy.status}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
