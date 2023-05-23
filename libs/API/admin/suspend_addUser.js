const QueryEngine = require('../../../QueryEngine');

const req_users_by_SchoolID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.add(
			"INSERT INTO SuspendedStudents( "+
				"UserFID, "+
				"ClassFID, "+
				"isDeleted, "+
				"createdAt, "+
				"lastModified "+
			")VALUES("+
				form.UserID+","+
				form.ClassID+","+
				"FALSE,"+
				"NOW(),"+
				"NOW()"+
			")"
		, result => {
			handle(result)
		})
	}
	
};

module.exports = req_users_by_SchoolID;
