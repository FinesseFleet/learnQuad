import React from "react";
import "./Loader.css";
import dynamic from "next/dynamic";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader"></div>
    </div>
  );
};

export default dynamic (() => Promise.resolve(Loader), {ssr: false})
