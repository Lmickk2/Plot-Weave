import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { ADD_LIKE } from "../utils/mutations";
import gql from "graphql-tag";
import { Helmet } from "react-helmet";
import { QUERY_SINGLE_WEAVE } from "../utils/queries";
import { Link } from "react-router-dom";
import profilepic from "../images/beta.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBookmark,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

const SingleWeave = () => {
  const { weaveId } = useParams();
  const { loading, data } = useQuery(QUERY_SINGLE_WEAVE, {
    variables: { weaveId: weaveId },
  });

  const weave = data?.weave || {};

  if (loading) {
    return (
      <div class="loader"></div>
    );
  }


  return (
    <div className="post-section">
      <div className="appear single-post">
        <Helmet>
          <title>Plot Weave | {weave.postTitle}</title>
        </Helmet>
        <div className="author-section">
          <img src={profilepic} />
          <p>{weave.weaveAuthor}</p>
        </div>
        <div className="my-3">
          <h3 className="created-by right">
            {weave.postTitle}
            <br />
            <span style={{ fontSize: "1rem" }}>{weave.createdAt}</span>
          </h3>
          <div className="post-container">
            <p>{weave.postText}</p>
          </div>
        </div>
        <div className="cont-space"></div>
      </div>
      <div className="author-info">
        <div className="author-header"></div>
        <img src={profilepic} />
        <h3>{weave.weaveAuthor}</h3>
        <div className="user-options">
          <FontAwesomeIcon icon={faUsers} className="followers" />
          <FontAwesomeIcon icon={faBookmark} className="followers" />
        </div>
      </div>
    </div>
  );
};

export default SingleWeave;
