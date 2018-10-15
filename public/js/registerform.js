$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});
// Регистрация пользователя
function RegisterUser(username, password, email) {
    $.ajax({
        url: "api/account/register",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            email: email,
            password: password,
            username: username
        }),
        success: function (user) {
            var returnMessage = ['<h4>Account was created successfully!</h4>', 'Please login.'];
            $('body').showMessage({
                thisMessage: [returnMessage],
                displayNavigation: false,
                autoClose: true,
                delayTime: 3000
            });
            $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
        },
        error: function (xhr, textStatus) {
            $('body').showMessage({
                thisMessage: [xhr.responseJSON.message],
                displayNavigation: false,
                autoClose: true,
                delayTime: 3000
            });
        }
    })
}
function LoginUser(password, email) {
    var tokenKey = "tokenInfo";
    $.ajax({
        url: "api/account/login",
        contentType: "application/json",
        method: "POST",
        data: JSON.stringify({
            email: email,
            password: password
        }),
        success: function (data) {
            sessionStorage.setItem(tokenKey, data.token);
           // console.log(data.token);
            window.location.replace('/home');
        },
        error: function (xhr, textStatus) {
            $('body').showMessage({
                thisMessage: [xhr.responseJSON.message],
                displayNavigation: false,
                autoClose: true,
                delayTime: 3000
            });
        }
    })
}
$(".register-form").submit(function (e) {
    e.preventDefault();
    //var id = this.elements["id"].value;
    var username = this.elements["username"].value;
    var password = this.elements["password"].value;
    var email = this.elements["email"].value;

    RegisterUser(username, password, email);

});

$(".login-form").submit(function (e) {
    e.preventDefault();
    //var id = this.elements["id"].value;

    var password = this.elements["password"].value;
    var email = this.elements["email"].value;

    LoginUser(password, email);

});