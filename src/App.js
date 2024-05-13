import React, { useEffect, useState } from 'react';
import CommentList from './components/commentList/CommentList';
import AddCommentForm from './components/addCommentForm/AddCommentForm';
import { deleteComment, getAllComments } from './api';
import './App.css';

const App = () => {

  const [comments, setComments] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const commentsData = await getAllComments();
    setComments(commentsData);
  };

  const handleAddComment = (newComment) => {
    fetchComments()
  };

  const handleUpdateComment = (updatedComment) => {
    fetchComments()
  };

  const handleDelete = async (id) => {
    await deleteComment(id);
    fetchComments();
  };

  return (
    <div className='App'>
      <AddCommentForm onAdd={handleAddComment} />
      <CommentList comments={comments} onDeleteClicked={handleDelete} onUpdate={handleUpdateComment}/>
    </div>
  );
};

export default App;
