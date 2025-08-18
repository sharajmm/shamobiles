import React, { useState, useEffect } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../services/firebase";
import { Calendar, User } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  image?: string; // external image link
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const q = query(collection(db, "blog"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const blogPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as BlogPost[];

      setPosts(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Default posts to show when no posts exist
  // Only show posts from Firestore (admin-added)
  const postsToShow = posts;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mobile Care Blog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert tips, guides, and latest news about mobile device care and
            repair.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {postsToShow.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setActivePost(post)}
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h2>
              <div className="flex items-center text-gray-500 text-xs mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{post.createdAt.toLocaleDateString()}</span>
                <User className="h-4 w-4 ml-4 mr-2" />
                <span>RepairPro Team</span>
              </div>
              <p className="text-gray-700 line-clamp-3">
                {post.content.slice(0, 120)}...
              </p>
            </div>
          ))}
        </div>

        {/* Popup for blog post */}
        {activePost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-8 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 text-xl"
                onClick={() => setActivePost(null)}
              >
                &times;
              </button>
              {activePost.image && (
                <img
                  src={activePost.image}
                  alt={activePost.title}
                  className="w-full h-56 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {activePost.title}
              </h2>
              <div className="flex items-center text-gray-500 text-sm mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{activePost.createdAt.toLocaleDateString()}</span>
                <User className="h-4 w-4 ml-4 mr-2" />
                <span>RepairPro Team</span>
              </div>
              <div className="prose max-w-none">
                {activePost.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {posts.length === 0 && (
          <div className="text-center mt-8 p-6 bg-green-50 rounded-lg">
            <p className="text-green-700">
              No blog posts yet. Admin can add new posts through the admin
              panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
