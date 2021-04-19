import axios from 'axios'

const PostAPI = {
  getPosts: () => axios.get('/api/posts', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('user')}`
    }
  }),
  createPost: post => axios.post('/api/posts', post, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('user')}`
    }
  }),
  addLike: post => axios.put(`/api/posts/${post}`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('user')}`
    }
  })
}

export default PostAPI