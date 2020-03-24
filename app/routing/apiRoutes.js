var friends = require('../data/friends');

module.exports = function(app) {
    app.get('/api/friends', (req, res) => {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        let user = req.body;
        let differences = undefined;
        for(i = 0; i < friends.length; i++){
            let n = 0;
            let sum = 0;
            friends[i].scores.forEach((score) => {
                if(user.scores[n] !== score){
                    sum += Math.abs(user.scores[n] - score);
                }
                n++;
            });
            if(differences !== undefined){
                if(differences.sum > sum){
                    differences = {
                        index: i,
                        sum: sum
                    };
                }
            } else {
                differences = {
                    index: i,
                    sum: sum
                };
            }
            
        }


        friends.push(req.body);
        res.json(friends[differences.index]);
    });
}