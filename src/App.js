import React, { useEffect, useState } from 'react';
import CommentList from './components/commentList/CommentList';
import AddCommentForm from './components/addCommentForm/AddCommentForm';
import { deleteComment, getAllComments, getCommentsFromThirdPartyApi } from './api/commentsApi';
import './App.css';
import ApiStatus from './enums/ApiStatus';
import Loader from './components/elementalComponents/loader/Loader';

const App = () => {

  const [comments, setComments] = useState(null);
  const [externalComments, setExternalComments] = useState(null);

  const [externalApiStatus, setExternalApiStatus] = useState(ApiStatus.IDLE);

  useEffect(() => {
    fetchComments();
    fetchCommentsFromExternalApi();
  }, []);

  const fetchComments = async () => {
    const commentsData = await getAllComments();
    setComments(commentsData);
  };

  const fetchCommentsFromExternalApi = async () => {
    setExternalApiStatus(ApiStatus.LOADING)
    try {
      const externalCommentsData = await getCommentsFromThirdPartyApi();
      setExternalComments(externalCommentsData);
      setExternalApiStatus(ApiStatus.SUCCESS)
    } catch (error) {
      setExternalApiStatus(ApiStatus.ERROR)
    }
    
  }

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
      <div className='app-layout'>
        <div>
          <AddCommentForm onAdd={handleAddComment} />
          <CommentList comments={comments} onDeleteClicked={handleDelete} onUpdate={handleUpdateComment}/>
        </div>
        <div style={{maxHeight: '900px', overflow: 'scroll'}}>
          <h4>Comments from a third party api: "https://jsonplaceholder.typicode.com/comments"</h4>
          {externalApiStatus === ApiStatus.LOADING ? <Loader />
           : <CommentList comments={externalComments} actionsEnabled={false}/>}
        </div>
      </div>
    </div>
  );
};

export default App;
