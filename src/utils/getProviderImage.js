import redirects from "redirects.json";

export default function getProviderImage(providerId, providerOriginalImage) {
  const provider = {
    8: "Netflix",
    9: "Prime Video",
    119: "Prime Video",
    337: "Disney",
    76: "Viaplay",
    384: "HBO Max",
    118: "HBO Max",
    3: "Google Play",
    77: "C More",
    11: "Mubi",
    175: "Netflix Kids",
    383: "TV2 Play",
    350: "Apple TV",
    192: "Youtube",
    531: "Paramount",
    35: "RakutenTV",
    238: "IMDB TV",
    423: "Blockbuster",
    426: "SF Anytime",
    443: "Filmstriben",
    68: "Microsoft Store",
    331: "FlixFling",
    344: "RakutenViki",
  };

  if (redirects[providerId]) {
    providerId = redirects[providerId];
  }

  //   return url image based on provider id
  if (provider[providerId])
    return `/assets/providers/${provider[providerId]}.png`;

  // if not available, return default image

  return `https://image.tmdb.org/t/p/original/${providerOriginalImage}`;
}
