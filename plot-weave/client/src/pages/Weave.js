import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { ADD_WEAVE } from "../utils/mutations";

const Weave = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const sentenceIndex = queryParams.get("sentenceIndex");
  const sentenceText = queryParams.get("sentenceText");

  const [postText, setPostText] = useState("");

  useEffect(() => {
    if (sentenceText) {
      setPostText(sentenceText);
    }
  }, [sentenceText]);

  const [weaveTitle, setWeaveTitle] = useState("");

  const [addWeave, { error }] = useMutation(ADD_WEAVE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addWeave({
        variables: {
          weaveTitle,
          postText,
        },
      });
      setWeaveTitle("");
      setPostText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "postText" && value.length <= 3000) {
      setPostText(value);
    }

    if (name === "weaveTitle" && value.length <= 80) {
      setWeaveTitle(value);
    }
  };

  return (
    <div>
      <h2>Weave</h2>
      <div className="post-form">
      <form
          id="spacing"
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
      <div className="post-title">
          <label htmlFor="weaveTitle"></label>
          <input
            type="text"
            placeholder="Title"
            name="weaveTitle"
            value={weaveTitle}
            className="title-input"
            onChange={handleChange}
          />
        </div>
        <div className="question-post">
          <label htmlFor="postText"></label>
          <textarea
            name="postText"
            value={postText}
            className="post-input"

            style={{ lineHeight: '1.5', resize: 'vertical' }}
            onChange={handleChange}
          />
        </div>
        <button className="start" type="submit">
                Create Post !
              </button>
      </form>
      </div>
    </div>
  );
};

export default Weave;
