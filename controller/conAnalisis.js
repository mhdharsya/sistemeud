const showAnalisis = async (req, res) => {
    try {
      res.render("analisis.ejs");
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showAnalisis
  };