import React, { useRef, useEffect } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import axios from '../../axios';

import 'easymde/dist/easymde.min.css';
import css from './AddPost.module.css';
import { selectIsAuth } from '../../redux/slices/auth';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('File upload error!')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {

      const tagsArray = tags.split(',').map(tag => tag.trim());
      const fields = {
        title,
        imageUrl,
        tags: tagsArray,
        text,
      };

      const { data } = isEditing 
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Error creating article!')
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        }).catch(err => {
          console.warn(err);
          alert('Error getting article!')
        });
    }
  }, [id]); 

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ padding: '30px' }}>
      <button onClick={() => inputFileRef.current.click()} style={{ marginBottom: '10px' }}>
        Preview
      </button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} style={{ display: 'none' }} />
      {imageUrl && (
        <>
          <button onClick={onClickRemoveImage} style={{ marginBottom: '10px' }}>
            Delete
          </button>
          <img className={css.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <input
        className={css.title}
        type="text"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        className={css.tags}
        type="text"
        placeholder="Тэги"
        value={tags}
        onChange={e => setTags(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <SimpleMDE className={css.editor} value={text} onChange={onChange} options={options} />
      <div className={css.buttons}>
        <button onClick={onSubmit} style={{ marginRight: '10px', padding: '10px' }}>
          {isEditing ? 'Save' : 'Опубликовать'}
        </button>
        <a href="/">
          <button style={{ padding: '10px' }}>Отмена</button>
        </a>
      </div>
    </div>
  );
};
