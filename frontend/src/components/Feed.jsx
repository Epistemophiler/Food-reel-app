import React, { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";
import axios from "axios";

const Feed = () => {
  const containerRef = useRef(null);
  const [foodItm, setFoodItm] = React.useState([]);
  const [likedId, setlikedId] = useState([]);
  const [saveId, setSaveId] = useState([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const videos = container.querySelectorAll("video");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0.5, 0.75, 1] },
    );

    videos.forEach((v) => observer.observe(v));

    return () => observer.disconnect();
  }, [foodItm]);

  async function fetchFood() {
    await axios
      .get("/api/food", { withCredentials: true })
      .then((res) => {
        setFoodItm(res.data.foodItem);
      })
      .catch((err) => {});
  }

  async function fetchLikes() {
    await axios
      .get("/api/food/liked", { withCredentials: true })
      .then((res) => {
        setlikedId(res.data);
      })
      .catch((err) => {});
  }

  async function fetchSaves() {
    await axios.get("api/food/save", { withCredentials: true }).then((res) => {
      setSaveId(res.data?.saveFood);
    });
  }

  useEffect(() => {
    fetchFood();
    fetchLikes();
    fetchSaves();
  }, []);

  return (
    <div
      className="w-full h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth touch-pan-y"
      ref={containerRef}
    >
      {foodItm.map((v, idx) => (
        <VideoCard
          key={idx}
          src={v.video}
          name={v.name}
          description={v.description}
          foodPartner={v.foodPartner}
          likeCount={v.likeCount}
          _id={v._id}
          price={v.price}
          isLiked={likedId.includes(v._id)}
          isSaved={saveId.includes(v._id)}
        />
      ))}
    </div>
  );
};

export default Feed;
