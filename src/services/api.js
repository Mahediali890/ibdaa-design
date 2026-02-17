/**
 * API Service
 * Handles contact form submissions to the backend server
 */

const API_BASE_URL = '/api';

async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        ...data,
      };
    }

    return data;
  } catch (error) {
    if (!error.status) {
      throw {
        success: false,
        error: 'Network error. Please check your connection.',
      };
    }
    throw error;
  }
}

/**
 * Contact API calls
 */
export const contactApi = {
  submit: (formData) => {
    return fetchApi('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};
