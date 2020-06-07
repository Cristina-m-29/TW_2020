function user(fname, lname, email, pass){
    var user = {
        first_name:fname,
        last_name: lname,
        email: email,
        password: pass
    }
    return user;
}

function userUpdateName(userOld,fname,lname){
    var user = userOld;
    if(fname != user.first_name && fname != '') user.first_name = fname;
    if(lname != user.last_name && lname != '') user.last_name = lname;
    return user;
}

function userUpdateEmail(userOld,email){
    var user = userOld;
    if(email != user.email && email != '') user.email = email;
    return user;
}

module.exports = {
    createUser: function(fname, lname, email, pass){
        var usr = user(fname, lname, email, pass);
        return usr;
    },
    createUserNameUpdate: function(user, fname, lname){
        var usr = userUpdateName(user,fname,lname);
        return usr;
    }
}