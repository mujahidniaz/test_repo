import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "./constants";
import { toast } from "react-toastify";
import { json } from "react-router-dom";

export async function make_post_request(endpoint, payload, navigate) {
  try {
    const promise = axios.post(`${API_BASE_URL}/${endpoint}`, payload);
    return handleRequest(promise);
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      return {
        status: error.response.status,
        message: error.response.data.detail,
      };
    }
    try {
      return {
        status: error.response.status,
        message: error.response.data.detail,
      };
    } catch (error) {
      toast.error("Error: Server is unreachable");
      return {
        status: 503,
        message: "Error: Server is unreachable",
      };
    }
  }
}

function get_current_role() {
  const curr = localStorage.getItem("currentRole");

  if (curr !== undefined && curr !== null) {
    const parsedCurr = JSON.parse(curr);
    return parsedCurr.id;
  } else {
    return null;
  }
}

async function handleRequest(requestPromise, navigate) {
  try {
    toast.promise(
      requestPromise,
      {
        pending: "Logging In..",
        success: "Login Successful",
        // error: "Error",
      },
      { autoClose: 1000 }
    );
    const result = await requestPromise;
    return { response: result, error: null };
  } catch (error) {
    if (error.response.status == 401) {
      toast.error("Invalid Username/Password");
    } else {
    }
    console.log(error);

    localStorage.removeItem("accessToken");

    return { response: null, error: error };
  }
}
async function handleAuthRequest(requestPromise, navigate) {
  try {
    toast.promise(
      requestPromise,
      {
        pending: "Loading Data..",
        success: "Data Loaded",
        // error: "error",
      },
      { autoClose: 1000 }
    );
    const result = await requestPromise;

    if (result.response && result.response.status === 401) {
      // show a notification to the user that they have been logged out
      toast.error("Your session has expired. Please login again.");
      // clear the expired token from local storage
      localStorage.removeItem("accessToken");
      // redirect the user to the login page
      navigate("/login");
    }

    return { response: result, error: null };
  } catch (error) {
    if (error.response && error.response.status === 403) {
      navigate("/forbidden");
    }
    // toast.error(error.response.data.error, { autoClose: 1000 });
    // localStorage.removeItem("accessToken");
    // navigate("/login");
    return { response: null, error: error.response.data.error };
  }
}

export function make_auth_get_request(endpoint, navigate) {
  const token = localStorage.getItem("accessToken");
  const role = get_current_role();
  if (endpoint.includes("?")) {
    endpoint = endpoint + "&role=" + role;
  } else {
    endpoint = endpoint + "?role=" + role;
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const requestPromise = axios.get(`${API_BASE_URL}/${endpoint}`, config);
  return handleAuthRequest(requestPromise, navigate);
}

export function make_auth_delete_request(endpoint, navigate) {
  const token = localStorage.getItem("accessToken");
  const role = get_current_role();
  if (endpoint.includes("?")) {
    endpoint = endpoint + "&role=" + role;
  } else {
    endpoint = endpoint + "?role=" + role;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const requestPromise = axios.delete(`${API_BASE_URL}/${endpoint}`, config);
  return handleAuthRequest(requestPromise, navigate);
}

export function make_auth_post_request(endpoint, payload, navigate) {
  const token = localStorage.getItem("accessToken");
  const role = get_current_role();
  if (endpoint.includes("?")) {
    endpoint = endpoint + "&role=" + role;
  } else {
    endpoint = endpoint + "?role=" + role;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const requestPromise = axios.post(
    `${API_BASE_URL}/${endpoint}`,
    payload,
    config
  );
  return handleAuthRequest(requestPromise, navigate);
}

export function make_auth_put_request(endpoint, payload, navigate) {
  const token = localStorage.getItem("accessToken");
  const role = get_current_role();
  if (endpoint.includes("?")) {
    endpoint = endpoint + "&role=" + role;
  } else {
    endpoint = endpoint + "?role=" + role;
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const requestPromise = axios.put(
    `${API_BASE_URL}/${endpoint}`,
    payload,
    config
  );
  return handleAuthRequest(requestPromise, navigate);
}
