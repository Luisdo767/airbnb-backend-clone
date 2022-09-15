const jwt = require('jsonwebtoken')
const {loginUser} = require('./auth.controllers')
const config = require('../utils/config')

const login = (req, res) => {
    const data = req.body;
  
    if (!data.email || !data.password) {
        return res.status(400).json({ message: "Missing Data" });
    }
  
    loginUser(data.email, data.password)
        .then((response) => {
            const token = jwt.sign(
                {
                id: response.id,
                email: response.email,
                rol: response.roleId,
                },
                config.secretOrKey
            );
            return res
                .status(200)
                .json({ message: "Valid Credentials", token });
            })
            .catch(() => {
                return res.status(401).json({ message: "Invalid Credentials" });
            });
};
  


module.exports = {
    login
}


