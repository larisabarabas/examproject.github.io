'use strict';
module.exports = function(app) {

  var RoleMapping = app.models.RoleMapping;
  /**
  * Get user ID's by role name
  * @param role
  * @param callback
  */
  RoleMapping.usersIDByRole = function(role, callback){
  
    RoleMapping.app.models.Role.byName(role, function(err, role){

      if( err || !role ) return callback(err);

      RoleMapping.find({
        where: {
          roleId: role.id,
          principalType: RoleMapping.USER
        }
      }, function(err, mappings){

        if( err ) return callback(err);

        var users = mappings.map(function (m) {
          return m.principalId;
        });

        callback(null, users);
      });

    });
  };

  /**
  * Get role's ID by user ID
  * @param user id
  * @param callback
  */
  RoleMapping.roleIdByUserId = function(userId,callback){
    RoleMapping.find({
      where: {
        principalType: RoleMapping.USER, 
        principalId: userId
      },
    }, function(err, mappings){
     
      let roleIds = mappings.map(function (m) {
          return m.roleId;
        });

      RoleMapping.app.models.Role.byId(roleIds, function(err,role){

        if(err || !role) return callback(err);
        callback(null,role);

      })
    });
  };

};