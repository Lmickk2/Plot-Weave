import { useQuery } from '@apollo/client';
import { QUERY_RANDOM_USERS } from '../utils/queries';
import profilePic from "../images/beta.png"
import { Link } from 'react-router-dom';

function RandomProfiles() {
  const { loading, error, data } = useQuery(QUERY_RANDOM_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract the user data from the GraphQL response
  const users = [...data.users]; // Create a shallow copy of the users array

  function getRandomProfiles(profiles, count) {
    const shuffled = profiles.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  

  // Randomly select three users
  const randomUsers = getRandomProfiles(users, 3);

  return (
    <div>
      <div className="trending-profiles">
        {randomUsers.map((user) => (
          <div className="profile-prev" key={user._id}>
            <img src={profilePic} className="trending-prof" alt="Profile" />
            <p><Link to={`/profile/${user.username}`}>{user.username}</Link></p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default RandomProfiles;
