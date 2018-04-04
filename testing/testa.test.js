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

"@test"["newsgroup"] = {
    '1.Click button "New user"': function() {
        act.click("#newuserbutton");
    },
    '2.Type in input "name"': function() {
        act.type(".form-control.mb-3[name='name']", "newacc");
    },
    '3.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "newacc");
    },
    '4.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "soso");
    },
    '5.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "soso");
    },
    '6.Click submit button "Sign Up"': function() {
        act.click("#submitnewuser");
    },
    '7.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "newacc");
    },
    '8.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "soso");
    },
    '9.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    },
    '10.Drag <h2> "newacc"': function() {
        act.drag(".card-title.text-center", 136, 0, {
            offsetX: 123,
            offsetY: 20
        });
    },
    "11.Assert": function() {
        eq($(".card-title.text-center").text(), "newacc");
        eq($(".text-center.text-handle").text(), "@newacc");
    },
    '12.Click button "New Category"': function() {
        var actionTarget = function() {
            return $("#navbarNav").find(":containsExcludeChildren(New Category)");
        };
        act.click(actionTarget);
    },
    '13.Type in input "category"': function() {
        act.type(".form-control.mb-3[name='category']", "newcato");
    },
    '14.Click submit button "New Category"': function() {
        var actionTarget = function() {
            return $("#newcat").find(".btn.float-right.btn-lg.btn-primary");
        };
        act.click(actionTarget);
    },
    '15.Click select "category"': function() {
        var actionTarget = function() {
            return $("#twitter-post").find(".form-control[name='category']");
        };
        act.click(actionTarget);
    },
    '17.Click button "New Group"': function() {
        var actionTarget = function() {
            return $("#navbarNav").find(":containsExcludeChildren(New Group)");
        };
        act.click(actionTarget);
    },
    '18.Type in input "name"': function() {
        var actionTarget = function() {
            return $("#newgroup").find(".form-control.mb-3[name='name']");
        };
        act.type(actionTarget, "sofar");
    },
    '19.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "solar");
    },
    '20.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "soso");
    },
    '21.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "soso");
    },
    '22.Click submit button "Sign Up"': function() {
        var actionTarget = function() {
            return $("#newgroup").find(".btn.float-right.btn-lg.btn-primary");
        };
        act.click(actionTarget);
    }
};

"@test"["login bad"] = {
    '1.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "something");
    },
    '2.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "something");
    },
    '3.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    },
    "4.Assert": function() {
        eq($(":containsExcludeChildren(Something happened)").length > 0, true);
    }
};


"@test"["addtask"] = {
    '1.Click button "New user"': function() {
        act.click("#newuserbutton");
    },
    '2.Type in input "name"': function() {
        act.type(".form-control.mb-3[name='name']", "newname");
    },
    '3.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "newname");
    },
    '4.Click password input "password1"': function() {
        act.click(".form-control.mb-3[name='password1']");
    },
    '5.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "newthing");
    },
    '6.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "newthing");
    },
    '7.Click submit button "Sign Up"': function() {
        act.click("#submitnewuser");
    },
    '8.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "newname");
    },
    '9.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "newname");
    },
    '10.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    },
    '11.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "newname");
    },
    '12.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "n");
    },
    "13.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    '14.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "newthing");
    },
    '15.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    },
    '17.Type in text area "message"': function() {
        act.type("#post_area", "newtaks");
    },
    "18.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "19.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    '20.Type in text area "message"': function() {
        act.type("#post_area", "skjsadsakd");
    },
    '21.Click select "category"': function() {
        var actionTarget = function() {
            return $("#twitter-post").find(".form-control[name='category']");
        };
        act.click(actionTarget);
    },
    "22.Click input": function() {
        var actionTarget = function() {
            return $(".form-group").find("[name='duetime']");
        };
        act.click(actionTarget);
    },
    "23.Click input": function() {
        var actionTarget = function() {
            return $(".form-group").find("[name='duetime']");
        };
        act.click(actionTarget);
    },
    '24.Click submit button "Add Task"': function() {
        act.click("#btn-sending");
    },
    '26.Type in text area "message"': function() {
        act.type("#post_area", "gvhbjdksgad");
    },
    "27.Click input": function() {
        var actionTarget = function() {
            return $(".form-group").find("[name='duetime']");
        };
        act.click(actionTarget);
    },
    "28.Press key combination 8+2+7+3+1+2+3": function() {
        act.press("8+2+7+3+1+2+3");
    },
    '29.Click submit button "Add Task"': function() {
        act.click("#btn-sending");
    },
};

