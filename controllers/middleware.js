const isLogged = (req, res, next) => {
  // console.log(req.header, req.headers);
  // if (!user_id || !user_nome || !user_tipo) {
  //   window.localStorage.removeItem("user_nome");
  //   window.localStorage.removeItem("user_id");
  //   window.localStorage.removeItem("user_tipo");
  //return res.redirect("/login");

  return next();
};

export default {isLogged};
