import React, { useEffect, useState } from 'react';
import { updateComment } from '../../api/commentsApi';
import ApiStatus from '../../enums/ApiStatus';
import Loader from '../elementalComponents/loader/Loader';
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

  const [apiStatus, setApiStatus] = useState(ApiStatus.IDLE)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiStatus(ApiStatus.LOADING);
    const updatedComment = await updateComment(id, { name, email, body });
    setApiStatus(ApiStatus.SUCCESS);
    onUpdate(updatedComment);
  };

  useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
    setBody(initialBody);
  }, [initialName, initialEmail, initialBody]);

  if(apiStatus === ApiStatus.LOADING){
    return <Loader />
  }

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
