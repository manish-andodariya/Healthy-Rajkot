function gotoconsole()
{
    auth.onAuthStateChanged((user) =>
    {
        if (user) {
            window.location.replace("/content.html");
        } else {
            alert("plz Login");
        }
    });
}

function myacc()
{
    $(".main").html(" ");
    var user = firebase.auth().currentUser;
    if (user != null) {
        console.log("user");
        var docRef = firestore
            .collection("users")
            .doc(user.uid)
            .onSnapshot(function (doc)
            {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    const userinfo = doc.data();
                    if (userinfo.Name == null) {
                        userinfo.Name = "Please Enter Name";
                    }
                    if (userinfo.Contact == null) {
                        userinfo.Contact = "Please Enter Contact No.";
                    }
                    let html = "";
                    $(".main").html(html);
                    html = `
                <h5 class="center">Account Detail</h5>
                  <div class="row">
                      <form class="col s12" id="updateacc">
                          <div class="input-field col s12">
                            <input id="first_name" type="text" class="validate" >
                            <label for="first_name"> ${userinfo.Name}</label>
                          </div>
                        <div class="input-field col s12">
                          <input disabled id="email" type="email" class="validate">
                          <label for="email">${userinfo.Email}</label>
                        </div>
                        <div class="input-field col s12">
                          <input id="tel" type="tel" class="validate" maxlength='10' >
                          <label for="tel">${userinfo.Contact}</label>
                        </div>
                        <p class='update_done'></p>
                        <p class='update_error'></p>
                        <button class="waves-effect waves-light btn z-depth-3 btn-custom darken-2">Update</button>
                      </form>
                    </div>`;
                    $(".main").append(html);
                    $(".main").css("display", "block");

                    const updateacc = document.querySelector("#updateacc");
                    updateacc.addEventListener("submit", (e) =>
                    {
                        $(".update_done").text(" ");
                        $(".update_error").text(" ");
                        e.preventDefault();

                        const Name = updateacc[ "first_name" ].value;
                        const Phone = updateacc[ "tel" ].value;
                        // Add a new document in collection "cities"
                        if (Name && Phone != "") {
                            firestore
                                .collection("users")
                                .doc(user.uid)
                                .set(
                                    {
                                        Name: Name,
                                        Contact: Phone,
                                    },
                                    { merge: true }
                                )
                                .then(function ()
                                {
                                    console.log("Document successfully written!");
                                    $(".update_done").text("Updated");
                                })
                                .catch(function (error)
                                {
                                    console.error("Error writing document: ", error);
                                    $(".update_error").text("Somthing went wrong");
                                });
                        } else {
                            $(".update_error").text("Please fill Details");
                        }
                    });
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            });
        console.log("clicked");
    } else {
        console.error("no user");
    }
}

function about()
{
    $(".main").html(" ");
    $(".main").css("display", "block");
    $(".main").html(`<h5 class="center">When you have a My Health Record, your health information can be viewed securely online, from anywhere, at any time – even if you move or travel interstate. You can access your health information from any computer or device that’s connected to the internet.

    Whether you’re visiting a GP for a check-up, or in an emergency room following an accident and are unable to talk, healthcare providers involved in your care can access important health information, such as:
    
        allergies
        medicines you are taking
        medical conditions you have been diagnosed with
        pathology test results like blood tests.  
    
    This can help you get the right treatment. You don’t need to be sick to benefit from having a My Health Record. It’s a convenient way to record and track your health information over time.</h5>`);
}

