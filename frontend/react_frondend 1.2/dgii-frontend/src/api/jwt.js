export function getPayloadFromToken(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

export function getUserIdFromToken(token) {
  const payload = getPayloadFromToken(token);
  if (!payload) return null;

  // Tu backend usa userId
  return payload.userId || null;
}



export function getUserEmailFromToken(token) {
  const payload = getPayloadFromToken(token);
  return payload?.email || null;
}

export function getUserRoleFromToken(token) {
  const payload = getPayloadFromToken(token);
  return payload?.role || null;
}
