"@fixture setupwork";
"@page http://localhost:3000/";

"@test"["login"] = {
    '1.Click input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.click(actionTarget);
    },
    '2.Click button "New user"': function() {
        act.click("#newuserbutton");
    },
    '3.Type in input "name"': function() {
        act.type(".form-control.mb-3[name='name']", "newacc");
    },
    '4.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "newacc");
    },
    '5.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "soso");
    },
    '6.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "soso");
    },
    '7.Click submit button "Sign Up"': function() {
        act.click("#submitnewuser");
    },
    '8.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "newacc");
    },
    '9.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "soso");
    },
    '10.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    }
};

