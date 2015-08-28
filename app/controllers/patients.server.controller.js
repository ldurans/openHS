'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	patient = mongoose.model('Patient'),
	_ = require('lodash');

/**
 * Create a patient
 */
exports.create = function(req, res) {
	var patient = new Patient(req.body);
	patient.user = req.user;

	patient.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(patient);
		}
	});
};

/**
 * Show the current patient
 */
exports.read = function(req, res) {
	res.json(req.patient);
};

/**
 * Update a patient
 */
exports.update = function(req, res) {
	var patient = req.patient;

	patient = _.extend(patient, req.body);

	patient.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(patient);
		}
	});
};

/**
 * Delete an patient
 */
exports.delete = function(req, res) {
	var patient = req.patient;

	patient.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(patient);
		}
	});
};

/**
 * List of patients
 */
exports.list = function(req, res) {
	patient.find().sort('-created').populate('user', 'displayName').exec(function(err, patients) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(patients);
		}
	});
};

/**
 * patient middleware
 */
exports.patientByID = function(req, res, next, id) {
	patient.findById(id).populate('user', 'displayName').exec(function(err, patient) {
		if (err) return next(err);
		if (!patient) return next(new Error('Failed to load patient ' + id));
		req.patient = patient;
		next();
	});
};

/**
 * patient authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.patient.user.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};
