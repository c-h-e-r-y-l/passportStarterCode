const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");

router.get("/", (req, res) => {
    res.send("welcome");
});

router.get("/admin", (req, res) => {
    const currentUser = req.user;
    if (!currentUser) {
        res.redirect("/auth/login");
    } else if (currentUser.role === "admin") {
        req.sessionStore.all((err, sessionsObj) => {
            const sessions = [];

            for (const sessionId in sessionsObj) {
                const sessionData = sessionsObj[sessionId];
                const userId = sessionData.passport ? sessionData.passport.user : null;

                sessions.push({
                    sessionId: sessionId,
                    userId: userId
                });
            }

            res.render("admin", {
                user: req.user,
                sessions: sessions
            });
        });
    } else {
        res.redirect("/dashboard");
    };
});

router.get("/revoke/:sessionId", (req, res) => {
    req.sessionStore.destroy(req.params.sessionId);
    res.redirect("/admin");
})

router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        user: req.user,
    });
});

module.exports = router;
