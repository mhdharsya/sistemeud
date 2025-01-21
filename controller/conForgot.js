const showForgot = async (req, res) => {
    try {
      res.render("forgotPassword", { activePage: "forgotPassword"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showForgot
  };