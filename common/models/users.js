'use strict';

module.exports = function(Users) {
let app = require('../../server/orbiz-server');
	//sends verification email after registration
	Users.afterRemote('create', function(context, user, next) {
	var options = {
	  type: 'email',
	  to: user.email,
	  from: 'petya.b.wiredelta@gmail.com',
	  subject: 'Thanks for registering.',
	  text: 'Email Verification',
	  redirect:"",
	  html: 'Email <em>Verification</em>',
	  user: user
	};

	user.verify(options, function(err, response) {
	  if (err) {
	            Users.deleteById(user.id);
	            return next(err);
	          }
	  else {
	  next();
	  }
	});
	});

	//sends password reset link when requested
	Users.on('resetPasswordRequest', function(info) {
	    Users.findOne({where:{
	      email:info.email
	    }},function(err,user){
		    if(err) return err;
		    let id = user.id;
		    var url = '';
		    var html = 'Click <a href="' + url + '&access_token=' +
		    info.accessToken.id + '&uid=' + id + '">here</a> to reset your password';

		    Users.app.models.Email.send({
		      to: info.email,
		      from: 'noreply@easyae.dk',
		      subject: 'Password reset',
		      html: html
		    }, function(err) {
			    if (err) return console.log('> error sending password reset email');
		    });
		});
	});

	Users.afterRemote('create', function(ctx,user, next) {
	    let date = new Date();
	    user.updateAttributes({created:date}, function(err,user){
	        if(err) return next(err);
	          return next();
	    });
	});

	//Create user profile after the user has been registered
	Users.afterRemote('create', function(ctx,user, next) {
	var Company = app.models.Company;

	var newCompany = {
	  CVR: user.CVR,
	  name: user.name,
	  email: user.companyEmail,
	  address :user.address,
	  phoneNo: user.phoneNumber
	}

	Company.findOrCreate(newCompany, function(err,company,created){
	    if(err){
	      console.log('error creating company');
	      return next(err);
	    }
	    (created) ? console.log('created company', company)
	              : console.log('found company', company);
	    user.updateAttributes({companyId: company.id},function(err,user) {
	    	if(err) return next(err);
	    	next();
	    });
	  });
	});

	//Upon registration, assign user role
	Users.afterRemote('create', function(ctx,user, next) {
	console.log('> User third afterRemote triggered');

	  let RoleMapping = Users.app.models.RoleMapping;
	  let  role = user.role;
	  console.log(role);
	  
	  RoleMapping.app.models.Role.byName(role, function(err, foundRole){
	    foundRole.principals.create({
	        principalType: RoleMapping.USER,
	        principalId: user.id
	    }, function(err, rolePrincipal) {
	        if (err) {
	            console.error('error creating rolePrincipal', err);
	        }
	        (rolePrincipal) ? console.log('assigned user role to', user)
	                        : console.log('eror assigning user role to', user);
	        next();
	    });;
	  });
	});

};
