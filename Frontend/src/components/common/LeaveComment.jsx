import React, { useState, useEffect } from "react";
import { MessageCircle, Loader } from "lucide-react";

const API =
  process.env.NODE_ENV === "production"
    ? "https://dynamicnewsbackend.vercel.app/admin/upload"
    : "http://localhost:5000/admin/upload";
 
export default function LeaveComment({ blogId }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  // Fetch comments on mount
  useEffect(() => {
    setLoading(true);
    fetch(`${API}/${blogId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setComments([]);
        setLoading(false);
      });
  }, [blogId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    setPosting(true);
    fetch(`${API}/${blogId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ author, comment }),
    })
      .then((res) => res.json())
      .then((newComment) => {
        setComments((prev) => [newComment, ...prev]);
        setComment("");
        setAuthor("");
        setPosting(false);
        setError("");
      })
      .catch(() => {
        setError("Failed to post comment.");
        setPosting(false);
      });
  };

  return (
    <div>
      {/* Comment form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <div className="flex gap-3 flex-col md:flex-row">
          <input
            type="text"
            value={author}
            placeholder="Your name"
            onChange={(e) => setAuthor(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-1/3"
            required
            maxLength={32}
          />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            className="px-3 py-2 border rounded w-full"
            rows={2}
            required
            maxLength={400}
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold"
          disabled={posting}
        >
          {posting ? <Loader className="animate-spin" size={18} /> : <MessageCircle size={18} />}
          {posting ? "Posting..." : "Post Comment"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
      {/* Comments list */}
      <div>
        <h3 className="font-bold mb-2 text-lg">{comments.length} Comment{comments.length !== 1 && "s"}</h3>
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader className="animate-spin text-orange-500" size={18} /> Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-gray-500">No comments yet. Be the first!</div>
        ) : (
          <ul className="space-y-4">
            {comments.map((c, i) => (
              <li
                key={c._id || i}
                className="bg-gray-100 rounded p-3 shadow flex flex-col"
              >
                <div className="flex items-center mb-1">
                  <span className="font-bold text-gray-800 mr-2">{c.author}</span>
                  <span className="text-xs text-gray-500">{c.createdAt ? new Date(c.createdAt).toLocaleString() : ""}</span>
                </div>
                <div className="text-gray-700">{c.comment}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}