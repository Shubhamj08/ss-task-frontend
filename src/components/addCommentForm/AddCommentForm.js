import React, { useState } from 'react';
import { addComment } from '../../api/commentsApi';
import './_addCommentForm.css';

const AddCommentForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = await addComment({ name, email, body });
    onAdd(newComment);
    setName('');
    setEmail('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-comment-form">
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea placeholder="Comment" value={body} onChange={(e) => setBody(e.target.value)} />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddCommentForm;
