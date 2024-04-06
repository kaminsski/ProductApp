import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Comment() {
  const { productId } = useParams();
  const [comment, setComment] = useState("");

  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComment = async (productId) => {
      try {
        const response = await axios.get(
          `https://product-app-api.vercel.app/comment/getCommentByProduct/${productId}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchComment(productId);
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("auth"));
    const userId = user._id;
    try {
      const response = await axios.post(`https://product-app-api.vercel.app/comment/`, {
        productId,
        comment,
        userId,
      });
      const update = [...comments, response.data];
      setComments(update);
    } catch (error) {}
  };

  return (
    <div className="bg-gray-200 p-2 mb-10">
      <div className="flex justify-center">
        <h3 className="text-2xl font-bold mb-5">Comments</h3>
      </div>
      {comments &&
        comments.map((comment, index) => (
          <div key={index} className="bg-white p-4 mx-4 my-4 rounded-2xl">
            <p className="text-xl font-semibold">{comment.user.username}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      <div className="p-2 flex m-auto w-[300px] sm:w-[600px]">
        <form
          className="w-full mt-10 flex justify-center"
          onSubmit={handleSubmit}
        >
          <input
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2"
            placeholder="Make a comment"
            type="text"
          />
          <button className="bg-orange-400 text-white p-3 rounded-xl">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Comment;
