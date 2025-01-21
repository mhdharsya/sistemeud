const showRegis = async (req, res) => {
    try {
      res.render("register", { activePage: "register"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showRegis
  };