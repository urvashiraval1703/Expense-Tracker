export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("User");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};