function myrec()
{
    console.log("clicked");
    $(".main").html(" ");
    var user = firebase.auth().currentUser;
    if (user != null) {
        console.log("user");
        var docRef = firestore
            .collection("myrecord")
            .doc(user.uid)
            .onSnapshot(function (doc)
            {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    const record = doc.data();
                    let fetchedmyrecord = "";
                    fetchedmyrecord = `
                <h5 class="center">${record.PatientName}'s Record</h5>
                <table class="centered">
                <tbody>
                  <tr>
                    <td>Name Of Patient</td>
                    <td>${record.PatientName}</td>
                  </tr>
                   <tr>
                    <td>Age</td>
                    <td>${record.Age}</td>
                  </tr>
                  <tr>
                    <td>Disease</td>
                    <td>${record.Disease}</td>
                  </tr>
                  <tr>
                  <td>Discription</td>
                  <td>${record.Description}</td>
                </tr>
                 <tr>
                  <td>Doctor</td>
                  <td>${record.doctor}</td>
                </tr>
                <tr>
                  <td>Clinic</td>
                  <td>${record.ClinicName} ${record.City}</td>
                </tr>
                  <tr>
                    <td>Fees</td>
                    <td>${record.FeesPaid}</td>
                  </tr>
                </tbody>
              </table>  
              <a href="#modalupdaterecod" class="right waves-effect waves-light btn z-depth-3 btn-custom darken-2 modal-trigger">Edit</a>`;
                    $(".main").append(fetchedmyrecord);
                    $(".main").css("display", "block");
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    let htmlmyrec = " ";
                    htmlmyrec = `<div class="row center">
                <h2 class="center">No Record Found<h2><br> 
                <a href="#modalcreaterecod" class="center waves-effect waves-light btn z-depth-3 btn-custom-large darken-2 modal-trigger">Create New Record</a>
                </div>`;
                    $(".main").append(htmlmyrec);

                    $(".main").css("display", "block");
                }
            });
        console.log("clicked");
    } else {
        console.error("no user");
    }
}

$(document).ready(function ()
{
    const createrecord = document.querySelector("#createrec");
    createrecord.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        const name = createrecord[ "first_name" ].value;
        const age = createrecord[ "age" ].value;
        const disease = createrecord[ "disease" ].value;
        const description = createrecord[ "description" ].value;
        const doctor = createrecord[ "doctor" ].value;
        const fee = createrecord[ "fee" ].value;
        const clinic = createrecord[ "clinic" ].value;
        const city = createrecord[ "city" ].value;

        var user = firebase.auth().currentUser;
        if (user != null) {
            console.log("user");
            firestore
                .collection("myrecord")
                .doc(user.uid)
                .set({
                    PatientName: name,
                    Age: age,
                    Disease: disease,
                    Description: description,
                    doctor: doctor,
                    FeesPaid: fee,
                    ClinicName: clinic,
                    City: city,
                })
                .then(function ()
                {
                    window.location.reload();
                })
                .catch(function (error)
                {
                    console.error("Error writing document: ", error);
                });
        }
    });
});

const updaterecord = document.querySelector("#updaterec");
updaterecord.addEventListener("submit", (e) =>
{
    e.preventDefault();

    const name = updaterecord[ "first_name" ].value;
    const age = updaterecord[ "age" ].value;
    const disease = updaterecord[ "disease" ].value;
    const description = updaterecord[ "description" ].value;
    const doctor = updaterecord[ "doctor" ].value;
    const fee = updaterecord[ "fee" ].value;
    const clinic = updaterecord[ "clinic" ].value;
    const city = updaterecord[ "city" ].value;

    var user = firebase.auth().currentUser;
    if (user != null) {
        console.log("user");
        firestore
            .collection("myrecord")
            .doc(user.uid)
            .set(
                {
                    PatientName: name,
                    Age: age,
                    Disease: disease,
                    Description: description,
                    doctor: doctor,
                    FeesPaid: fee,
                    ClinicName: clinic,
                    City: city,
                },
                { merge: true }
            )
            .then(function ()
            {
                window.location.reload();
            })
            .catch(function (error)
            {
                console.error("Error writing document: ", error);
            });
    }
});

