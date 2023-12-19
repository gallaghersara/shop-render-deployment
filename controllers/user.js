import User from "../models/User.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

// export default getUsers;
module.exports = {
  getUsers
}


