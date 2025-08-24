/**
 * The base URL for the trademarks API endpoint.
 * This URL is dynamically read from environment variables.
 * - In a production build on Vercel, it will use the NEXT_PUBLIC_API_URL set in the Vercel dashboard.
 * - In local development, it will use the NEXT_PUBLIC_API_URL from the `.env.local` file.
 * - A fallback to the localhost URL is provided for safety.
 */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1/trademarks';

/**
 * Fetches a paginated list of trademarks from the backend.
 * @param {number} page - The current page number (e.g., 1, 2, 3).
 * @param {number} limit - The number of items to fetch per page.
 * @returns {Promise<object>} A promise that resolves to an object containing the data list and the total count.
 */
export const getAllTrademarks = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  try {
    const response = await fetch(`${API_URL}?skip=${skip}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Error fetching trademark data.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getAllTrademarks:", error);
    return { data: [], total: 0 };
  }
};

/**
 * Creates a new trademark by sending data to the backend.
 * @param {object} trademarkData - The data for the new trademark ({ name, description, status }).
 */
export const createTrademark = async (trademarkData) => {
  try {
    // Note: For POST requests, we use the base API_URL without query parameters.
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trademarkData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to create trademark.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in createTrademark:", error);
    throw error;
  }
};

/**
 * Gets a single trademark by its ID.
 * @param {number} id The ID of the trademark to fetch.
 */
export const getTrademarkById = async (id) => {
  try {
    // We construct the URL for a specific resource by appending the ID.
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Trademark not found.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getTrademarkById:", error);
    throw error;
  }
};

/**
 * Updates an existing trademark.
 * @param {number} id The ID of the trademark to update.
 * @param {object} trademarkData The updated data.
 */
export const updateTrademark = async (id, trademarkData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trademarkData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to update trademark.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in updateTrademark:", error);
    throw error;
  }
};

/**
 * Deletes a trademark by its ID.
 * @param {number} id The ID of the trademark to delete.
 */
export const deleteTrademark = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to delete trademark.');
    }
    return true;
  } catch (error) {
    console.error("Error in deleteTrademark:", error);
    throw error;
  }
};