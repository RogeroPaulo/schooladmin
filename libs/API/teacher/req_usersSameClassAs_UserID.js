const QueryEngine = require('../../../QueryEngine');

const req_usersSameClassAs_UserID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.once(
			"SELECT * "+
			"FROM ClassMembers cm "+
			"LEFT JOIN Classes c ON ( "+
				"cm.ClassFID = c.ClassID "+
			") "+
			"WHERE "+
				"cm.UserFID = '" + form.UserID + "' "+
				"AND cm.isDeleted is FALSE"
		, result => {
			let Classes = result.result,
				template = 
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
						"c.ClassID = '{{ClassID}}' "+
						"AND cm.isDeleted is FALSE "
						+"AND u.RoleFID > 1 "
						// +"AND u.RoleFID = 2 "
						// +"AND u.RoleFID = 3"
					,
				query
			if(Classes.length === 0){
				handle({
					error: {
						message: "No classes"
					}
				})
			}else if(Classes.length === 1){
				query = template.replace("{{ClassID}}", Classes[0].ClassID)
			}else{
				query = []
				Classes.forEach(Class => {
					query.push(template.replace("{{ClassID}}", Class.ClassID))
				})
				console.log(query)
				query = 
					"SELECT "+
						"* "+
					"FROM ( "+
						query.join(" UNION ")+
					") t "+
					// "WHERE UserID != '" + form.UserID + "' "+
					"ORDER BY UserID"
				console.log(query)
			}
			QueryEngine.SQL.once(
				query
			, result => {
				// console.log(result.error)
				handle(result.result)
			})
		})
	}
	
};

module.exports = req_usersSameClassAs_UserID;
