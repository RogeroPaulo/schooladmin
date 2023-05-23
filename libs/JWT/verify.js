// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
const verify = {
    token:function(req,res,next){
        // USE CUSTOM HEADER
        const bearerHeader = req.headers['entree-verify'];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }else{
            //Forbidden
            res.sendStatus(403);
        }
    }
};

module.exports = verify;