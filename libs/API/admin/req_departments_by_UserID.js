const QueryEngine = require('../../../QueryEngine');

const req_departments_by_UserID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.once(
			"SELECT * "+
			"FROM DepartmentMembers dm "+
			"LEFT JOIN Departments d ON ( "+
				"dm.DepartmentFID = d.DepartmentID "+
			") "+
			"WHERE "+
				"dm.UserFID = '" + form.UserID + "' "+
				"AND dm.isDeleted is FALSE"
		, result => {
			handle(result.result)
		})
	}

};

module.exports = req_departments_by_UserID;
