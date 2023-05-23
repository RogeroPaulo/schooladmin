const req_classes = require('../admin/req_classes')
const req_classes_by_UserID = require('../admin/req_classes_by_UserID')

const get= {
	
	init: (req, handle) => {
		let form = req.body
		if(parseInt(form.User.RoleFID, 10) === 1){

			req_classes.init(req, result => {
				handle(result)
			})
			

		}else if(
			parseInt(form.User.RoleFID, 10) === 2
			|| parseInt(form.User.RoleFID, 10) === 3
		){
			req_classes_by_UserID.init({
				body: form.User
			}, result => {
				handle(result)
			})
		}
	}
	
};

module.exports = get;