"@test"["complete task"] = {
    '1.Click button "New user"': function() {
        act.click("#newuserbutton");
    },
    '2.Click input "name"': function() {
        act.click(".form-control.mb-3[name='name']");
    },
    '3.Type in input "name"': function() {
        act.type(".form-control.mb-3[name='name']", "newthing");
    },
    '4.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "newthing");
    },
    '5.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "newthing");
    },
    '6.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "newthing");
    },
    "7.Click body": function() {
        act.click("body");
    },
    '8.Click submit button "Sign Up"': function() {
        act.click("#submitnewuser");
    },
    '9.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "newthing");
    },
    '10.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "newthing");
    },
    '11.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    },
    '12.Type in text area "message"': function() {
        act.type("#post_area", "bjhgjfgvhjuytf");
    },
    '13.Click select "category"': function() {
        var actionTarget = function() {
            return $("#twitter-post").find(".form-control[name='category']");
        };
        act.click(actionTarget);
    },
    "14.Click input": function() {
        var actionTarget = function() {
            return $(".form-group").find("[name='duetime']");
        };
        act.click(actionTarget);
    },
    "15.Click input": function() {
        var actionTarget = function() {
            return $(".form-group").find("[name='duetime']");
        };
        act.click(actionTarget);
    },
    "16.Press key combination 8+9+7": function() {
        act.press("8+9+7");
    },
    "17.Press key combination 7+8": function() {
        act.press("7+8");
    },
    "18.Press key 9": function() {
        act.press("9");
    },
    '19.Click submit button "Add Task"': function() {
        act.click("#btn-sending");
    },
};


"@test"["add category"] = {
    '1.Click button "New user"': function() {
        act.click("#newuserbutton");
    },
    '2.Type in input "name"': function() {
        act.type(".form-control.mb-3[name='name']", "thing");
    },
    '3.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "thing");
    },
    '4.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "thing");
    },
    '5.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "thing");
    },
    '6.Click submit button "Sign Up"': function() {
        act.click("#submitnewuser");
    },
    '7.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "thing");
    },
    '8.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "thing");
    },
    '9.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    },
    '10.Click button "New Category"': function() {
        var actionTarget = function() {
            return $("#navbarNav").find(":containsExcludeChildren(New Category)");
        };
        act.click(actionTarget);
    },
    '11.Type in input "category"': function() {
        act.type(".form-control.mb-3[name='category']", "newcato");
    },
    '12.Click submit button "New Category"': function() {
        var actionTarget = function() {
            return $("#newcat").find(".btn.float-right.btn-lg.btn-primary");
        };
        act.click(actionTarget);
    },
    '13.Type in text area "message"': function() {
        act.type("#post_area", "jsuaghbdjaksd");
    },
    '14.Click select "category"': function() {
        var actionTarget = function() {
            return $("#twitter-post").find(".form-control[name='category']");
        };
        act.click(actionTarget);
    },
    "16.Click input": function() {
        var actionTarget = function() {
            return $(".form-group").find("[name='duetime']");
        };
        act.click(actionTarget);
    },
    "17.Click input": function() {
        var actionTarget = function() {
            return $(".form-group").find("[name='duetime']");
        };
        act.click(actionTarget);
    },
    "18.Press key 4": function() {
        act.press("4");
    },
    "19.Press key 3": function() {
        act.press("3");
    },
    "20.Press key 8": function() {
        act.press("8");
    },
    "21.Press key 9": function() {
        act.press("9");
    },
    "22.Press key 8": function() {
        act.press("8");
    },
    "23.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "24.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "25.Press key 1": function() {
        act.press("1");
    },
    "26.Press key 9": function() {
        act.press("9");
    },
    "27.Press key 9": function() {
        act.press("9");
    },
    "28.Press key 9": function() {
        act.press("9");
    },
    "29.Click input": function() {
        var actionTarget = function() {
            return $(".form-group").find("[name='duetime']");
        };
        act.click(actionTarget);
    },
    "30.Press key 3": function() {
        act.press("3");
    },
    '31.Click submit button "Add Task"': function() {
        act.click("#btn-sending");
    },
};

