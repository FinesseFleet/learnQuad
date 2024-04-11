import React, { FC, useEffect, useState } from "react";
import axios from "axios";

type Props = {
  videoUrl: string;
  width: string;
  height: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, width, height }) => {
  function videoUrlId() {
    if (!videoUrl) return;
    let youtubeId = "";
    if (videoUrl.length > 11) {
      const linkArray = videoUrl.toString().split("be/");
      youtubeId = linkArray[1];
    } else {
      youtubeId = videoUrl;
    }

    return youtubeId;
  }

  let p1 = `https://www.youtube-nocookie.com/embed/${videoUrlId()}`;
  let p2 = "?rel=0";

  return (
    <>
      <div className=" relative max-[800px]:hidden">
        <iframe
          width={width}
          height={height}
          src={p1 + p2}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen
        ></iframe>
      </div>
      <div className=" flex justify-center min-[800px]:hidden">
        <iframe
          width={365}
          height={215}
          src={p1 + p2}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default CoursePlayer;
