// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// interface User {
//   id: number;
//   name: string;
// }

// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   author: string; // This will store the user's name
// }

// export default function Home() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [name, setName] = useState("");
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [userId, setUserId] = useState("");
//   const [loading, setLoading] = useState(true); // State to track loading

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const usersRes = await fetch("http://localhost:3000/api/users");
//         const blogsRes = await fetch("http://localhost:3000/api/blogs");

//         if (!usersRes.ok || !blogsRes.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const usersData = await usersRes.json();
//         const blogsData = await blogsRes.json();

//         setUsers(usersData);
//         setBlogs(blogsData);
//         setLoading(false); // Set loading to false once data is fetched
//       } catch (err) {
//         console.error(err);
//         setLoading(false); // Ensure loading is set to false in case of an error
//       }
//     };

//     fetchData();
//   }, []);

//   const createUser = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!name) return;
//     const res = await fetch("http://localhost:3000/api/users", {
//       method: "POST",
//       body: JSON.stringify({ name }),
//       headers: { "Content-Type": "application/json" },
//     });
//     if (res.ok) {
//       const newUser = await res.json();
//       setUsers([...users, newUser]);
//       setName("");
//     } else {
//       console.error("Failed to create user");
//     }
//   };

//   const createBlog = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!userId || !title || !content) return;

//     // Find the user's name based on the selected userId
//     const user = users.find((user) => user.id === parseInt(userId));
//     if (!user) return; // Ensure user exists

//     const res = await fetch("http://localhost:3000/api/blogs", {
//       method: "POST",
//       body: JSON.stringify({
//         user_id: userId,
//         title,
//         content,
//         author: user.name, // Add the user's name as the author of the blog
//       }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (res.ok) {
//       const newBlog = await res.json();
//       setBlogs([...blogs, newBlog]);
//       setTitle("");
//       setContent("");
//     } else {
//       console.error("Failed to create blog");
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state while fetching data
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Next.js 15 Blog</h1>

//       <form onSubmit={createUser} className="mb-4 flex space-x-2">
//         <input
//           className="border p-2 rounded"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="New user name"
//         />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
//       </form>

//       <form onSubmit={createBlog} className="mb-6 space-y-2">
//         <select
//           className="border p-2 rounded w-full"
//           value={userId}
//           onChange={(e) => setUserId(e.target.value)}
//         >
//           <option value="">Select User</option>
//           {users.map((user) => (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           ))}
//         </select>
//         <input
//           className="border p-2 rounded w-full"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="Blog Title"
//         />
//         <textarea
//           className="border p-2 rounded w-full"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//           placeholder="Blog Content"
//         ></textarea>
//         <button className="bg-green-500 text-white px-4 py-2 rounded">Add Blog</button>
//       </form>

//       <div className="grid grid-cols-3 gap-6">
//         <div>
//           <h2 className="font-bold">Users</h2>
//           {users.map((user) => (
//             <Link key={user.id} href={`/users/${user.id}`} className="block text-blue-600">
//               {user.name}
//             </Link>
//           ))}
//         </div>
//         <div className="col-span-2">
//           <h2 className="font-bold">Blogs</h2>
//           {blogs.map((blog) => (
//             <Link key={blog.id} href={`/blogs/${blog.id}`} className="block">
//               {blog.title}
//             </Link>
//           ))}
//         </div>
//       </div>
      
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
  id: number;
  name: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  author: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await fetch("http://localhost:3000/api/users");
        const blogsRes = await fetch("http://localhost:3000/api/blogs");

        if (!usersRes.ok || !blogsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const usersData = await usersRes.json();
        const blogsData = await blogsRes.json();

        setUsers(usersData);
        setBlogs(blogsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const newUser = await res.json();
      setUsers([...users, newUser]);
      setName("");
    } else {
      console.error("Failed to create user");
    }
  };

  const createBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !title || !content) return;

    const user = users.find((user) => user.id === parseInt(userId));
    if (!user) return;

    const res = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
        title,
        content,
        author: user.name,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const newBlog = await res.json();
      setBlogs([...blogs, newBlog]);
      setTitle("");
      setContent("");
    } else {
      console.error("Failed to create blog");
    }
  };

  // ✅ Function to Delete a Blog
  const deleteBlog = async (id: number) => {
    const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } else {
      console.error("Failed to delete blog");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Next.js 15 Blog</h1>

      <form onSubmit={createUser} className="mb-4 flex space-x-2">
        <input
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New user name"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
      </form>

      <form onSubmit={createBlog} className="mb-6 space-y-2">
        <select
          className="border p-2 rounded w-full"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <input
          className="border p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
        />
        <textarea
          className="border p-2 rounded w-full"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Blog Content"
        ></textarea>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Add Blog</button>
      </form>

      <div className="grid grid-cols-3 gap-6">
        <div>
          <h2 className="font-bold">Users</h2>
          {users.map((user) => (
            <Link key={user.id} href={`/users/${user.id}`} className="block text-blue-600">
              {user.name}
            </Link>
          ))}
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">Blogs</h2>
          {blogs.map((blog) => (
            <div key={blog.id} className="flex justify-between items-center border-b py-2">
              <Link href={`/blogs/${blog.id}`} className="text-blue-500">
                {blog.title}
              </Link>
              <button
                onClick={() => deleteBlog(blog.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

