'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var PatientSchema = new Schema({
	name: { type: String, required: true },
	mail: { type: String, required: false },
	address: { type: String, required: true },
	number: { type: String, required: true },
	complement: { type: String, required: false },
	district: { type: String, required: true },
	state: { type: String, required: true },
	city: { type: String, required: true },
	cep: { type: String, required: false },
	maritalStatus: { type: String, required: true },
	phone1: { type: String, required: true },
	dateBirth: { type: Date, required: true },
	sex: { type: String, required: true },
	phone2: { type: String, required: false },
	phone3: { type: String, required: false },
	cpf: { type: String, required: false },
	responsibleName: { type: String, required: false },
	responsibleCPF: { type: String, required: false },
	observations: { type: String, required: false },
	dateInclusion: { type: Date, required: true },
	dateUpdate: { type: Date, required: false },
	treatments: [Treatment],
	user: {type: Schema.ObjectId,ref: 'User'},
	created: { type: Date, default: Date.now}

});

mongoose.model('Patient', PatientSchema);
