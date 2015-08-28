'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users.server.controller'),
	patients = require('../../app/controllers/patients.server.controller');

module.exports = function(app) {
	// patient Routes
	app.route('/patients')
		.get(patients.list)
		.post(users.requiresLogin, patients.create);

	app.route('/patients/:patientId')
		.get(patients.read)
		.put(users.requiresLogin, patients.hasAuthorization, patients.update)
		.delete(users.requiresLogin, patients.hasAuthorization, patients.delete);

	// Finish by binding the patient middleware
	app.param('patientId', patients.patientByID);
};
