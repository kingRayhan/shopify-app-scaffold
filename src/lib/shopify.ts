import queryString from "query-string";
import axios from "axios";

export const oAuthInstallationUrl = (
  shopUrl: string,
  scopes = "read_orders"
) => {
  const baseUrl = `${shopUrl}/admin/oauth/authorize`;
  const queries = queryString.stringify(
    {
      client_id: process.env.SHOPIFY_APP_API_KEY,
      scope: scopes,
      redirect_uri: process.env.BACKEND_ROOT_URL + "/auth/callback",
      nonce: Date.now().toString(),
      grant_options: ["per-user"],
    },
    { arrayFormat: "bracket" }
  );

  return `${baseUrl}?${queries}`;
};

export const getAccessToken = async (
  shopUrl: string,
  authorizedCode: string
) => {
  const baseUrl = `https://${shopUrl}/admin/oauth/access_token`;

  try {
    const { data } = await axios.post(baseUrl, {
      client_id: process.env.SHOPIFY_APP_API_KEY,
      client_secret: process.env.SHOPIFY_APP_SECRET,
      code: authorizedCode,
    });
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
