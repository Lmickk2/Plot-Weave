import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { QUERY_USER, QUERY_ME } from "../utils/queries";


function WeaveList() {

const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  useEffect(() => {
    if (loading) {
      <div class="loader"></div>
    }

    if (!user?.username) {
      return (
        <div className="not-authorized">
          <p>You are not authorized to view this page.</p>
        </div>
      );
    }
  }, [loading, user, data, userParam]);

  const [showAllWeaves, setshowAllWeaves] = useState(false);
  const displayedWeaves = showAllWeaves ? user?.weaves : user?.weaves?.slice(0, 3);

  const handleViewMore = () => {
    setshowAllWeaves(true);
  };

  const handleViewLess = () => {
    setshowAllWeaves(false);
  };

  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
    );
  }
  return (
    <div>
        <h3>{user?.username}'s Weaves</h3>
        <div className="user-posts">
          {user?.weaves?.length === 0 ? (
            <p>This user has no weaves.</p>
          ) : (
            displayedWeaves?.map((weave) => (
              <div key={weave._id} className="post">
                <h4>
                  <Link to={`/weave/${weave._id}`}>{weave.postTitle}</Link>{" "}
                  <span className="post-date">
                    {/* {new Date(post.createdAt).toLocaleDateString()} */}
                  </span>
                </h4>
                <p>{weave.postText.slice(0, 150) + "..."}</p>
              </div>
            ))
          )}
          {user?.weaves?.length > 3 && !showAllWeaves && displayedWeaves?.length < (user?.weaves?.length || 0) && (
            <button onClick={handleViewMore} className="show-view">
              View More
            </button>
          )}
          {showAllWeaves && (
            <button onClick={handleViewLess} className="show-view">
              View Less
            </button>
          )}
        </div>
    </div>
  );
  
}

export default WeaveList;