const QueryEngine = require('../../../QueryEngine');

const login= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.login(form, res => {
			login.validate(res, handle);
		});
	},

	validate: (result, handle) => {
		let l = result.result.length
		if(l === 0){
			handle({
				error: {
					code: 1,
					message: 'Auth Failed!'
				}
			})
		}else if(l === 1){
			// handle({
			// 	user: result.result[0]
			// })
			login.getSchool(result.result[0], handle)
		}else{
			handle({
				error: {
					code: 2,
					message: 'Duplicate User!'
				}
			})
		}
	},
	getSchool: (user, handle) => {
		QueryEngine.SQL.once(
			"SELECT "+
				"s.AccountFID, "+
				"s.SchoolID, "+
				"s.address, "+
				"s.contact, "+
				"s.email, "+
				"s.name "+
			"FROM Schools s "+
			"WHERE "+
				"s.SchoolID = '" + user.SchoolFID + "' "+
				"AND s.isDeleted is FALSE"
		, sResult => {
			let l = sResult.result.length
			if(l > 0){
				let temp = {
					user,
					school: sResult.result[l - 1]
				}

				QueryEngine.SQL.once(
					"SELECT "+
						"a.AccountID, "+
						"a.contact, "+
						"a.email, "+
						"a.name "+
					"FROM Accounts a "+
					"WHERE "+
						"a.AccountID = '" + temp.school.AccountFID + "'"+
						"AND a.isDeleted is FALSE"
				, aResult => {
					temp.account = aResult.result[0]
					handle(temp)
				})

			}else{
				handle({
					error: {
						code: 0,
						message: 'Account Not Activated!'
					}
				})
			}
		})
	},
	
};

module.exports = login;
