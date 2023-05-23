const QueryEngine = require('../../../QueryEngine');

const class_addUser = require('./class_addUser');

const req_users_by_SchoolID= {
	
	init: (req, handle) => {
		let form = req.body.form
		QueryEngine.SQL.add(
			"INSERT INTO Users( "+
				"SchoolFID, "+
				"RoleFID, "+
				"contact, "+
				"email, "+
				"name, "+
				"password, "+
				"isDeleted, "+
				"createdAt, "+
				"lastModified "+
			")VALUES("+
				form.SchoolFID+","+
				form.RoleFID+","+
				"'"+form.contact+"',"+
				"'"+form.email+"',"+
				"'"+form.name+"',"+
				"'"+form.password+"',"+
				// form.ClassID+","+
				"FALSE,"+
				"NOW(),"+
				"NOW()"+
			")"
		, result => {
			console.log(result)
			if(result.error){
				handle(result)
			}else{
				let temp = {
					body: {
						UserID: result.result.insertId,
						ClassID: form.ClassFID
					}
				}
				class_addUser.init(temp, result => {
					handle(result)
				})
			}
		})
	}
	
};

module.exports = req_users_by_SchoolID;
