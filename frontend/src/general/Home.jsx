import React, { useState, useEffect, useEffectEvent } from "react";
import Feed from "../components/Feed";
import VideoCard from "../components/VideoCard";
import { FaHome, FaBookmark } from "react-icons/fa";
import api from "../api/axios";

function Home() {
  const [tab, setTab] = useState("home");
  const [saved, setSaved] = useState([]);
  const [fId, setFId] = useState(null);

  async function fetchSaved() {
    try {
      const res = await api.get("http://localhost:3000/api/food/save", {
        withCredentials: true,
      });
      setSaved(res.data.savedFoodEntries);
    } catch (e) {}
  }

  useEffect(() => {
    if (tab === "saved") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchSaved();
    }
  }, [tab]);

  return (
    <div>
      {tab === "home" ? (
        <Feed />
      ) : (
        <div>
          {saved.length === 0 ? (
            <div className="h-screen w-screen pr-8 bg-linear-to-b from-[#061523] to-[#071827]">
              <div className="text-center text-[#98acb7] h-full w-full flex items-center justify-center">
                <h3 className="text-2xl">No saved items</h3>
              </div>
            </div>
          ) : (
            <div className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth touch-pan-y">
              {saved.map((v, i) => (
                <VideoCard
                  key={i}
                  src={v?.foodId?.video}
                  description={v?.foodId?.description}
                  foodPartner={v?.foodId?.foodPartner}
                  likeCount={v?.foodId?.likeCount}
                  _id={v?.foodId?._id}
                  price={v?.foodId?.price}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-35 flex items-center justify-around h-12 bg-[#00000015] backdrop-blur-[1.5px] border-t border-[#ffffff44]">
        <button
          className={`flex  items-center active:bg-[#000000b1] w-full h-full justify-center `}
          onClick={() => setTab("home")}
        >
          {tab === "home" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="white"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          )}
        </button>
        <button
          className={`flex justify-center items-center gap-1 font-semibold active:bg-[#000000b1] w-full h-full`}
          onClick={() => setTab("saved")}
        >
          {tab === "saved" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="white"
              className="size-7"
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
              strokeWidth={1}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          )}
        </button>
      </nav>
    </div>
  );
}

export default Home;
