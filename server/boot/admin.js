'use strict';
module.exports = function(app) {

  createDefaultUsers();

  function createDefaultUsers() {

    console.log('Creating roles and users');

    var User = app.models.users;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    var users = [];
    var roles = [{
      name: 'admin',
      users: [{
        email: 'admin@orbiz.com',
        username: 'admin',
        password: 'admin',
        emailVerified:true
      }]
    }, {
      name: 'user',
      users: [{
        email: 'user@orbiz.com',
        username: 'user',
        password: 'user',
        emailVerified:true
      }]
    },{
    	name:'master',
    	users:[{
    		email:'master@orbiz.com',
    		username:'master',
    		password:'master',
    		emailVerified:true
    	}]
    }];
    
    roles.forEach(function(role) {
      Role.findOrCreate(
        {where: {name: role.name}}, // find
        {name: role.name}, // create
        function(err, createdRole, created) {
          if (err) {
            console.error('error running findOrCreate('+role.name+')', err);
          }
          (created) ? console.log('created role', createdRole.name)
                    : console.log('found role', role.name);
          role.users.forEach(function(roleUser) {
            User.findOrCreate(
              {where: {username: roleUser.username}}, // find
              roleUser, // create
              function(err, createdUser, created) {
                if (err) {
                  console.error('error creating roleUser', err);
                }
                (created) ? console.log('created user', createdUser.username)
                          : console.log('found user', createdUser.username);
                createdRole.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: createdUser.id
                }, function(err, rolePrincipal) {
                  if (err) {
                    console.error('error creating rolePrincipal', err);
                  }
                  users.push(createdUser);
                });
              });
          });
        });
    });
    return users;
  }

};




