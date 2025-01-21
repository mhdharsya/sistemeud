const showReset = async (req, res) => {
    try {
      res.render("resetPassword", { activePage: "resetPassword"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showReset
  };