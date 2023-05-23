const QueryEngine = require('../../../QueryEngine');

const req_classes_by_UserID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.once(
			"SELECT * "+
			"FROM Classes c "+
			"WHERE "+
				"c.SchoolFID = '" + form.User.SchoolFID + "' "+
				"AND c.isDeleted is FALSE"
		, result => {
			handle(result.result)
		})
	}
	
};

module.exports = req_classes_by_UserID;
