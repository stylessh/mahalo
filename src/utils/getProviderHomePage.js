import data from "data.json";
import redirects from "redirects.json";

export default function getProviderHomePage(providerId) {
  if (redirects[providerId]) {
    providerId = redirects[providerId];
  }

  const provider = data.find((provider) => provider.provider_id === providerId);

  if (provider) {
    return provider.provider_homepage;
  }

  return null;
}
