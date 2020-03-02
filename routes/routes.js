const express = require('express');
const mongo_controller = require('../scripts/mongo_controller.js');
const router = express.Router();
var isLoggedIn = false;


router.route("/").get(
    function(req, res){
        var model = {
            username: req.session.username,
            isAdmin: req.session.isAdmin,
            loggedIn: isLoggedIn
        }
        res.render('index', model)
    }
)

router.route("/login").get(
    function (req, res) {
        var model = {
            title : "Login Page",
            username : req.session.username,
            userId : req.session.userId,
            loggedIn: isLoggedIn
        }
        res.render("userLogin", model);
    }
);

router.route("/login").post(
    async function (req, res) {
        
        mongo_controller.LoginUser(req.body.username, req.body.password, (user, err) => {
            if (err) {
                console.log(err);
                res.redirect("/");
            }
            if (user) {
                req.session.user = user;
                res.render("game");
            }
        });
    }
);

// router.route("deleteProfile").get(
//     function (req, res) {
//         if(user._id.includes(req.session.userId)) {
//             var thisUser = user.get(user._id);
//             user.deleteOne(thisUser);
//         }
//     }
// );

router.route("/gameover").post(
    function(req, res) {
        if (req.session.user) {
            req.session.user.score += parseInt(req.body.score);
            req.session.user.games_played += 1;
            mongo_controller.edit_user(req.session.user, (err, user) => {
                if (err) {
                    console.log(err);
                }
    
                if (user) {
                    req.session.user = user;
                }
            })
        }

        res.render("gameOver", {Score: req.body.score, loggedIn: isLoggedIn});
    }
)

router.route("/logout").get(
    
    function (req, res) {
        isLoggedIn =  false;
        // Need to clear our session logout
        req.session.user = null;
        res.redirect("/");
    }
);

router.route("/gameScreen").get(
    
    function(req, res){
        if (req.session.user != null)
        res.render('game');
        else
        res.render('userLogin');
        //auth.requireLogin(req, res, () => {
            res.render('game', {loggedIn: isLoggedIn});
        //});
    }
)

router.route("/userInfo").get(

    function(req, res){
        if (req.session.user != null)
        res.render('userInfo');
        else
        res.render('userLogin');
        auth.requireLogin(req, res, () => {
            res.render('userInfo', {user: req.session.user,
                loggedIn: isLoggedIn});
        });

    }
)


router.route("/register").get(
    function(req, res){

        console.log(req.session)
        res.render('userRegister')
    }
)

router.route("/register").post(
    function(req,res){ 
        mongo_controller.createUser(req.body.username, req.body.password, (user, err) => {
            if (err) {
                var model = {
                    title: 'Register Page',
                    message: err,
                    loggedIn: isLoggedIn
                };
                res.render('userRegister', model);
                return;
            }
            if (user) {
                isLoggedIn = true;
                req.session.user = user;
                res.redirect("/gameScreen");
            } else {
                res.redirect("/");
            }
        })

    }
)

router.route("/leaderboard").get(
    async function(req, res){
        await mongo_controller.getHighScores(function (callback, err){            
            var topTenUsers = []
            for(i = 0; i < 10; i++){
                if(callback[i]){
                    topTenUsers.push(callback[i])
                }
            }
            
            model = {
                users : topTenUsers,
                loggedIn: isLoggedIn
            }
            res.render("leaderboard", model);
        }) 
    }
);

module.exports = router;