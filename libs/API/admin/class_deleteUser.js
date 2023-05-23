const QueryEngine = require('../../../QueryEngine');

const req_users_by_SchoolID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.add(
			
			"UPDATE ClassMembers dest, ("+
				"SELECT "+
					"RegistryID, "+
					"UserFID "+
				"FROM ClassMembers "+
				"WHERE "+
					"ClassFID = '" + form.ClassID + "' "+
					"AND UserFID = '" + form.UserID + "' "+
					"AND isDeleted is FALSE "+
				") src "+
			"SET "+
				"dest.isDeleted = TRUE "+
			"WHERE "+
				"dest.RegistryID = src.RegistryID"
		, result => {
			handle(result)
		})
	}
	
};

module.exports = req_users_by_SchoolID;
