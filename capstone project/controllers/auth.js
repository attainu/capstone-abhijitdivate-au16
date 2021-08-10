const User = require('../models/user');

exports.signup = async (req, res) => {
    
  
    try {
      const userExists = await User.findOne({ email:req.body.email });
  
      if (userExists) return res.status(400).json({ message: "User already exists" });
  
      const user = await new User(req.body);
      await user.save();
      res.status(200).json({ message: 'Signup success! Please login.' });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      
    }
};

// exports.signup = async (req, res) => {
//     const userExists = await User.findOne({ email: req.body.email });
//     if (userExists)
//         return res.status(403).json({
//             error: 'Email is taken!'
//         });
//     const user = await new User(req.body);
//     await user.save();
//     res.status(200).json({ message: 'Signup success! Please login.' });
// };
