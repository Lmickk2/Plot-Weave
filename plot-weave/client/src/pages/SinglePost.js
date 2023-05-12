import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_LIKE } from "../utils/mutations";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { QUERY_SINGLE_POST } from "../utils/queries";
import { Link } from "react-router-dom";
import profilepic from "../images/beta.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBookmark,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const SinglePost = () => {
  const { postId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_POST, {
    variables: { postId: postId },
  });

  const post = data?.post || {};

  const [hoveredSentence, setHoveredSentence] = useState(null);
  const [clickedSentence, setClickedSentence] = useState(null);
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    setLikes(post.likes);
  }, [post.likes]);

  const [addLike] = useMutation(ADD_LIKE, {
    update(cache, { data: { likePost } }) {
      cache.modify({
        id: cache.identify(post),
        fields: {
          likes(existingLikes = []) {
            const newLikeRef = cache.writeFragment({
              data: likePost.likes[likePost.likes.length - 1],
              fragment: gql`
                fragment NewLike on Like {
                  _id
                  username
                }
              `,
            });
            return [...existingLikes, newLikeRef];
          },
          likeCount(existingLikeCount = 0) {
            return existingLikeCount + 1;
          }
        },
      });
    },
  });
  

  const handleLike = () => {
    addLike({
      variables: { postId: post._id },
      onCompleted: (data) => {
        setLikes(data.post.likeCount);
      },
    });
  };
  
  const generateURL = (sentences, selectedIndex) => {
    const precedingSentences = sentences.slice(0, selectedIndex + 1);
    const postText = precedingSentences
      .join(".")
      .toLowerCase()
      .replace(/\s+/g, "-");
    const selectedSentence = encodeURIComponent(
      precedingSentences[selectedIndex]
    );
    const sentenceIndex = encodeURIComponent(selectedIndex);
    return `/weave?postText=${postText}&selectedSentence=${selectedSentence}&sentenceIndex=${sentenceIndex}`;
  };

  const weaveSentence = (sentenceIndex, sentenceText) => {
    const sentences = post.postText.split(". ");
    const url = generateURL(sentences, sentenceIndex);
    return {
      href: url,
      "data-text": sentenceText.trim() + ".",
      onClick: (event) => {
        event.preventDefault();
        setClickedSentence(sentenceIndex);
        window.location.href = url;
      },
    };
  };

  if (loading) {
    return (
      <div class="loader"></div>
    );
  }

  const sentences = post.postText.split(". ");

  const sentenceClicked = (index) => {
    setClickedSentence(index);
    setHoveredSentence(null);
  };

  console.log(sentences);

  const sentencesWithActions = sentences.map((sentence, index) => {
    return {
      text: sentence.trim() + ".",
      actions: weaveSentence(index, sentence),
      onClick: () => {
        setClickedSentence(index);
        const url = generateURL(sentences, index);
        window.location.href = url;
      },
    };
  });

  const clickedSentences = sentencesWithActions.slice(0, clickedSentence + 1);

  return (
    <div className="post-section">
      <div className="appear single-post">
        <Helmet>
          <title>Plot Weave | {post.postTitle}</title>
        </Helmet>
        <div className="author-section">
          <img src={profilepic} />
          <p>{post.postAuthor}</p>
        </div>
        <div className="my-3">
          <h3 className="created-by right">
            {post.postTitle}
            <br />
            <div className="likes">
              <FontAwesomeIcon className="likeCount" onClick={handleLike} icon={faThumbsUp} />
              <p>{likes}</p>
            </div>
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
                      left: "0",
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
        <div className="author-header"></div>
        <img src={profilepic} />
        <h3>{post.postAuthor}</h3>
        <div className="user-options">
          <FontAwesomeIcon icon={faUsers} className="followers" />
          <FontAwesomeIcon icon={faBookmark} className="followers" />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
