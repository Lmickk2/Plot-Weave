import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

function FollowerList() {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [isAuthorized, setIsAuthorized] = useState(true);

  // Check authorization outside of the useEffect hook
  useEffect(() => {
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
      setIsAuthorized(true);
    } else if (!data?.user?.username) {
      setIsAuthorized(false);
    }
  }, [data, userParam]);

  if (loading) {
    return (
        <div class="loader"></div>
    );
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" />;
  }

  const user = data?.me || data?.user || {};
  const displayedFollowers = user?.followers;

  return (
    <div>
      <div className="follower-list">
        <h3>{user?.username}'s Followers</h3>
        <p>{user.followers.length} Followers</p>
        <div className="user-posts">
          {displayedFollowers?.map((follower) => (
            <div key={follower._id} className="post">
              <h4>
                {follower.username}
                <span className="post-date">
                  {/* {new Date(post.createdAt).toLocaleDateString()} */}
                </span>
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FollowerList;
