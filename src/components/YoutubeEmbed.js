import React from "react";

const YoutubeEmbed = ({ embedId }) => (
  <iframe
    className="w-full h-full md:w-[600px] md:h-[350px]"
    width="853"
    height="480"
    src={`https://www.youtube.com/embed/${embedId}`}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="Embedded youtube trailer"
  />
);

export default YoutubeEmbed;
