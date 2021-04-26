import axios from 'axios'

const CommentAPI = {
  getComments: id => axios.get(`/api/comments/${id}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('user')}`
    }
  }),
  createComment: (comment, postID) => axios.post(`/api/comments/${postID}`, comment, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default CommentAPI