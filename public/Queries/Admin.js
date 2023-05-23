import PopUpAlert from "../libs/popUpAlert/popUpAlert";

const QueryEngine={
	/***************************************************************************/
	/****************************Admin Functions********************************/
	/***************************************************************************/
	
    AuthUser: (email, password, handle) => {
		let form = {
			email,
			password
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/login"
		QueryEngine.postData(url, form)
		.then(res => {
			if(res.error){
				PopUpAlert.init('Login','Unauthorised Access.','error')
				handle(res);
			}else{
				handle(res)
			}
		});
    },

	req_roles: (User, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			User
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/roles/get"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},
	req_classes: (User, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			User
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/classes/get"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},

	req_departments_by_UserID: (UserID, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			UserID
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/req_departments_by_UserID"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},

	req_class: (ClassID, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			ClassID
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/req_class"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},
	req_classes_by_UserID: (UserID, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			UserID
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/req_classes_by_UserID"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},
	class_deleteUser: (ClassID, UserID, currUser, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			ClassID,
			UserID,
			currUser
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/class_deleteUser"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},
	class_addUser: (ClassID, UserID, currUser, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			ClassID,
			UserID,
			currUser
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/class_addUser"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},
	req_usersFromClass: (ClassID, UserID, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			ClassID,
			UserID
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/req_usersFromClass"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},

	req_users_by_SchoolID: (UserID, SchoolID, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			UserID,
			SchoolID
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/req_users_by_SchoolID"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},
	req_usersSameClassAs_UserID: (UserID, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			UserID
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/req_usersSameClassAs_UserID"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},

	admin_add_user: (form, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			form
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/addUser"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},


	suspend_deleteUser: (ClassID, UserID, currUser, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			ClassID,
			UserID,
			currUser
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/suspend_deleteUser"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},
	suspend_addUser: (ClassID, UserID, currUser, handle, token) => {
		let header = {
			"entree-verify": "Bearer " + token
		}
		let payload = {
			ClassID,
			UserID,
			currUser
		}
		let url = window.location.protocol+"//"+window.location.host+"/api/admin/suspend_addUser"
		QueryEngine.postData(url, payload, header)
		.then(pack => {
			QueryEngine.handle_post(pack , ()=>{
				handle(pack);
			})
		});
	},

	teacher: {

		req_usersSameClassAs_UserID: (UserID, handle, token) => {
			let header = {
				"entree-verify": "Bearer " + token
			}
			let payload = {
				UserID
			}
			let url = window.location.protocol+"//"+window.location.host+"/api/teacher/req_usersSameClassAs_UserID"
			QueryEngine.postData(url, payload, header)
			.then(pack => {
				QueryEngine.handle_post(pack , ()=>{
					handle(pack);
				})
			});
		},
		req_users_by_SchoolID: (UserID, SchoolID, handle, token) => {
			let header = {
				"entree-verify": "Bearer " + token
			}
			let payload = {
				UserID,
				SchoolID
			}
			let url = window.location.protocol+"//"+window.location.host+"/api/teacher/req_users_by_SchoolID"
			QueryEngine.postData(url, payload, header)
			.then(pack => {
				QueryEngine.handle_post(pack , ()=>{
					handle(pack);
				})
			});
		},
		req_usersFromClass: (ClassID, UserID, handle, token)=> {
			let header = {
				"entree-verify": "Bearer " + token
			}
			let payload = {
				ClassID,
				UserID
			}
			let url = window.location.protocol+"//"+window.location.host+"/api/teacher/req_usersFromClass"
			QueryEngine.postData(url, payload, header)
			.then(pack => {
				QueryEngine.handle_post(pack , ()=>{
					handle(pack);
				})
			});
		}

	},
	
	parseStatus:function(arr){
		let res = []
		for(var i in arr){
			if(parseInt(arr[i].status, 10)==0){
				delete arr[i];
			}else{
				res.push(arr[i]);
			}
		}
		return res;
	},
	snapshotToArray:function(snap){
		var arr=[];
		snap.forEach(function(child){
			var item=child.val();
			item.key=child.key;
			arr.push(item);
		});
		return arr;
	},
	makeLibrary:function(arr){
		let tempArr = JSON.parse(JSON.stringify(arr)),
			index = {}
		tempArr.map( i => {
			let temp = {...i}
			delete temp.key
			index[i.key] = temp
		})
		return index
	},

	handle_post:function(res,handle){
		if(res === false){
			PopUpAlert.init('POST', 'Request Denied.', 'error')
		}else if(res === 'error'){
			PopUpAlert.init('POST', 'User Not Found.', 'error')
		}else{
			handle(res);
		}
	},

    async postData (url = '', data = {}, _headers={}) {
		// Default options are marked with *
		const response = await fetch(url, {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				..._headers,
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		});
		return response.json(); // parses JSON response into native JavaScript objects
	}
}

export default QueryEngine