function myexp()
{
    console.log("clicked");
    $(".main").html(" ");
    var user = firebase.auth().currentUser;
    if (user != null) {
        console.log("user");
        var docRef = firestore
            .collection("myrecord")
            .doc(user.uid).collection('Expert')
            .get().then(function (querySnapshot)
            {
                querySnapshot.forEach(function (doc)
                {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    if (doc.exists) {
                        console.log("Document data:", doc.data());
                        const record = doc.data();
                        let fetchedmyrecord = "";
                        fetchedmyrecord = `
                <h5 class="center">${record.DoctorName}'s Record</h5>
                <table class="centered">
                <tbody>
                  <tr>
                    <td>Doctor Name</td>
                    <td>${record.DoctorName}</td>
                  </tr>
                   <tr>
                    <td>Speciality</td>
                    <td>${record.Speciality}</td>
                  </tr>
                  <tr>
                    <td>Disease</td>
                    <td>${record.Disease}</td>
                  </tr>
                  <tr>
                  <td>Discription</td>
                  <td>${record.Description}</td>
                </tr>
                <tr>
                  <td>Clinic</td>
                  <td>${record.ClinicName} ${record.City}</td>
                </tr>
                  <tr>
                    <td>Fees</td>
                    <td>${record.FeesPaid}</td>
                  </tr>
                </tbody>
              </table>  
        <!--a href="#modalupdaterecod" class="right waves-effect waves-light btn z-depth-3 btn-custom darken-2 modal-trigger">Edit</a-->`;
                        $(".main").append(fetchedmyrecord);
                        $(".main").css("display", "block");
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        let htmlmyrec = " ";
                        htmlmyrec = `<div class="row center">
                <h2 class="center">No Record Found<h2><br> 
                <a href="#modalcreateexprecod" class="center waves-effect waves-light btn z-depth-3 btn-custom-large darken-2 modal-trigger">Add Expert Record</a>
                </div>`;
                        $(".main").append(htmlmyrec);

                        $(".main").css("display", "block");
                    }
                });
            });
        console.log("clicked");
    } else {
        console.error("no user");
    }
}

$(document).ready(function ()
{
    const createrecord = document.querySelector("#createexprec");
    createrecord.addEventListener("submit", (e) =>
    {
        e.preventDefault();

        const name = createrecord[ "first_name" ].value;
        const speciality = createrecord[ "speciality" ].value;
        const disease = createrecord[ "disease" ].value;
        const description = createrecord[ "description" ].value;
        const fee = createrecord[ "fee" ].value;
        const clinic = createrecord[ "clinic" ].value;
        const city = createrecord[ "city" ].value;

        var user = firebase.auth().currentUser;
        if (user != null) {
            console.log("user");
            firestore
                .collection("myrecord")
                .doc(user.uid).collection('Expert').doc()
                .set({
                    DoctorName: name,
                    Speciality: speciality,
                    Disease: disease,
                    Description: description,
                    FeesPaid: fee,
                    ClinicName: clinic,
                    City: city,
                })
                .then(function ()
                {
                    window.location.reload();
                })
                .catch(function (error)
                {
                    console.error("Error writing document: ", error);
                });
        }
    });
});

