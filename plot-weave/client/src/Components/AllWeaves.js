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
        <div class="loader"></div>
      ) : (
        <div className="center">
          <div className="post-list">
            {data &&
              data.weaves &&
              data.weaves.map((weave) => (
                <div key={weave._id} className="post-container">
                  <div className="post-info">
                    <div className="author-list">
                      <img src={profilepic} />
                      <p>
                        <Link to={`/profile/${weave.weaveAuthor}`}>
                          {weave.weaveAuthor}
                        </Link> • {weave.createdAt}
                      </p>
                    </div>
                    <h3>
                      <Link to={`/weave/${weave._id}`}>{weave.postTitle}</Link>
                    </h3>
                    <p className="preview-text">
                      {weave.postText.slice(0, 200) + "..."}
                    </p>
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
