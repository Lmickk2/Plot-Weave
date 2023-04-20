import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import profilepic from "../images/profile.png"
import { Link } from "react-router-dom";

const PostList = ({
  title = "All Posts",
  showUsername,
}) => {  
  const { loading, data } = useQuery(QUERY_POSTS);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="post-list">
          {data.posts.map((post) => (
            <div key={post._id}>
                <div className="post-info">
                <div className="author-list">
                <img src={profilepic}/>
                <p>{post.postAuthor}</p>
                </div>
                <h3><Link to={`/post/${post._id}`}>{post.postTitle}</Link></h3>
              <p className="date">{post.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
