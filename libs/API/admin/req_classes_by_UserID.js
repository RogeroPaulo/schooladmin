const QueryEngine = require('../../../QueryEngine');

const req_classes_by_UserID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.once(
			"SELECT c.* "+
			"FROM ClassMembers cm "+
			"LEFT JOIN Classes c ON ( "+
				"cm.ClassFID = c.ClassID "+
			") "+
			"WHERE "+
				"cm.UserFID = '" + form.UserID + "' "+
				"AND cm.isDeleted is FALSE"
		, result => {
			handle(result.result)
		})
	}
	
};

module.exports = req_classes_by_UserID;
