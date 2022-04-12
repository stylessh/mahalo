import data from "data.json";

export default function getProviderHomePage(providerId) {
  const provider = data.find((provider) => provider.provider_id === providerId);

  if (provider) {
    return provider.provider_homepage;
  }

  return null;
}
