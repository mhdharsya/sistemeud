const showAnalisis = async (req, res) => {
<<<<<<< HEAD
  try {
    res.render("analisis", { activePage: "analisis"});
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error });
  }
};



module.exports = {
  showAnalisis
};
=======
    try {
      res.render("analisis", { activePage: "analisis"});
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: error });
    }
  };
  
  
  
  module.exports = {
    showAnalisis
  };
>>>>>>> f644da7e24a7d7286d7b8aa05083a3aa48409d51
