const showDetailAnalisis = async (req, res) => {
    try {
      res.render("detailAnalisis", { activePage: "detailAnalisis"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showDetailAnalisis
  };