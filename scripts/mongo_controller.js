// imports
const mongoose = require('mongoose');
const config = require('../config.json');
// consts
const databaseUrl = `mongodb+srv://hungryhippos:${config.password}@cluster0-1oqrg.mongodb.net/test?retryWrites=true&w=majority`
const userCollectionName = "users";

// connect to database
mongoose.connect(databaseUrl, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("Connected to Database"))
.catch(err => {console.log(Error, err.message) });

// define Schema
const Schema = mongoose.Schema;

// create user schema
const UserSchema = new Schema({
    username : String,
    password: String,
    high_score: Number,
    games_played: Number
});

// create user object
exports.user = mongoose.model(userCollectionName, UserSchema);

exports.CreateUser = (user, callback) => {
    this.user.find({user:user.username}, (err, found_user) => {
        if (err) {
            return callback(undefined, err);
        }

        if (found_user[0]) {
            return callback(undefined, 'Username already Exists!');

        } else {
            password_manager.encryptPassword(user.password, (err, hash) => {
                if (err) {
                    return callback(undefined, err);
                }
                if (hash) {
                    let new_user = createBlankUser(username, hash);
                    new_user.save();
                    // build safe user
                    let safe_user = createSafeUser(new_user);
                    return callback(safe_user, undefined);
                } else {

                    return callback(undefined, 'Error in creating password.');
                }
            });
        }
    });
}

exports.LoginUser = (username, password, callback) => {
    this.user.find({username: username}, (err, found_user) => {
        if (err) {
            return callback(undefined, err);
        }

        if (found_user[0]) {
            password_manager.checkPasswordAgainstHash(password, found_user[0].password, (err, passwords_match) => {
                if (err) {
                    return callback(undefined, err);
                }
                if (passwords_match) {
                    let safe_user = createSafeUser(found_user[0]);
                    return callback(safe_user, undefined);
                } else {
                    return callback(undefined, 'Incorrect Username or Password');
                }
            });
        } else {
            return callback(undefined, 'Incorrect Username or Password');
        }
    });
}

exports.EditUser = (user, callback) => {
    this.user.find({_id:user.id}, (err, found_user) => {
        if (err) {
            return callback(undefined, err);
        }

        if (found_user[0]) {
            found_user[0].high_score = user.high_score;
            found_user[0].games_played = user.games_played;

            found_user[0].save();

            let safe_user = createSafeUser(found_user);
            return callback(safe_user, undefined);
        } else {
            return callback(undefined, 'User not found');
        }
    });
}

exports.GetHighScores = (callback) => {
    this.user.find({}, `username score`, {sort: {score: descending}}, (err, leaderboard) => {
        if (err) {
            return callback(undefined);
        }

        if (leaderboard) {
            return callback(leaderboard)
        } else {
            return callback(undefined);
        }
    });
};

// helper functions
const createBlankUser = (username, hash) => {
    let user = new this.user({
        username: username,
        password: hash,
        high_score: 0,
        games_played: 0,
    });
    return user;
};

const createSafeUser = (user) => {
    let safe_user = {
        id: user.id,
        username: user.username,
        high_score: user.high_score,
        games_played: user.games_played
    };
    return safe_user;
};
