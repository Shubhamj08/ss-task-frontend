import React, { useEffect, useState } from 'react';
import { updateComment } from '../../api/commentsApi';
import './_updateCommentForm.css';


const UpdateCommentForm = ({ 
  id, 
  initialName, 
  initialEmail, 
  initialBody, 
  onUpdate 
}) => {

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [body, setBody] = useState(initialBody);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedComment = await updateComment(id, { name, email, body });
    onUpdate(updatedComment);
  };

  useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
    setBody(initialBody);
  }, [initialName, initialEmail, initialBody]);

  return (
    <form onSubmit={handleSubmit} className="update-comment-form">
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <textarea value={body} onChange={(e) => setBody(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateCommentForm;
