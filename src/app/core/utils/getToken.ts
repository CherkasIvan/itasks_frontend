export function getToken(): string | null {
  const authData = localStorage.getItem('auth');
  if (authData) {
    return JSON.parse(authData).token;
  } else {
    return null;
  }
}
