import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegBookmark,
  FaBookmark,
} from "react-icons/fa";
import axios from "axios";
import Back from "./Back";
import Cart from "./Cart";
import { useCart } from "../context/cartContext";
import api from "../api/axios";

const VideoCard = ({
  src,
  description,
  foodPartner,
  likeCount,
  _id,
  isLiked,
  isSaved,
  name,
  price,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likeCount);
  const [saved, setSaved] = useState(isSaved);
  // const [saves, setSaves] = useState()
  const [comments, setComments] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLiked(isLiked);
    setSaved(isSaved);
  }, [isLiked, isSaved]);

  async function handleLikes() {
    try {
      const res = await api.post(
        "http://localhost:3000/api/food/like",
        { foodId: _id },
        { withCredentials: true },
      );

      const isLikedNow = res.data.like;

      setLiked(isLikedNow);
      setLikes((prev) => (isLikedNow ? prev + 1 : prev - 1));
    } catch (error) {}
  }

  async function toggleSave() {
    try {
      const res = await api.post(
        "http://localhost:3000/api/food/save",
        { foodId: _id },
        { withCredentials: true },
      );
      const isSavedNow = res.data.save;
      setSaved(isSavedNow);
    } catch (e) {}
  }

  const addComment = (e) => {};

  function handleCart(src, _id, name, price) {
    const item = {
      src,
      _id,
      name,
      price,
    };

    addToCart(item);
  }

  return (
    <>
      <div className="flex py-2 pl-2">
        <button
          onClick={() => navigate("/")}
          className="fixed z-10 flex items-center justify-center w-10 h-10 text-white border rounded-full cursor-pointer bg-black/15 border-white/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </button>
        <Cart />
      </div>
      <div className="h-[calc(100vh-0px)] w-full relative snap-start shrink-0 bg-black flex items-center justify-center">
        <video
          className="block object-cover w-full h-full"
          src={src}
          playsInline
          muted
          loop
          controls={false}
          autoPlay
        />

        <div className="absolute left-0 right-0 bottom-0 pointer-events-auto p-5 bg-linear-to-t from-[#020617]/60 to-transparent">
          {/* Bottom-left : name, follow, description */}
          <div className="flex flex-col items-start gap-2 mb-10 pointer-events-auto">
            <div
              className="text-white text-sm leading-6 overflow-hidden line-clamp-2 max-w-[80%]"
              style={{ marginBottom: 3 }}
            >
              {description}
            </div>

            <div className="flex items-center justify-end px-2 backdrop-blur-2xl py-1 border rounded-[14px] border-white/50">
              <span className="text-[14px] font-bold text-neutral-300">
                Rs.{price}
              </span>
            </div>

            <div className="flex gap-2">
              <Link
                className="inline-block font-bold text-sm shadow px-3 py-2 rounded-full bg-[#030925e1] text-white"
                to={"/user/food-partner/" + foodPartner}
                target="_self"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Visit Store
              </Link>
              <button
                onClick={() => handleCart(src, _id, name, price)}
                className="w-14 px-1 py-1 border rounded-2xl border-white/50 backdrop-blur-[1px] flex items-center justify-center "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="text-white size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right-side vertical actions */}
          <div className="absolute z-50 flex flex-col items-center gap-6 right-3 bottom-16">
            <div className="flex flex-col items-center gap-1">
              <button
                className="flex items-center justify-center w-10 h-10 text-white border rounded-full cursor-pointer bg-white/6 border-white/4"
                onClick={handleLikes}
                aria-label="like"
              >
                {liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="red"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
              </button>
              <div className="text-xs text-white">{likes}</div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button
                className="flex items-center justify-center w-10 h-10 text-white border rounded-full cursor-pointer bg-white/6 border-white/4"
                onClick={addComment}
                aria-label="comment"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                  />
                </svg>
              </button>
              <div className="text-xs text-white">{comments.length}</div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button
                className="flex items-center justify-center w-10 h-10 text-white border rounded-full cursor-pointer bg-white/6 border-white/4"
                onClick={toggleSave}
                aria-label="save"
              >
                {saved ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
