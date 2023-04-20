import { useQuery } from '@apollo/client';
import { QUERY_RANDOM_USERS } from '../utils/queries';
import profilePic from "../images/profile.png"
import profpic2 from "../images/profpic.png"
import pp3 from "../images/night.png"

function RandomProfiles() {
//   const { loading, error, data } = useQuery(QUERY_RANDOM_USERS, {
//     variables: { limit: 3 },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error :(</p>;

  return (
    <div>
        <div className="trending-profiles">
            <div className="profile-prev">
            <img src={profpic2} className="trending-prof"/>
            <p>LukeMick</p>
            </div>
            <div className="profile-prev">
            <img src={profilePic} className="trending-prof"/>
            <p>LMickk2</p>
            </div>
            <div className="profile-prev">
            <img src={pp3} className="trending-prof"/>
            <p>Hpotter01</p>
            </div>
        </div>
      {/* {data.users.map((user) => (
        <div key={user._id}>
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
        </div>
      ))} */}
    </div>
  );
}

export default RandomProfiles