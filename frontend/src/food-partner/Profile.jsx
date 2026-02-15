import React, { useEffect, useState } from "react";
import { data, Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { BsPlusSquareDotted } from "react-icons/bs";
import Back from "../components/Back";
import Cart from "../components/Cart";
import { useCart } from "../context/cartContext";

function Profile() {
  const { id } = useParams();
  const location = useLocation();
  const [user, setuser] = useState(false);
  const [profile, setProfile] = useState(null);
  const [foodItems, setFoodItems] = useState([]);

  const { addToCart } = useCart();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function fetch() {
    axios
      .get(`/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setProfile(response.data.foodPartner);
        setFoodItems(response.data.foodItemsByPartner);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile!", error);
      });

    if (location.pathname.includes("/user")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setuser(true);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetch();
  }, [fetch, id, location.pathname]);

  async function handleDelete(_id) {
    const res = await axios.delete(`/api/food/`, {
      data: { _id },
      withCredentials: true,
    });

    if (res.success) {
      window.alert("deleted successfully");
      fetch();
    }
  }

  return (
    <div className="h-full w-full  bg-linear-to-b from-[#061523] to-[#071827] overflow-auto relative ">
      <div className="flex justify-between w-full px-2 py-2">
        <Back />
        <Cart />
      </div>
      <div style={{ width: "100%", maxWidth: "100%", padding: "0.5rem" }}>
        <div
          style={{
            width: "99.3%",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(0,0,0,0.05))",
            borderRadius: "1.5rem",
            padding: "0.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255,255,255,0.03)",
            marginBottom: "0.875rem",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              marginBottom: "0.625rem",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background:
                  "linear-gradient(to bottom, rgb(15, 23, 42), rgb(2, 6, 23))",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                flexShrink: 0,
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                gap: "0.375rem",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  borderRadius: "1rem",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  width: "fit-content",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  padding: "0.375rem 0.75rem",
                }}
              >
                {profile?.name}
              </div>
              <div
                style={{
                  display: "inline-block",
                  borderRadius: "1.5rem",
                  fontSize: "0.75rem",
                  width: "fit-content",
                  color: "#98acb7",
                  padding: "0.25rem 0.625rem",
                }}
              >
                {profile?.address}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              padding: "0.5rem 0.625rem 0",
              gap: "0.75rem",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "1.125rem", fontWeight: "bold" }}>43</div>
              <div style={{ fontSize: "0.75rem", color: "#98acb7" }}>
                total meals
              </div>
            </div>
            <div style={{ flex: 1, textAlign: "right" }}>
              <div style={{ fontSize: "1.125rem", fontWeight: "bold" }}>
                15K
              </div>
              <div style={{ fontSize: "0.75rem", color: "#98acb7" }}>
                customer serve
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "0.75rem",
          }}
        >
          {!user ? (
            <Link
              className="fixed z-10 flex items-center justify-center border cursor-pointer h-15 w-15 bottom-5 right-5 rounded-2xl bg-white/6 border-white/10 backdrop-blur-2xl"
              to={"/food-partner"}
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
            </Link>
          ) : null}

          {foodItems?.map((item, i) => (
            <div
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.02), rgba(0,0,0,0.05))",
                borderRadius: "1rem",
                aspectRatio: "9/16",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
              key={i}
            >
              {!user && (
                <button
                  onClick={() => handleDelete(item._id)}
                  className="absolute z-10 flex items-center justify-center rounded-full bg-red-600/75 backdrop-blur-3xl w-7 h-7 top-1 right-1 hover:bg-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
              {user && (
                <div
                  onClick={() => addToCart(item)}
                  className="absolute z-1 right-1 bottom-1 flex items-center justify-center w-10 h-10 text-white  rounded-xl cursor-pointer bg-linear-to-b from-[#061523] to-[#071827]  border-white/4"
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </div>
              )}
              <video
                src={item.video}
                muted
                loop
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 300ms",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                  e.currentTarget.play();
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              ></video>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
