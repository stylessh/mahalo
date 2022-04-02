const YoutubeEmbed = ({ embedId }) => (
  <iframe
    className="w-full h-full md:w-[600px] md:h-[350px]"
    width="853"
    height="480"
    src={`https://www.youtube.com/embed/${embedId}?controls=0`}
    frameBorder="0"
    controls="0"
    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; gyroscope;"
    allowFullScreen
    title="Embedded youtube trailer"
  />
);

export default YoutubeEmbed;