function myfrec()
{
    console.log("clicked");

    $(".main").html(" ");
    $('.main').html(`<h2 class="center">Comming Soon</h2>`);
    $('.main').css('display', 'block');
}
    /*const createfm = document.querySelector("#createfm");
createfm.addEventListener("submit", (e) =>
{
e.preventDefault();

const name = createfm[ "first_name" ].value;

var user = firebase.auth().currentUser;
if (user != null) {
console.log("user");
firestore
.collection("myrecord")
.doc(user.uid)
.collection("myfamilyrec")
.doc(name)
.collection(name)
.add({
PatientName: name,
})
.then(function ()
{
console.log("n fm add++");
$(".modal").modal("close");
myfrec();
})
.catch(function (error)
{
console.error("Error writing document: ", error);
});
}
});

$(".main").html(" ");
var user = firebase.auth().currentUser;
if (user != null) {
$(".main").css("display", "none");
$(".fmblock").css("display", "block");
let htmlfmerc1 = '';
let htmlfmerc2 = '';
let htmlfmerc3 = '';
let htmlmyrec = '';
//$(".collapsible").html("");
var docRef = firestore.collection("myrecord").doc(user.uid).collection("myfamilyrec");
docRef.onSnapshot((querySnapshot) =>
{
querySnapshot.forEach((doc) =>
{
console.log(doc.data()); // For data inside doc
console.log(doc.id); // For doc name
htmlfmerc1 = `<li>
<div class="collapsible-header">${doc.id}<span class="badge"><a href="#"
class="right waves-effect waves-light btn z-depth-3 btn-custom-smaill darken-2 modal-trigger" onclick="pass()">Add Record</a></span></div>
<div class="collapsible-body">`;
var docRef = firestore
.collection("myrecord")
.doc(user.uid)
.collection("myfamilyrec")
.doc(doc.id)
.collection(doc.id);
docRef.onSnapshot((querySnapshot) =>
{
querySnapshot.forEach((doc) =>
{
if (doc.exists) {
console.log(doc.data()); // For data inside doc
console.log(doc.id + "chhe"); // For doc name
htmlfmerc2 += `<span>PatientName:${doc.data().PatientName}<br>
Age :${doc.data().Age}<br>
Description :${doc.data().Description}<br>
Disease :${doc.data().Disease}<br>
doctor :${doc.data().doctor}<br>
ClinicName :${doc.data().ClinicName}<br>
City :${doc.data().City}<br>
FeesPaid :${doc.data().FeesPaid}<br><br></span> `;
} else {
console.error("nop");
}
});
console.log(htmlfmerc1.concat(htmlfmerc2));
console.log(htmlmyrec.concat(`</div>
</li>`));
htmlfmerc3 = htmlfmerc1.concat(htmlfmerc2);
htmlmyrec = htmlfmerc3.concat(`</div>
</li>`);

console.log(htmlmyrec);
$(".collapsible").append(htmlmyrec);
});
});
});
} else {
console.error("no user");
}
}

var fmname = "null";
/*$(document).on("click", "ul.collapsible li", function () {
var elem = document.querySelectorAll("ul.collapsible li");
var index = "none";

for (var i = 0; i < elem.length; i++) {
if (elem[i].className == "active") {
index = i;
}
}
console.log(elem[index].childNodes[1].innerText.replace("Add Record", ""));
fmname = elem[index].childNodes[1].innerText.replace("Add Record", "").toString();
});
function pass()
{
$(document).on("click", "ul.collapsible li", function ()
{
var elem = document.querySelectorAll("ul.collapsible li");
var index = "none";

for (var i = 0; i < elem.length; i++) {
if (elem[ i ].className == "active") {
index = i;
}
}
console.log(elem[ index ].childNodes[ 1 ].innerText.replace("Add Record", ""));
fmname = elem[ index ].childNodes[ 1 ].innerText.replace("Add Record", "").toString();
});
setTimeout(function ()
{
$("#modalfmrecord").modal("open");
const createfmrec = document.querySelector("#createfmrec");
createfmrec[ "first_name" ].value = fmname;
}, 1000);
}
const createfmrec = document.querySelector("#createfmrec");
createfmrec.addEventListener("submit", (e) =>
{
e.preventDefault();
const name = createfmrec[ "first_name" ].value;
const age = createfmrec[ "age" ].value;
const disease = createfmrec[ "disease" ].value;
const description = createfmrec[ "description" ].value;
const doctor = createfmrec[ "doctor" ].value;
const fee = createfmrec[ "fee" ].value;
const clinic = createfmrec[ "clinic" ].value;
const city = createfmrec[ "city" ].value;

var user = firebase.auth().currentUser;
if (user != null) {
console.log("user");

firestore
.collection("myrecord")
.doc(user.uid)
.collection("myfamilyrec")
.doc(name)
.collection(name)
.doc()
.set({
PatientName: name,
Age: age,
Disease: disease,
Description: description,
doctor: doctor,
FeesPaid: fee,
ClinicName: clinic,
City: city,
})
.then(function ()
{
myfrec();
$("#modalfmrecord").modal("close");
})
.catch(function (error)
{
console.error("Error writing document: ", error);
});
}
});*/
