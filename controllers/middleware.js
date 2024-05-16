const isLogged = (req, res, next) => {
  const user_id = localStorage.getItem("user_id");
  const user_tipo = localStorage.getItem("user_tipo");
  const user_nome = localStorage.getItem("user_nome");
  if (!user_id || !user_nome || !user_tipo) {
    localStorage.removeItem("user_nome");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_tipo");
    return (window.location.href = "/login");
  }
  return next();
};

export default {isLogged};
