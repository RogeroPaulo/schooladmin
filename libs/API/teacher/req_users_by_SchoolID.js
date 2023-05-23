const QueryEngine = require('../../../QueryEngine');

const req_users_by_SchoolID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.once(
			"SELECT * "+
			"FROM Users u "+
			"WHERE "+
				"u.SchoolFID = '" + form.SchoolID + "' "+
				"AND u.isDeleted is FALSE "+
				"AND u.RoleFID > 1"
		, result => {
			handle(result.result)
		})
	}
	
};

module.exports = req_users_by_SchoolID;
