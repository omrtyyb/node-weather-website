// geocode.mjs
import fetch from 'node-fetch';

export async function getLatLong(text, callback) {
  try {
    const encodedText = encodeURIComponent(text);

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodedText}&apiKey=c4ed2a49e68d4363b7d8af6c2e8b209b`,
      { method: 'GET' }
    );

    const result = await response.json();
    callback(result, null);
  } catch (error) {
    callback(null, error);
  }
}
