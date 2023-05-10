import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_WEAVES } from "../utils/queries";
import { Link } from "react-router-dom";
import profilepic from "../images/beta.png";

function AllWeaves() {
  const { loading, data } = useQuery(QUERY_WEAVES);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="center">
          <div className="post-list">
            {data &&
              data.weaves &&
              data.weaves.map((weave) => (
                <div key={weave._id}>
                  <div className="post-info">
                    <div className="author-list">
                      <img src={profilepic} />
                      <p>
                        <Link to={`/profile/${weave.weaveAuthor}`}>
                          {weave.weaveAuthor}
                        </Link>
                      </p>
                    </div>
                    <h3>
                      <Link to={`/weave/${weave._id}`}>{weave.postTitle}</Link>
                    </h3>
                    <p className="date">{weave.createdAt}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllWeaves;
