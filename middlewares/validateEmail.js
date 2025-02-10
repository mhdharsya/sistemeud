const validateEmail = (req, res, next) => {
    const { email } = req.body;
  
    if (!email) {
      return res.status(400).render("forgotPassword", { 
        activePage: "forgotPassword", 
        error: "Email tidak boleh kosong!" 
      });
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).render("forgotPassword", { 
        activePage: "forgotPassword", 
        error: "Format email tidak valid!" 
      });
    }
  
    next();
  };
  
  module.exports = validateEmail;
  