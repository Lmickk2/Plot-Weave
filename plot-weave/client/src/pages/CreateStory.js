import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../utils/mutations';
import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import NotAuthorized from '../Components/NotAuthorized';
import { Helmet } from "react-helmet";

const CreateStory = () => {
  const [postText, setPostText] = useState('');
  const [postTitle, setPostTitle] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const posts  = cache.readQuery({ query: QUERY_POSTS });

        cache.writeQuery({
          query: QUERY_POSTS,
          data: { posts: [addPost, posts] },
        });
      } catch (e) {
        console.error(e);
      }


    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPost({
        variables: {
          postTitle,
          postText,
          postAuthor: Auth.getProfile().data.username,
        },
      });
      setPostTitle('')
      setPostText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  console.log(name,value)
    if (name === 'postText' && value.length <= 3000) {
      setPostText(value);
      setCharacterCount(value.length);
    } 
    if (name === 'postTitle' && value.length <= 80) {
      console.log(postTitle)
      setPostTitle(value);
      console.log(postTitle)
    }
  };
  

  return (
    <div className="appear top-pad">
      <Helmet>
          <title>Plot Weave | Your Story</title>
      </Helmet>

      {Auth.loggedIn() ? (
        <>
        <div className="post-form">
          <form
          id="spacing"
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="post-title">
              <textarea
                name="postTitle"
                placeholder="Title"
                value={postTitle}
                className="title-input"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="question-post">
              <textarea
                name="postText"
                placeholder="Start Writing!"
                value={postText}
                className="post-input"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>
            <p
            className={`type-white ${
              characterCount === 3000 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/3000
          </p>

          
              <button className="start" type="submit">
                Create Post !
              </button>
        
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
          </div>
        </>
        
      ) : (
   <NotAuthorized/>
      )}
    </div>
  );
};

export default CreateStory;
