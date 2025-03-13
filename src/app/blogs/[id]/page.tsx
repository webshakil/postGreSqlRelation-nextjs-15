"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Blog {
  id: number;
  title: string;
  content: string;
  author: { name: string }; // Assuming relation exists
}

export default function BlogPage() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blogs/${id}`);
       
        if (!res.ok) throw new Error("Failed to fetch blog");

        setBlog(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;

  return (


    <div className="flex justify-center items-center min-h-screen">
  <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl text-center">
    <h1 className="text-3xl font-bold">{blog.title}</h1>
    
    <p className="mt-4">{blog.content}</p>
  </div>
</div>

  );
}

