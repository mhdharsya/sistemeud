const showRiwayat = async (req, res) => {
    try {
      res.render("riwayat", { activePage: "riwayat"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showRiwayat
  };