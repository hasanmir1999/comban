export function decodeJWT(token) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = parts[1];
    const decoded = Buffer.from(payload, 'base64url').toString();
    return JSON.parse(decoded);
  } catch (error) {
    return null;
  }
}