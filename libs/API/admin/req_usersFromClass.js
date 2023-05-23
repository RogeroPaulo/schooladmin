const QueryEngine = require('../../../QueryEngine');

const req_usersSameClassAs_UserID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.once(
			"SELECT "+
				"u.* "+
				// ",c.ClassID AS 'jClassID' "+
			"FROM Users u "+
			"INNER JOIN ClassMembers cm ON ( "+
				"u.UserID = cm.UserFID "+
			") "+
			"INNER JOIN Classes c ON ( "+
				"c.ClassID = cm.ClassFID "+
			") "+
			"WHERE "+
				"c.ClassID = '" + form.ClassID + "' "+
				"AND cm.isDeleted is FALSE"
				// +"AND u.RoleFID = 3"
		, result => {
			handle(result.result)
		})
	}
	
};

module.exports = req_usersSameClassAs_UserID;
