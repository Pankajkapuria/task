import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);

      const fetchPosts = async () => {
        setLoading(true);
        const res = await fetch(`/api/post/getposts`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setLoading(false);
        }
      };
      fetchPosts();
    }, [location.search]);

    return (
      <div className='flex flex-col md:flex-row'>
        <div className='w-full'>
          <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
            Posts results:
          </h1>
          <div className='p-7 flex flex-wrap gap-4'>
            {!loading && posts.length === 0 && (
              <p className='text-xl text-gray-500'>No posts found.</p>
            )}
            {loading && <p className='text-xl text-gray-500'>Loading...</p>}
            {!loading &&
              posts &&
              posts.map((post) => <PostCard key={post._id} post={post} />)}
          </div>
        </div>
      </div>
    );
}
