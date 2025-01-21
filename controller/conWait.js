const showWait = async (req, res) => {
    try {
      res.render("wait", { activePage: "wait"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showWait
  };