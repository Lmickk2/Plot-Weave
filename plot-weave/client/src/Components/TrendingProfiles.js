import { useQuery } from '@apollo/client';
import { QUERY_RANDOM_USERS } from '../utils/queries';
import profilePic from "../images/beta.png"


function RandomProfiles() {

  return (
    <div>
        <div className="trending-profiles">
            <div className="profile-prev">
            <img src={profilePic} className="trending-prof"/>
            <p>LukeMick</p>
            </div>
            <div className="profile-prev">
            <img src={profilePic} className="trending-prof"/>
            <p>LMickk2</p>
            </div>
            <div className="profile-prev">
            <img src={profilePic} className="trending-prof"/>
            <p>Hpotter01</p>
            </div>
        </div>
    </div>
  );
}

export default RandomProfiles