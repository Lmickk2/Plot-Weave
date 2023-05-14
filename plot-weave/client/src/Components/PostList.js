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
                <div key={post._id} className="post-container">
                  <div className="post-info">
                    <div className="author-list">
                      <img src={profilepic} />
                      <p>
                        <Link to={`/profile/${post.postAuthor}`}>
                          {post.postAuthor}
                        </Link> • {post.createdAt}
                      </p>
                    </div>
                    <h3>
                      <Link to={`/post/${post._id}`} className="title-a">{post.postTitle}</Link>
                    </h3>
                    <p className="preview-text">
                      {post.postText.slice(0, 200) + "..."}
                    </p>
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
