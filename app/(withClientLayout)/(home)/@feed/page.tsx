import { currentUser } from '@/services/AuthService'
import React from 'react'
import CreatePost from './_components/CreatePost';

const Feed = async () => {
  return (
    <div>
      <CreatePost />
      
    </div>
  )
}

export default Feed