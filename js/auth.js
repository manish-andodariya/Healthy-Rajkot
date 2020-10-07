const loggedinlinks = $(".logged-in");
const loggedoutlinks = $(".logged-out");
var isuser = new Boolean(false);

$(document).ready(function ()
{
    auth.onAuthStateChanged((user) =>
    {
        if (user) {
            $(".loginchange").html("Click on Get Started Or Go To Console to Access Your Records.");
            $(".onlogin").html(`<h5>This is only experiment purpose development😍</h5>`);
            console.log("user signin", user);
            loggedoutlinks.css("display", "none");
            loggedinlinks.css("display", "block");
            $("#loginclass").css("display", "none");
            $("#signupclass").css("display", "none");
            isuser = true;
        } else {
            console.log("user signdout");
            loggedinlinks.css("display", "none");
            loggedoutlinks.css("display", "block");
            isuser = false;
        }
    });
});

const signupform = document.querySelector("#signup-form");
signupform.addEventListener("submit", (e) =>
{
    e.preventDefault();

    const email = signupform[ "signup-email" ].value;
    const pass = signupform[ "signup-password" ].value;

    //console.log(email,pass);
    auth
        .createUserWithEmailAndPassword(email, pass)
        .then((res) =>
        {
            auth.onAuthStateChanged((user) =>
            {
                if (user) {
                    firestore
                        .collection("users")
                        .doc(user.uid)
                        .set({
                            Name: user.displayName,
                            Email: user.email,
                            Contact: user.phoneNumber,
                            Photo: user.photoURL,
                        })
                        .then(function (docRef)
                        {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch(function (error)
                        {
                            console.error("Error adding document: ", error);
                        });
                }
            });
            signupform.reset();
        })
        .catch((error) =>
        {
            console.log(error);
            $("#signup-error").html(error.message);
        });
});

const loginform = document.querySelector("#login-form");
loginform.addEventListener("submit", (e) =>
{
    e.preventDefault();

    const email = loginform[ "login-email" ].value;
    const pass = loginform[ "login-password" ].value;

    //console.log(email,pass);
    auth
        .signInWithEmailAndPassword(email, pass)
        .then((res) =>
        {
            loginform.reset();
        })
        .catch((error) =>
        {
            console.log(error);
            $("#login-error").html(error.message);
        });
});

function logout()
{
    console.log("ok");
    auth.signOut();
    window.location.replace("/index.html");
}
