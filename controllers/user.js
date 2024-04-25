const User = require("../models/user");

const { setUser } = require("../service/auth")

async function handleUserSignup(req,res) {
    const { Name, Email, Password } = req.body;
    await User.create({
        name : Name,
        email : Email,
        password : Password,
    });
    return res.redirect("/");
}

async function handleUserLOGIN(req,res) {
    const { Email, Password } = req.body;
    const user = await User.findOne({email: Email,password: Password });
    if(!user) {
        return res.render("login", {
            error: "Invalid Username or Password",
        });
    }
    const token = setUser(user);
    res.cookie("uid", token);
    return res.redirect("/");
}


module.exports = {
    handleUserSignup,
    handleUserLOGIN,
};