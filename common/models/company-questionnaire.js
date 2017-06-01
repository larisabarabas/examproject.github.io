'use strict';

module.exports = function(Companyquestionnaire) {

Companyquestionnaire.observe('after save', function(ctx,next){
//update all companies to pre-survey filled to false when survey is edited/created
	Companyquestionnaire.app.models.Company.updateAll({preSurvey:false},function(err,info) {
		if(err) return next(err);
		next();
	})
});

};