"@test"["log out"] = {
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
        act.type(".form-control.mb-3[name='name']", "newthing");
    },
    '4.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "enwthi");
    },
    "5.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "6.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "7.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "8.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "9.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "10.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "11.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    '12.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "newthing");
    },
    '13.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "newthi");
    },
    "14.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "15.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "16.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "17.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "18.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    "19.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    '20.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "newthing");
    },
    '21.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "newthing");
    },
    '22.Click submit button "Sign Up"': function() {
        act.click("#submitnewuser");
    },
    '23.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "newthing");
    },
    '24.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "newthing");
    },
    '25.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    },
    '26.Click button "Join Group"': function() {
        var actionTarget = function() {
            return $("#navbarNav").find(":containsExcludeChildren(Join Group)");
        };
        act.click(actionTarget);
    },
    '27.Click select "category"': function() {
        act.click("#Categories");
    },
    '28.Click span "×"': function() {
        var actionTarget = function() {
            return $("#joingroup").find(":containsExcludeChildren(×)");
        };
        act.click(actionTarget);
    },
    '29.Click button "New Group"': function() {
        var actionTarget = function() {
            return $("#navbarNav").find(":containsExcludeChildren(New Group)");
        };
        act.click(actionTarget);
    },
    '30.Type in input "name"': function() {
        var actionTarget = function() {
            return $("#newgroup").find(".form-control.mb-3[name='name']");
        };
        act.type(actionTarget, "newt");
    },
    "31.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    '32.Type in input "name"': function() {
        var actionTarget = function() {
            return $("#newgroup").find(".form-control.mb-3[name='name']");
        };
        act.type(actionTarget, "group");
    },
    '33.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "newgroup");
    },
    '34.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "newgroup");
    },
    '35.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "newgroup");
    },
    '36.Click submit button "Sign Up"': function() {
        var actionTarget = function() {
            return $("#newgroup").find(".btn.float-right.btn-lg.btn-primary");
        };
        act.click(actionTarget);
    },
    '37.Click link "Log Out"': function() {
        act.click(":containsExcludeChildren(Log Out)");
    }
};

"@test"["bad task"] = {
    '1.Click button "New user"': function() {
        act.click("#newuserbutton");
    },
    '2.Type in input "name"': function() {
        act.type(".form-control.mb-3[name='name']", "new");
    },
    '3.Type in input "username"': function() {
        act.type(".form-control.mb-3[name='username']", "new");
    },
    '4.Type in password input "password1"': function() {
        act.type(".form-control.mb-3[name='password1']", "new");
    },
    '5.Type in password input "password2"': function() {
        act.type(".form-control.mb-5[name='password2']", "new");
    },
    '6.Click input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.click(actionTarget);
    },
    '7.Click input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.click(actionTarget);
    },
    '8.Click submit button "Sign Up"': function() {
        act.click("#submitnewuser");
    },
    '9.Type in input "username"': function() {
        var actionTarget = function() {
            return $(".form-control[name='username']").eq(0);
        };
        act.type(actionTarget, "newn");
    },
    "10.Press key BACKSPACE": function() {
        act.press("backspace");
    },
    '11.Type in password input "password"': function() {
        act.type(".form-control[name='password']", "new");
    },
    '12.Click submit button "Log in"': function() {
        act.click("#submitlogin");
    },
    '13.Type in text area "message"': function() {
        act.type("#post_area", "huytudrfcg");
    },
    '14.Click submit button "Add Task"': function() {
        act.click("#btn-sending");
    }
};

