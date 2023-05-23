var config = require("./config");

var mysql = require('mysql');

const QueryEngine={

	testSQL: (roleKey, userId, co, handle) => {
		// let conID,
		// 	con = QueryEngine.SQL.initSQL();
		// QueryEngine.SQL.connect(con, (res) => {
		// 	if(res.error){
		// 		handle({
		// 			roleKey, userId, co, SQL: false, err: res.error
		// 		})
		// 	}else{
		// 		conID = res.connection.threadId
		// 		// handle({
		// 		// 	roleKey, userId, co, SQL: conID
		// 		// })
		// 		let query =
		// 			"SELECT "+
		// 				"c.ClassFID "+
		// 			"FROM ClassMembers c "+
		// 			"WHERE c.UserFID = 1"
		// 		QueryEngine.SQL.query(con, query, ClassIDs => {
		// 			let temp = [],
		// 				queryArr = []
		// 			ClassIDs.result.forEach(ID => {
		// 				queryArr.push(
		// 					"SELECT "+
		// 						"u.name, "+
		// 						"u.contact, "+
		// 						"u.email, "+
		// 						"c.name AS 'Class Name' "+
		// 					"FROM Users u "+
		// 					"INNER JOIN ClassMembers cm ON ( "+
		// 						"u.UserID = cm.UserFID "+
		// 					") "+
		// 					"INNER JOIN Classes c ON ( "+
		// 						"c.ClassID = cm.ClassFID "+
		// 					") "+
		// 					"WHERE "+
		// 						"c.ClassID = "+ID["ClassFID"]+" "+
		// 						"AND u.RoleFID = 3"
		// 				)
		// 			})
		// 			let getStudents = queryArr.join(" UNION ")
		// 			QueryEngine.SQL.query(con, getStudents, Students => {
		// 				Students.result.forEach(student => {
		// 					temp.push(student)
		// 				})
		// 				QueryEngine.SQL.end(con, () => {
		// 					console.log("Connection ID: " + conID + " has ended.")
		// 					handle({res: temp})
		// 				})
		// 			})
		// 		})
		// 	}
		// })

		QueryEngine.SQL.once(
			"SELECT "+
				"c.ClassFID "+
			"FROM ClassMembers c "+
			"WHERE c.UserFID = 1"
		, ClassIDs => {
			let temp = [],
			queryArr = []
			ClassIDs.result.forEach(ID => {
				queryArr.push(
					"SELECT "+
						"u.name, "+
						"u.contact, "+
						"u.email, "+
						"c.name AS 'Class Name' "+
					"FROM Users u "+
					"INNER JOIN ClassMembers cm ON ( "+
						"u.UserID = cm.UserFID "+
					") "+
					"INNER JOIN Classes c ON ( "+
						"c.ClassID = cm.ClassFID "+
					") "+
					"WHERE "+
						"c.ClassID = "+ID["ClassFID"]+" "+
						"AND u.RoleFID = 3"
				)
			})
			let getStudents = queryArr.join(" UNION ")
			QueryEngine.SQL.once(getStudents, Students => {
				Students.result.forEach(student => {
					temp.push(student)
				})
				handle({res: temp})
			})
		})
	},
	
	/***************************************************************************/
	/****************************Admin Functions********************************/
	/***************************************************************************/

	admin_login: (form, handle) => {
		// let conID,
		// 	con = QueryEngine.SQL.initSQL()
		// QueryEngine.SQL.connect(con, (res) => {
		// 	if(res.error){
		// 		handle({
		// 			SQL: false, err: res.error
		// 		})
		// 	}else{
		// 		conID = res.connection.threadId
		// 		let query =
		// 			"SELECT "+
		// 				"u.UserID, "+
		// 				"u.SchoolFID, "+
		// 				"u.RoleFID, "+
		// 				"u.contact, "+
		// 				"u.name, "+
		// 				"u.email "+
		// 			"FROM Users u "+
		// 			"WHERE "+
		// 				"u.email = '"+form.email+"'"+
		// 				"AND u.password = '"+form.password+"'"+
		// 				"AND u.RoleFID < 3 "+
		// 				"AND u.isDeleted is FALSE"
		// 		QueryEngine.SQL.query(con, query, result => {
		// 			QueryEngine.SQL.end(con, () => {
		// 				console.log("Connection ID: " + conID + " has ended.")
		// 				if(result.error){
		// 					handle({error: result.error})
		// 				}else{
		// 					let l = result.result.length
		// 					if(l>1){
		// 						handle({
		// 							error: {
		// 								code: 2,
		// 								message: 'Duplicate User!'
		// 							}
		// 						})
		// 					}else if(l>0 && l<2){
		// 						// handle({
		// 						// 	user: result.result[0]
		// 						// })
		// 					}else{
		// 						handle({
		// 							error: {
		// 								code: 1,
		// 								message: 'Auth Failed!'
		// 							}
		// 						})
		// 					}
		// 				}
		// 			})
		// 		})
		// 	}
		// })

		QueryEngine.SQL.once(
			"SELECT "+
				"u.UserID, "+
				"u.SchoolFID, "+
				"u.RoleFID, "+
				"u.contact, "+
				"u.name, "+
				"u.email "+
			"FROM Users u "+
			"WHERE "+
				"u.email = '"+form.email+"'"+
				"AND u.password = '"+form.password+"'"+
				"AND u.RoleFID < 3 "+
				"AND u.isDeleted is FALSE"
		, result => {
			handle(result)
		})
	},
	
	/***************************************************************************/
	/***************************Portal Functions********************************/
	/***************************************************************************/

	login: (form, handle) => {
		QueryEngine.SQL.once(
			"SELECT "+
				"u.UserID, "+
				"u.SchoolFID, "+
				"u.RoleFID, "+
				"u.contact, "+
				"u.name, "+
				"u.email "+
			"FROM Users u "+
			"WHERE "+
				"u.email = '"+form.email+"' "+
				"AND u.password = '"+form.password+"' "+
				"AND u.isDeleted is FALSE"
		, result => {
			handle(result)
		})
	},

	/***************************************************************************/
	/******************************Misc Functions*******************************/
	/***************************************************************************/

	SQL:{

		initSQL: () => {
			let con = QueryEngine.SQL.createConnection(config.sqlCFG)
			return con;
		},

		createConnection: cfg => {
			let connection = mysql.createConnection(cfg)
			return connection
		},

		connect: (con, handle) => {
			con.connect(error => {
				if(error){
					console.log("Azure Failed!", error.stack)
					handle({error})
				}else{
					console.log("Azure Connected!", con.threadId)
					handle({connection: con})
				}
			})
		},

		query: (con, query, handle) => {
			con.query(query, (error, result, fields) => {
				if(error){
					handle({error})
				}else{
					let arr = result.map(obj => {
						let temp = {}
						Object.keys(obj).forEach(key => {
							temp[key] = obj[key]
						})
						return temp
					})
					handle({result: arr, fields});
				}
				
			})
		},
		queryAdd: (con, query, handle) => {
			con.query(query, (error, result, fields) => {
				if(error){
					handle({error})
				}else{
					console.log(error, result, fields)
					handle({result})
				}
				
			})
		},

		end: (con, handle) => {
			con.end(err => {
				if(err) throw err
				handle()
			})
			// con.end()
		},

		once: (query, handle) => {
			let conID,
				con = QueryEngine.SQL.initSQL()
			QueryEngine.SQL.connect(con, (res) => {
				if(res.error){
					handle({
						SQL: false, err: res.error
					})
				}else{
					conID = res.connection.threadId
					QueryEngine.SQL.query(con, query, result => {
						QueryEngine.SQL.end(con, () => {
							console.log(
								"Connection ID: " + conID + " has ended.",
								query,
								result.result
							)
							handle(result)
						})
					})
				}
			})
		},

		getOneByID: (IDname, ID, Table, handle) => {
			let conID,
				con = QueryEngine.SQL.initSQL()
			QueryEngine.SQL.connect(con, (res) => {
				if(res.error){
					handle({
						SQL: false, err: res.error
					})
				}else{

					let query =
						"SELECT * FROM "+Table+" t "+
						"WHERE "+
							"t."+IDname+" = '"+ID+"' "+
							"AND t.isDeleted is FALSE"
					conID = res.connection.threadId
					QueryEngine.SQL.query(con, query, result => {
						QueryEngine.SQL.end(con, () => {
							console.log(
								"Connection ID: " + conID + " has ended.",
								query,
								result.result
							)
							handle(result)
						})
					})
				}
			})
		},

		add: (query, handle) => {
			let conID,
				con = QueryEngine.SQL.initSQL()
			QueryEngine.SQL.connect(con, (res) => {
				if(res.error){
					handle({
						SQL: false, err: res.error
					})
				}else{
					conID = res.connection.threadId
					QueryEngine.SQL.queryAdd(con, query, result => {
						QueryEngine.SQL.end(con, () => {
							console.log(
								"Connection ID: " + conID + " has ended.",
								query,
								result.result
							)
							handle(result)
						})
					})
				}
			})
		},

	},

	parseStatus:function(arr){
		return arr.filter(i => parseInt(i.status, 10) !== 0)
	},
	parseStatusValid:function(arr){
		return arr.filter(i =>
			parseInt(i.status, 10) == 0
		)
	}
}

module.exports = QueryEngine;