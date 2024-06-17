import {Link} from 'react-router-dom'
import { signOut} from 'firebase/auth';
import { auth, db } from '../../../firebase-config';
import { useSelector, useDispatch } from 'react-redux'
import { deAuthorise } from '../../auth/authSlice';
import React, { useState, useEffect } from 'react'
import {getDocs, collection, deleteDoc, doc} from 'firebase/firestore'

const BlogHome = () => {
  const isAuth = useSelector((state) => state.auth.value);
  const dispatch = useDispatch()

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      dispatch(deAuthorise);
      window.location.pathname = "/blog";
  })
  }
  const [postLists, setPostLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const postCollectionRef = collection(db, 'posts');

  const getPosts = async() => {
    setLoading(true);
    const data = await getDocs(postCollectionRef);
    setPostLists(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
    setLoading(false)
  }
  useEffect(() => {
    getPosts();
  },[])

  const deletePost = async(id) => {
      const postdoc = doc(db, 'posts', id);
      await deleteDoc(postdoc);
      getPosts();
  }

  if(loading) {
    return (
      <>
      <div className='sm:border-t-0 border-t-2 py-2 mt-[60px] bg-gray-800'>
      {!isAuth ? <Link className='mx-2 text-green-500' to="/blog/login">Admin-Log-In</Link> :
      (
        <div className=''>
        <Link className='mx-2' to="/blog/createblog">Create Post</Link>
        <button className='bg-teal-500 hover:bg-teal-700 text-black-400 font-bold sm:py-2 px-4 rounded-sm' onClick = {signUserOut}>Log-Out</button>
        </div>
      )
      }
    </div>
    <h3 className='bg-gray-800 h-screen flex items-center justify-center text-white'>Loading....</h3>
    </>
    )
  }
  return (
    <>
    <div className='mt-[60px]'>
      {postLists.length === 0 ? <h3>No Posts to show</h3> : postLists.map((post) => {
        return (
          <div key={post.id} className='flex flex-col items-center p-4 bg-gray-800 '>
            <div className='border-2 border-gray-600 flex lg:flex-row flex-col-reverse justify-center items-center mx-4 my-8 p-2 rounded-lg lg:w-2/4 w-full h-auto bg-teal-200'>
              <div className='lg:w-2/4 w-full sm:h-96 h-auto lg:mr-4 p-2 rounded-lg'>
              <h5 className='text-black h-[15%] text-3xl font-semibold border-b-2 border-gray-500 flex items-center'>{post.title}</h5>
              <p className="h-auto sm:h-[65%]">
                {post.post}
              </p>
              <h5 className='h-[10%] flex items-end border-t-2 border-gray-500'>Author : {post.author.name}</h5>
              <a href={`https://${post.link}`} className='h-[10%] flex items-end border-t-2 border-gray-500'>{post.link}</a>
              {isAuth && post.author.id === auth.currentUser.uid ? <div className='h-[10%]'>
                  <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                    onClick={() => {deletePost(post.id)}}>Delete</button>
              </div> : <></>}    
              </div>
              <div className='lg:w-2/4 w-full flex justify-end '>
              <img src={post.imgUrl} className='lg:w-96 w-full h-96 object-cover' />
              </div>
            </div>
          </div>
        )
      })}
    </div>
    <div className='sm:border-t-0 border-t-2 py-2 bg-gray-800'>
      {!isAuth ? <Link className='mx-2 text-green-500' to="/blog/login">Admin-Log-In</Link> :
      (
        <div className=''>
        <Link className='mx-2' to="/blog/createblog">Create Post</Link>
        <button className='bg-teal-500 hover:bg-teal-700 text-black-400 font-bold sm:py-2 px-4 rounded-sm' onClick = {signUserOut}>Log-Out</button>
        </div>
      )
      }
    </div>
    </>
  )
}

export default BlogHome