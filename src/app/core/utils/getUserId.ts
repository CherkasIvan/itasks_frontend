export function getUserId(): string | null {
  const authData = localStorage.getItem('auth');
  if (authData) {
    return JSON.parse(authData).user.id;
  } else {
    return null;
  }
}
