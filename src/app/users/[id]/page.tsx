

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
}

export default function UserBlogsPage() {
  const { id } = useParams(); // Get user ID from URL

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUserBlogs = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/${id}/blogs`);

        // If response is OK, parse the data; if not (e.g., 404), set empty array
        const data = res.ok ? await res.json() : [];
        
        setBlogs(data);
      } catch (error) {
        // Only log real errors (e.g., network failure), not 404s
        console.error("Unexpected error fetching blogs:", error);
        setBlogs([]); // Fallback to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (blogs.length === 0) return <div className="flex justify-center items-center min-h-screen text-4xl text-red-600">Sorry! No blogs found for this user</div>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold">User Blogs</h1>
        <ul className="mt-4">
          {blogs.map((blog) => (
            <li key={blog.id}>
              <Link href={`/blogs/${blog.id}`} className="text-blue-500">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
