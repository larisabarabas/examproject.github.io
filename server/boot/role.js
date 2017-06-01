module.exports = function(app) {

  var Role = app.models.Role;
  /**
  * Get a role by name
  * @param name
  */
  Role.byName = function(name, callback){

    Role.findOne({
    	where: {
    		name: name
    	}
    }, function(err, role){
    	//if(err || !role) callback(err);
    	callback(null,role);
    });
  };

  /**
  * Get a role by id
  * @param id
  */
  Role.byId = function(roleIds, callback){
  	Role.findOne({
  		where: {
  			id : {inq : roleIds}
  		}
  	}, function(err,role){
  		//if(err || !role) callback(err);
    	callback(null,role);
  	});
  };
}