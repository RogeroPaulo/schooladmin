const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verify = require('../libs/JWT/verify');
const secretKey = require('../libs/JWT/secretKey');

router.route('/')
	.get(function(req, res, next) {
	  res.send('respond with a resource');
	})

router.route('/:eventId')
	.get(function(req, res, next) {
		res.send('respond with a resource' + req.params.eventId);
	});


router.route('/bulkvisitor')
	.post(function(req, res) {
		//let excel = bulkVisitor.validate();
	});



const testSQL = require('../libs/API/test/sql');
router.route('/portal/testSQL')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				testSQL.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});



/******************************************************************************/
/******************************************************************************/
/***************************** Admin APIs *******************************/
/******************************************************************************/
/******************************************************************************/

const admin_login = require('../libs/API/admin/login');
router.route('/admin/login')
	.post((req, res) => {
		admin_login.init(req, pack => {
			if(pack.user){
				let user = {
					id: pack.UserID
				}
				jwt.sign({user}, secretKey.secretKey, (err, token) => {
					pack.token = token
					res.json(pack);
				});
			}else{
				res.send(pack)
			}
		})
	});

const req_departments_by_UserID = require('../libs/API/admin/req_departments_by_UserID');
router.route('/admin/req_departments_by_UserID')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				req_departments_by_UserID.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});

const req_class = require('../libs/API/admin/req_class');
router.route('/admin/req_class')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				req_class.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const req_classes_by_UserID = require('../libs/API/admin/req_classes_by_UserID');
router.route('/admin/req_classes_by_UserID')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				req_classes_by_UserID.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const class_deleteUser = require('../libs/API/admin/class_deleteUser');
router.route('/admin/class_deleteUser')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				class_deleteUser.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const class_addUser = require('../libs/API/admin/class_addUser');
router.route('/admin/class_addUser')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				class_addUser.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});

const req_users_by_SchoolID = require('../libs/API/admin/req_users_by_SchoolID');
router.route('/admin/req_users_by_SchoolID')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				req_users_by_SchoolID.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const req_usersSameClassAs_UserID = require('../libs/API/admin/req_usersSameClassAs_UserID');
router.route('/admin/req_usersSameClassAs_UserID')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				req_usersSameClassAs_UserID.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const req_usersFromClass = require('../libs/API/admin/req_usersFromClass');
router.route('/admin/req_usersFromClass')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				req_usersFromClass.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});

const req_roles = require('../libs/API/roles/get');
router.route('/roles/get')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				req_roles.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const req_classes = require('../libs/API/classes/get');
router.route('/classes/get')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				req_classes.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});



const addUser = require('../libs/API/admin/addUser');
router.route('/admin/addUser')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				addUser.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});

const suspend_deleteUser = require('../libs/API/admin/suspend_deleteUser');
router.route('/admin/suspend_deleteUser')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				suspend_deleteUser.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const suspend_addUser = require('../libs/API/admin/suspend_addUser');
router.route('/admin/suspend_addUser')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				suspend_addUser.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});



/******************************************************************************/
/******************************************************************************/
/***************************** Portal APIs *******************************/
/******************************************************************************/
/******************************************************************************/

const login = require('../libs/API/portal/login');
router.route('/portal/login')
	.post((req, res) => {
		login.init(req, pack => {
			if(pack.user){
				let user = {
					id: pack.UserID
				}
				jwt.sign({user}, secretKey.secretKey, (err, token) => {
					pack.token = token
					res.json(pack);
				});
			}else{
				res.send(pack)
			}
		})
	});



const teacher_req_usersSameClassAs_UserID = require('../libs/API/teacher/req_usersSameClassAs_UserID');
router.route('/teacher/req_usersSameClassAs_UserID')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				teacher_req_usersSameClassAs_UserID.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const teacher_req_usersFromClass = require('../libs/API/teacher/req_usersFromClass');
router.route('/teacher/req_usersFromClass')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				teacher_req_usersFromClass.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const teacher_req_users_by_SchoolID = require('../libs/API/teacher/req_users_by_SchoolID');
router.route('/teacher/req_users_by_SchoolID')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				teacher_req_users_by_SchoolID.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});
const teacher_req_suspendedFromClass = require('../libs/API/teacher/req_suspendedFromClass');
router.route('/teacher/req_suspendedFromClass')
	.post(verify.token, function(req, res) {
		jwt.verify(req.token, secretKey.secretKey, (err /*, authData */) => {
			if(err){
				res.sendStatus(403);
			}else{
				teacher_req_suspendedFromClass.init(req, function(pack){
					res.json(pack)
				})
			}
		})
	});

module.exports = router;
