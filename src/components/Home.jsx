import { Link } from "react-router-dom";

export function Home({ puppyData }) {
  const randomPuppy = puppyData[Math.floor(Math.random() * puppyData.length)];

  return (
    <>
      <h1>Last Week's Winning Puppy</h1>
      {randomPuppy && (
        <div key={randomPuppy.id} className="">
          <div className="">
            <div className="">Player Name: {randomPuppy.name}</div>

            <div className="">Player Breed: {randomPuppy.breed}</div>

            <div className="">On the {randomPuppy.status}</div>

            <div className="">
              <img src={randomPuppy.imageUrl} />
            </div>
            <Link to={`/singleplayer/${randomPuppy.id}`}>
              Fetch This Puppy?
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
