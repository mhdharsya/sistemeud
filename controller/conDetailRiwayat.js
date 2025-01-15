const showDetailRiwayat = async (req, res) => {
    try {
      res.render("detailRiwayat", { activePage: "detailRiwayat"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showDetailRiwayat
  };