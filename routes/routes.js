const express = require('express');
const mongo_controller = require('../scripts/mongo_controller.js');
const router = express.Router();
const auth = require('../scripts/auth.js');
var isLoggedIn = false;


router.route("/").get(
    function(req, res){
        res.render('index', {loggedIn: req.session.user})
    }
)

router.route("/login").get(
    function (req, res) {
        res.render("userLogin", {loggedIn: req.session.user});
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
                res.render("game", {loggedIn: req.session.user});
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
            mongo_controller.EditUser(req.session.user, (err, user) => {
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
        //auth.requireLogin(req, res, () => {
            res.render('game', {loggedIn: req.session.user});
        //});
    }
)

router.route("/userInfo").get(

    function(req, res){
        auth.requireLogin(req, res, () => {
            res.render('userInfo', {user: req.session.user,
                loggedIn: req.session.user});
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
        mongo_controller.CreateUser(req.body.username, req.body.password, (user, err) => {
            if (err) {
                res.render('userRegister', {loggedIn:req.session.user});
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
        mongo_controller.GetHighScores(function (callback, err){            
            var topTenUsers = []
            for(i = 0; i < 10; i++){
                if(callback[i]){
                    topTenUsers.push(callback[i])
                }
            }
            
            model = {
                users : topTenUsers,
                loggedIn: req.session.user
            }
            res.render("leaderboard", model);
        }) 
    }
);

module.exports = router;