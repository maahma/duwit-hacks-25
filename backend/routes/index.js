const express = require("express")
const router = express.Router

router.get('/', (req, res) => {
    console.log(req.oidc.isAuthenticated())
    res.render("index", {title: "logging in"})
})

module.exports = router