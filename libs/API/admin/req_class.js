const QueryEngine = require('../../../QueryEngine');

const req_users_by_SchoolID= {
	
	init: (req, handle) => {
		let form = req.body
		QueryEngine.SQL.getOneByID("ClassID", form.ClassID, "Classes", result => {

			let arr = result.result
			if(arr.length === 0){
				handle({error:{
					message: "No results"
				}})
			}else if(arr.length === 1){
				handle(arr[0])
			}else{
				handle(arr[arr.length - 1])
			}
		})
	}
	
};

module.exports = req_users_by_SchoolID;
