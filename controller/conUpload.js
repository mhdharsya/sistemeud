const showUpload = async (req, res) => {
    try {
      res.render("upload", { activePage: "upload"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showUpload
  };