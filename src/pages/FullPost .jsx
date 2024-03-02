import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "../components/Post/Post";
import ReactMarkdown from "react-markdown";

export const FullPost = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.warn(err);
        alert('Error getting article');
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
    </div>
  );
};