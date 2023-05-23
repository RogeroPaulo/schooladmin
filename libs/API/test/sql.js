const QueryEngine = require('../../../QueryEngine');

const testSQL= {
	
	init: (req, handle) => {
		let post = req.body
		QueryEngine.testSQL(post.roleKey, post.userId, post.co, res => {
			handle(res)
		});
	},
	
};

module.exports = testSQL;
