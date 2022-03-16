export default function getProviderImage(providerId, providerOriginalImage) {
  console.log(providerId);

  const provider = {
    8: "Netflix",
    9: "Prime Video",
    119: "Prime Video",
    337: "Disney",
    76: "Viaplay",
    384: "HBO Max"
  };

  //   return url image based on provider id
  if (provider[providerId])
    return `/assets/providers/${provider[providerId]}.png`;

  // if not available, return default image

  return `https://image.tmdb.org/t/p/original/${providerOriginalImage}`;
}
