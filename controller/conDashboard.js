const showDashboard = async (req, res) => {
<<<<<<< HEAD
  try {
     res.render("dashboard", { activePage: "dashboard" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};



module.exports = {
  showDashboard
};
=======
    try {
       res.render("dashboard", { activePage: "dashboard" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showDashboard
  };
>>>>>>> f644da7e24a7d7286d7b8aa05083a3aa48409d51
