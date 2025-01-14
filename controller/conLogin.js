const showLogin = async (req, res) => {
    try {
      res.render("login", { activePage: "login"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showLogin
  };