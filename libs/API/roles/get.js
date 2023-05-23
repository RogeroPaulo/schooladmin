const QueryEngine = require('../../../QueryEngine');

const req_users_by_SchoolID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.once(
			"SELECT * "+
			"FROM Roles r "+
			"WHERE "+
				"r.RoleID >= '" + form.User.RoleFID + "' "+
				"AND r.isDeleted is FALSE"
		, result => {
			handle(result.result)
		})
	}
	
};

module.exports = req_users_by_SchoolID;
