import React, { useState } from 'react';
import UpdateCommentForm from '../updateCommentForm/UpdateCommentForm';
import './_commentList.css';

const CommentList = ({ 
  comments, 
  onUpdate, 
  onDeleteClicked 
}) => {
  const [selectedComment, setSelectedComment] = useState(null);

  const handleUpdate = (comment) => {
    setSelectedComment(comment);
  };

  return (
    <div>
      <h2>Comments</h2>
      <div className="comment-list">
        {comments?.map(comment => (
          <div key={comment.id} className="comment-item">
            <div className="comment-details">
              <div className='comment-head'>
                <div><b>{comment.name}</b></div>
                <div><i>{comment.email}</i></div>
              </div>
              <p>{comment.body}</p>
            </div>
            <div className="comment-actions">
              <button onClick={() => onDeleteClicked(comment.id)}>Delete</button>
              <button onClick={() => handleUpdate(comment)}>Update</button>
            </div>
          </div>
        ))}
      </div>
      {selectedComment && (
        <UpdateCommentForm
          id={selectedComment.id}
          initialName={selectedComment.name}
          initialEmail={selectedComment.email}
          initialBody={selectedComment.body}
          onUpdate={(updatedComment) => {
            setSelectedComment(null);
            onUpdate(updatedComment)
          }}
        />
      )}
    </div>
  );
};

export default CommentList;
