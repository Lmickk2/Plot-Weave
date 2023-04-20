import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Helmet } from "react-helmet";
import { QUERY_SINGLE_POST } from "../utils/queries";
import { Link } from "react-router-dom";
import profilepic from "../images/profile.png"

const SinglePost = () => {
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const post = data?.post || {};

  const weaveSentence = (sentenceIndex, sentenceText) => {
    const sentences = post.postText.split(". ");
    const url = sentences
      .slice(0, sentenceIndex + 1)
      .join(". ")
      .replace(/\s+/g, "-")
      .toLowerCase();
    return {
      href: `/weave/${postId}/${url}?sentenceIndex=${sentenceIndex}&sentenceText=${sentenceText}`,
      "data-text": sentenceText.trim() + ".",
      onClick: () => setClickedSentence(sentenceIndex, sentenceText)
    };
  };
  

  const [hoveredSentence, setHoveredSentence] = useState(null);
  const [clickedSentence, setClickedSentence] = useState(null);

  if (loading) {
    return (
      <div className="spinner">
        <div className="spinner1"></div>
      </div>
    );
  }

  const sentences = post.postText.split(". ");

  const sentenceClicked = (index) => {
    setClickedSentence(index);
    setHoveredSentence(null);
  }

  const sentencesWithActions = sentences.map((sentence, index) => {
    return {
      text: sentence.trim() + ".",
      actions: weaveSentence(index, sentence),
      onClick: () => sentenceClicked(index)
    }
  });

  const clickedSentences = sentencesWithActions.slice(0, clickedSentence + 1);

  return (
    <div className="post-section">
    <div className="appear single-post">
      <Helmet>
        <title>Plot Weave | {post.postTitle}</title>
      </Helmet>
      <div className="author-section">
      <img src={profilepic}/>
      <p>{post.postAuthor}</p>
      </div>
      <div className="my-3">
        <h3 className="created-by right">
          {post.postTitle}
          <br />
          <span style={{ fontSize: "1rem" }}>{post.createdAt}</span>
        </h3>
        <div className="post-container">
          {sentencesWithActions.map((sentence, index) => (
            <span key={index}>
              <a
                {...sentence.actions}
                onMouseEnter={() => setHoveredSentence(index)}
                onMouseLeave={() => setHoveredSentence(null)}
                onClick={sentence.onClick}
              >
                {sentence.text}
              </a>

              {hoveredSentence === index && (
                <span
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: 0,
                    transform: "translateY(-50%)",
                    backgroundColor: "#fff",
                    padding: "0.25rem",
                  }}
                >
                  Weave
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="cont-space"></div>
    </div>
    <div className="author-info">
      <div className="author-header">
      </div>
      <img src={profilepic}/>
      <h3>{post.postAuthor}</h3>
      <p>Writing student from UM. 20 years old</p>
      {/* <p>View more from {post.postAuthor}</p> */}
    </div>
    </div>
  );
};

export default SinglePost;
