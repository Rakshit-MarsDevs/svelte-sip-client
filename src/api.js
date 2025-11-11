// Missing base URL configuration
const API_URL = undefined;

export async function getToken() {
  // Wrong fetch call - API_URL is undefined
  const response = await fetch(`${API_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
    // Missing body
  });
  
  // Missing error handling
  return response.json();
}
