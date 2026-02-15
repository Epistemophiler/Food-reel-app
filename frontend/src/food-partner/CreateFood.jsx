import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../components/Back";
import api from "../api/axios";

function CreateFood() {
  const navigate = useNavigate();
  const [videoFile, setVideoFile] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState("");
  const fileRef = useRef(null);

  const handleVideoChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setVideoFile(f);
      setVideoURL(URL.createObjectURL(f));
    } else {
      setVideoFile(null);
      setVideoURL("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", videoFile);
    formData.append("price", price);

    try {
      const res = await api.post("/api/food", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/food-partner/" + res.data.food.foodPartner);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-linear-to-b from-[#061523] to-[#071827] overflow-y-scroll overflow-x-hidden">
      {loading && (
        <div className="flex w-full h-full text-center ">Loading</div>
      )}
      <div className="mt-1 ml-3 ">
        <Back />
      </div>
      <div
        className="flex"
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "1rem",
          opacity: loading ? 0 : 1,
          marginTop: "35px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "47rem",
            backgroundColor: "rgba(255,255,255,0.02)",
            borderRadius: "1.5rem",
            boxShadow: "0 12px 40px rgba(3, 8, 18, 0.6)",
            border: "1px solid rgba(255,255,255,0.03)",
            padding: "1.75rem",
          }}
        >
          <div className="">
            <h2
              style={{
                fontSize: "1.5rem",
                color: "#e8f2f7",
                marginBottom: "1.5rem",
                fontWeight: "bold",
              }}
            >
              Create Food
            </h2>
          </div>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
            onSubmit={handleSubmit}
          >
            <div>
              <label
                style={{
                  display: "block",
                  color: "#e8f2f7",
                  fontWeight: "bold",
                  fontSize: "0.875rem",
                  marginBottom: "0.625rem",
                }}
              >
                Food video
              </label>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  borderRadius: "1rem",
                  border: "2px dashed rgba(255,255,255,0.06)",
                  transition: "all 300ms",
                  width: videoURL ? "100%" : "128px",
                  height: videoURL ? "auto" : "128px",
                  aspectRatio: videoURL ? "16 / 9" : "auto",
                }}
              >
                <label
                  htmlFor="vid"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {videoURL ? (
                    <video
                      src={videoURL}
                      controls
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "black",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        color: "#98acb7",
                        padding: "0.75rem",
                        textAlign: "center",
                      }}
                    >
                      No video selected
                    </div>
                  )}
                </label>
              </div>
              <input
                ref={fileRef}
                style={{ marginTop: "0.625rem" }}
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                id="vid"
              />
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    display: "block",
                    color: "#e8f2f7",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    marginBottom: "0.625rem",
                  }}
                >
                  Food name
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "1rem",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    color: "#e8f2f7",
                    transition: "all 200ms",
                    fontSize: "0.875rem",
                    fontFamily: "inherit",
                  }}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Butter Chicken"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    display: "block",
                    color: "#e8f2f7",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    marginBottom: "0.625rem",
                  }}
                >
                  Price
                </label>
                <input
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "1rem",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    color: "#e8f2f7",
                    transition: "all 200ms",
                    fontSize: "0.875rem",
                    fontFamily: "inherit",
                  }}
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. 999"
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label
                  style={{
                    display: "block",
                    color: "#e8f2f7",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    marginBottom: "0.625rem",
                  }}
                >
                  Description
                </label>
                <textarea
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "1rem",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    color: "#e8f2f7",
                    transition: "all 200ms",
                    fontSize: "0.875rem",
                    fontFamily: "inherit",
                    resize: "none",
                  }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description..."
                  rows={4}
                />
              </div>

              <button
                type="submit"
                style={{
                  padding: "0.75rem 1.25rem",
                  borderRadius: "1.5rem",
                  border: "none",
                  backgroundColor: "#061523",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "all 150ms",
                  boxShadow: "0 6px 18px rgba(4, 10, 16, 0.45)",
                }}
              >
                Create Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateFood;
