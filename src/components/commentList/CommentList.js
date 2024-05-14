import React, { useEffect, useRef, useState } from 'react';
import UpdateCommentForm from '../updateCommentForm/UpdateCommentForm';
import './_commentList.css';

const CommentList = ({ 
  comments, 
  onUpdate, 
  onDeleteClicked,
  actionsEnabled=true 
}) => {
  const [selectedComment, setSelectedComment] = useState(null);

  const updateComponentRef = useRef(null)

  const handleUpdate = (comment) => {
    setSelectedComment(comment);
  };

  useEffect(() => {
    if(selectedComment){
      updateComponentRef.current.scrollIntoView();
    }
  }, [selectedComment])

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
            {
              actionsEnabled && <div className="comment-actions">
                <button onClick={() => onDeleteClicked(comment.id)}>Delete</button>
                <button onClick={() => handleUpdate(comment)}>Update</button>
              </div>
            }
          </div>
        ))}
      </div>
      {selectedComment && (
        <div ref={updateComponentRef}>
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
        </div>
      )}
    </div>
  );
};

export default CommentList;
