import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import { Link } from "react-router-dom";

const PostList = ({ title = "All Posts", showUsername }) => {
  const { loading, data } = useQuery(QUERY_POSTS);
  console.log(data);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="center">
          <div className="post-list">
            {data &&
              data.posts &&
              data.posts.map((post) => (
                <div key={post._id}>
                  <div className="post-info">
                    <div className="author-list">
                      <p>
                        <Link to={`/profile/${post.postAuthor}`}>{post.postAuthor}</Link>
                      </p>
                      <img src={post.postAuthor.profilePicture} />
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
