'use strict';

module.exports = function(Campaign) {

Campaign.confirmMailingList = function(campaingId,mailingList,callback) {
	let clientIds = mailingList.map(function(item){
		return item.id;
	});

	for(let i=0; i < clientIds.length; i++){
		Campaign.app.models.Participant.create({
			campaignId: campaingId,
			clientId : i
		});

	}

}

Campaign.launch = function(companyId, campaignId,callback) {
   Campaign.app.models.Company.findOne({
   	where:{
   		id: companyId
   	}
   }, function(err,company){
   	if(err || !company) return callback(err);
   	if(company.preSurvey === false) return callback(new Error('Missing company pre-survey'));




   });
}

Campaign.remoteMethod(
  'launch',
  {
    description: 'Launch company campaign',
    http: {path:'/launch', verb: 'post'},
    accepts:{arg:'req', type:'object', http: { source:'req' } }
  }
);

};
