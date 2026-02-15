import React from "react";

function Back() {
  function handleBack() {
    window.history.back();
  }
  return (
    <div className="z-10">
      <button
        onClick={() => handleBack()}
        className="fixed flex items-center justify-center w-10 h-10 text-white border rounded-full cursor-pointer bg-white/6 border-white/4"
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
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
      </button>
    </div>
  );
}

export default Back;
