import React, { useState } from "react";
import PostRequestForm from "../components/PostRequestForm";

export default function PostService() {
  const [posted, setPosted] = useState(null);

  return (
    <div className="p-10">
      <PostRequestForm onPosted={(s) => setPosted(s)} />

      {posted && (
        <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-400">
          <strong>Posted:</strong> {posted.title} (Budget: ₹{posted.budget})
        </div>
      )}
    </div>
  );
}