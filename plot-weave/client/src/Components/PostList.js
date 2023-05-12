import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import { Link } from "react-router-dom";
import profilepic from "../images/beta.png";

const PostList = ({ title = "All Posts", showUsername }) => {
  const { loading, data } = useQuery(QUERY_POSTS);
  console.log(data);
  return (
    <div>
      {loading ? (
        <div class="loader"></div>
      ) : (
        <div className="center">
          <div className="post-list">
            {data &&
              data.posts &&
              data.posts.map((post) => (
                <div key={post._id}>
                  <div className="post-info">
                    <div className="author-list">
                      <img src={profilepic} />
                      <p>
                        <Link to={`/profile/${post.postAuthor}`}>
                          {post.postAuthor}
                        </Link>
                      </p>
                    </div>
                    <h3>
                      <Link to={`/post/${post._id}`}>{post.postTitle}</Link>
                    </h3>
                    <p className="date">{post.createdAt}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
