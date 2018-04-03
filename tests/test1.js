// import { Selector } from 'testcafe';

// fixture `testthing`
//     .page `http://localhost:3000/`;

// const user = Selector('#newuserbutton');
// const newuser  = Selector('#submitnewuser');
// const login = Selector('#submitlogin'); 

// test('new account/login', async t => {
//     await t
//         .click(user);
//     await t
//         .typeText(".form-control.mb-3[name='name']", "newacc")
//     await t
//         .typeText(".form-control.mb-3[name='username']", "newacc")
//     await t
//         .typeText(".form-control.mb-3[name='password1']", "soso")
//     await t
//         .typeText(".form-control.mb-5[name='password2']", "soso")
//     await t
//         .click(newuser);
//     await t
//         .typeText(".form-control[name='username']", "newacc")
//     await t
//         .typeText(".form-control[name='password']", "soso")
//     await t
//         .click(login)
//     await t
//         .expect(Selector(".card-title.text-center").eql("newacc"),
//         .expect(Selector(".text-center.text-handle").eql("@newacc");
//     // "10.Assert": function() {
//     //     eq($(".card-title.text-center").text(), "newacc");
//     //     eq($(".text-center.text-handle").text(), "@newacc");
//     // },
//     // '11.Type in text area "message"': function() {
//     //     act.type("#post_area", "new thing");
//     // },
//     // '12.Click select "category"': function() {
//     //     var actionTarget = function() {
//     //         return $("#twitter-post").find(".form-control[name='category']");
//     //     };
//     //     act.click(actionTarget);
//     // },
//     // "13.Click input": function() {
//     //     var actionTarget = function() {
//     //         return $(".form-group").find("[name='duetime']");
//     //     };
//     //     act.click(actionTarget);
//     // },
//     // "14.Press key 3": function() {
//     //     act.press("3");
//     // },
//     // "15.Press key combination 4+2": function() {
//     //     act.press("4+2");
//     // },
//     // "16.Press key 3": function() {
//     //     act.press("3");
//     // },
//     // "17.Press key 4": function() {
//     //     act.press("4");
//     // },
//     // '18.Click submit button "Add Task"': function() {
//     //     act.click("#btn-sending");
//     // },
//     // "19.Assert": function() {
//     //     eq($(":containsExcludeChildren(Mon Mar 03 0234 160000 GMT0800 PST)"), $(":containsExcludeChildren(Mon Mar 03 0234 160000 GMT0800 PST)"));
//     // }

// });

"@fixture testthing";
"@page http://localhost:3000/";

"@test"["new account/login"] = {
    '1.Click button "New user"': function() {
        act.click(":containsExcludeChildren(New user)");
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
        var actionTarget = function() {
            return $("#newuser").find(".btn.float-right.btn-lg.btn-primary");
        };
        act.click(actionTarget);
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
        act.click(":containsExcludeChildren(Log in)");
    }
};