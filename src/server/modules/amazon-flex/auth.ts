import { routes } from "./routes";

type Response = {
  success: {
    tokens: {
      bearer: {
        access_token: string;
      };
    };
  };
};

export const getFlexRequestAuthToken = async (
  username: string,
  password: string,
) => {
  try {
    const postPaylod = {
      requested_extensions: ["device_info", "customer_info"],
      cookies: {
        website_cookies: [],
        domain: ".amazon.com",
      },
      registration_data: {
        domain: "Device",
        app_version: "0.0",
        device_type: "A3NWHXTQ4EBCZS",
        os_version: "15.2",
        device_serial: "0000000000000000",
        device_model: "iPhone",
        app_name: "Amazon Flex",
        software_version: "1",
      },
      auth_data: {
        user_id_password: {
          user_id: username,
          password: password,
        },
      },
      user_context_map: {
        frc: "",
      },
      requested_token_type: ["bearer", "mac_dms", "website_cookies"],
    };

    const response = await fetch(routes.getAuthToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postPaylod),
    });

    const json = (await response.json()) as Response;

    return json.success.tokens.bearer.access_token;
  } catch (error) {
    console.error(error);

    return null;
  }
};
