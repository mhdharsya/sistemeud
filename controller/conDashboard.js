const showDashboard = async (req, res) => {
    try {
      res.render("dashboard");
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showDashboard
  };