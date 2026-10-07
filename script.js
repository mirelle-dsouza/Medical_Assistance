```javascript
// ============================================================
// MEDICAL ASSISTANCE - MAIN JAVASCRIPT
// ============================================================


// ============================================================
// DEFAULT DOCTORS
// ============================================================

var doctors = JSON.parse(
    localStorage.getItem("doctors")
);

if (doctors == null || doctors.length == 0) {

    doctors = [

        {
            name: "Dr. Ananya Rao",
            loginName: "ananya",
            password: "ananya123",
            email: "ananya@gmail.com",
            phone: "9000000001",
            department: "General Medicine",
            specialization: "General Physician",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "A viral illness that may cause fever, cough, fatigue."
        },

        {
            name: "Dr. Aarav Mehta",
            loginName: "aarav",
            password: "aarav123",
            email: "aarav@gmail.com",
            phone: "9000000002",
            department: "Neurology",
            specialization: "Neurologist",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "A type of headache that can be associated with nausea."
        },

        {
            name: "Dr. Meera Nair",
            loginName: "meera",
            password: "meera123",
            email: "meera@gmail.com",
            phone: "9000000003",
            department: "Gastroenterology",
            specialization: "Gastroenterologist",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "A condition that may occur after consuming contaminated food."
        },

        {
            name: "Dr. Rohan Shah",
            loginName: "rohan",
            password: "rohan123",
            email: "rohan@gmail.com",
            phone: "9000000004",
            department: "Pulmonology",
            specialization: "Pulmonologist",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "Specialist for conditions related to the lungs and respiratory system."
        },

        {
            name: "Dr. Kavya Desai",
            loginName: "kavya",
            password: "kavya123",
            email: "kavya@gmail.com",
            phone: "9000000005",
            department: "Pediatrics",
            specialization: "Pediatrician",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "Specialist who provides medical care for children."
        },

        {
            name: "Dr. Arjun Kapoor",
            loginName: "arjun",
            password: "arjun123",
            email: "arjun@gmail.com",
            phone: "9000000006",
            department: "Dermatology",
            specialization: "Dermatologist",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "Specialist for skin, hair and nail related conditions."
        },

        {
            name: "Dr. Ishaan Malhotra",
            loginName: "ishaan",
            password: "ishaan123",
            email: "ishaan@gmail.com",
            phone: "9000000007",
            department: "Cardiology",
            specialization: "Cardiologist",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "Specialist for heart and cardiovascular conditions."
        },

        {
            name: "Dr. Neha Iyer",
            loginName: "neha",
            password: "neha123",
            email: "neha@gmail.com",
            phone: "9000000008",
            department: "ENT",
            specialization: "ENT Specialist",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "A common infection that may cause cough and runny nose."
        },

        {
            name: "Dr. Karan Patel",
            loginName: "karan",
            password: "karan123",
            email: "karan@gmail.com",
            phone: "9000000009",
            department: "Orthopedics",
            specialization: "Orthopedic Specialist",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "Fever caused by a viral infection and often associated with other symptoms."
        },

        {
            name: "Dr. Diya Sharma",
            loginName: "diya",
            password: "diya123",
            email: "diya@gmail.com",
            phone: "9000000010",
            department: "Gynecology",
            specialization: "Gynecologist",
            workingFrom: "09:00",
            workingTill: "17:00",
            availableToday: true,
            description:
                "Specialist for women's reproductive and related health conditions."
        }

    ];

    localStorage.setItem(
        "doctors",
        JSON.stringify(doctors)
    );
}


// ============================================================
// DEFAULT PATIENTS
// ============================================================

var patients = JSON.parse(
    localStorage.getItem("patients")
);

if (patients == null || patients.length == 0) {

    patients = [

        {
            patient_id: 1,
            name: "Aarohi Sharma",
            loginName: "aarohi",
            password: "aarohi123",
            email: "aarohi@gmail.com",
            phone: "9111111111",
            familyName: "Rahul Sharma",
            familyPhone: "9222222222"
        },

        {
            patient_id: 2,
            name: "Riya Patel",
            loginName: "riya",
            password: "riya123",
            email: "riya@gmail.com",
            phone: "9333333333",
            familyName: "Amit Patel",
            familyPhone: "9444444444"
        }

    ];

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );
}


// ============================================================
// SHOW PAGE
// ============================================================

function showPage(pageName) {

    var pages =
        document.getElementsByClassName("page");

    for (var i = 0; i < pages.length; i++) {

        pages[i].classList.add("hidden");
    }

    var page =
        document.getElementById(pageName);

    if (page != null) {
        page.classList.remove("hidden");
    }
}


// ============================================================
// PATIENT REGISTRATION
// ============================================================

var patientRegisterForm =
    document.getElementById(
        "patientRegisterForm"
    );

if (patientRegisterForm != null) {

    patientRegisterForm.onsubmit =
        function () {

        var name =
            document.getElementById(
                "patientName"
            ).value.trim();

        var loginName =
            document.getElementById(
                "patientLoginName"
            ).value.trim();

        var password =
            document.getElementById(
                "patientPassword"
            ).value;

        var confirmPassword =
            document.getElementById(
                "patientConfirmPassword"
            ).value;

        var email =
            document.getElementById(
                "patientEmail"
            ).value.trim();

        var phone =
            document.getElementById(
                "patientPhone"
            ).value.trim();

        var familyName =
            document.getElementById(
                "familyName"
            ).value.trim();

        var familyPhone =
            document.getElementById(
                "familyPhone"
            ).value.trim();

        var error =
            document.getElementById(
                "patientRegisterError"
            );

        error.innerHTML = "";

        if (name == "") {
            error.innerHTML =
                "Please enter your name.";
            return false;
        }

        if (loginName == "") {
            error.innerHTML =
                "Please enter login ID.";
            return false;
        }

        if (password.length < 6) {
            error.innerHTML =
                "Password must contain at least 6 characters.";
            return false;
        }

        if (password != confirmPassword) {
            error.innerHTML =
                "Passwords do not match.";
            return false;
        }

        if (email == "") {
            error.innerHTML =
                "Please enter email.";
            return false;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            error.innerHTML =
                "Phone number must contain 10 digits.";
            return false;
        }

        if (familyName == "") {
            error.innerHTML =
                "Please enter family member name.";
            return false;
        }

        if (!/^[0-9]{10}$/.test(familyPhone)) {
            error.innerHTML =
                "Family phone number must contain 10 digits.";
            return false;
        }

        var patients =
            JSON.parse(
                localStorage.getItem("patients")
            );

        if (patients == null) {
            patients = [];
        }

        for (var i = 0; i < patients.length; i++) {

            if (patients[i].loginName == loginName) {

                error.innerHTML =
                    "Login ID already exists.";

                return false;
            }
        }

        /*
         * New registrations are currently stored in localStorage.
         * A MySQL patient_id will be assigned when patient
         * registration is connected to the Java backend.
         */

        var patient = {

            patient_id: null,

            name: name,

            loginName: loginName,

            password: password,

            email: email,

            phone: phone,

            familyName: familyName,

            familyPhone: familyPhone
        };

        patients.push(patient);

        localStorage.setItem(
            "patients",
            JSON.stringify(patients)
        );

        alert(
            "Registration successful. Please login."
        );

        patientRegisterForm.reset();

        showPage("loginPage");

        return false;
    };
}


// ============================================================
// LOGIN
// ============================================================

var loginForm =
    document.getElementById(
        "loginForm"
    );

if (loginForm != null) {

    loginForm.onsubmit =
        function () {

        var name =
            document.getElementById(
                "loginName"
            ).value.trim();

        var password =
            document.getElementById(
                "loginPassword"
            ).value;

        var error =
            document.getElementById(
                "loginError"
            );

        error.innerHTML = "";

        if (name == "") {
            error.innerHTML =
                "Please enter name or login ID.";
            return false;
        }

        if (password == "") {
            error.innerHTML =
                "Please enter password.";
            return false;
        }

        var patients =
            JSON.parse(
                localStorage.getItem("patients")
            );

        var doctors =
            JSON.parse(
                localStorage.getItem("doctors")
            );

        if (patients == null) {
            patients = [];
        }

        if (doctors == null) {
            doctors = [];
        }


        // ----------------------------------------------------
        // CHECK PATIENT LOGIN
        // ----------------------------------------------------

        for (var i = 0; i < patients.length; i++) {

            if (
                (
                    patients[i].name == name ||
                    patients[i].loginName == name
                )
                &&
                patients[i].password == password
            ) {

                localStorage.setItem(
                    "loggedInPatient",
                    JSON.stringify(patients[i])
                );

                localStorage.removeItem(
                    "loggedInDoctor"
                );

                showPatientDashboard();

                return false;
            }
        }


        // ----------------------------------------------------
        // CHECK DOCTOR LOGIN
        // ----------------------------------------------------

        for (var j = 0; j < doctors.length; j++) {

            if (
                (
                    doctors[j].name == name ||
                    doctors[j].loginName == name
                )
                &&
                doctors[j].password == password
            ) {

                localStorage.setItem(
                    "loggedInDoctor",
                    JSON.stringify(doctors[j])
                );

                localStorage.removeItem(
                    "loggedInPatient"
                );

                showDoctorDashboard();

                return false;
            }
        }

        error.innerHTML =
            "Invalid name/login ID or password.";

        return false;
    };
}


// ============================================================
// PATIENT DASHBOARD
// ============================================================

function showPatientDashboard() {

    var patient =
        JSON.parse(
            localStorage.getItem(
                "loggedInPatient"
            )
        );

    if (patient == null) {

        showPage("loginPage");

        return;
    }

    showPage(
        "patientDashboardPage"
    );

    var welcome =
        document.getElementById(
            "welcomePatient"
        );

    if (welcome != null) {

        welcome.innerHTML =
            patient.name;
    }
}


// ============================================================
// SHOW DOCTORS
// ============================================================

function showDoctors() {

    var patient =
        JSON.parse(
            localStorage.getItem(
                "loggedInPatient"
            )
        );

    if (patient == null) {

        showPage("loginPage");

        return;
    }

    showPage("doctorsPage");

    var specialization =
        document.getElementById(
            "doctorSpecialization"
        );

    if (specialization != null) {
        specialization.value = "";
    }

    var doctorList =
        document.getElementById(
            "doctorList"
        );

    if (doctorList != null) {

        doctorList.innerHTML =
            "<p>Please select a specialization.</p>";
    }
}


// ============================================================
// DISPLAY DOCTORS
// ============================================================

function displayDoctors() {

    var specialization =
        document.getElementById(
            "doctorSpecialization"
        ).value;

    var doctorList =
        document.getElementById(
            "doctorList"
        );

    doctorList.innerHTML = "";

    if (specialization == "") {

        doctorList.innerHTML =
            "<p>Please select a specialization.</p>";

        return;
    }

    var doctors =
        JSON.parse(
            localStorage.getItem("doctors")
        );

    if (doctors == null) {
        doctors = [];
    }

    var found = false;

    for (var i = 0; i < doctors.length; i++) {

        if (
            doctors[i].specialization ==
                specialization
            &&
            doctors[i].availableToday == true
        ) {

            found = true;

            var div =
                document.createElement("div");

            div.className =
                "doctorBox";

            div.innerHTML =

                "<b>" +
                doctors[i].name +
                "</b><br><br>" +

                "Department: " +
                doctors[i].department +
                "<br>" +

                "Specialization: " +
                doctors[i].specialization +
                "<br><br>" +

                "Description: " +
                doctors[i].description +
                "<br><br>" +

                "<b>Appointment Timing:</b><br>" +
                "9:00 AM - 1:00 PM<br>" +
                "2:30 PM - 5:00 PM";

            doctorList.appendChild(div);
        }
    }

    if (found == false) {

        doctorList.innerHTML =
            "<p>No doctor is available today for this specialization.</p>";
    }
}


// ============================================================
// SHOW APPOINTMENT PAGE
// ============================================================

function showAppointment() {

    var patient =
        JSON.parse(
            localStorage.getItem(
                "loggedInPatient"
            )
        );

    if (patient == null) {

        showPage("loginPage");

        return;
    }

    showPage("appointmentPage");

    var patientName =
        document.getElementById(
            "appointmentPatientName"
        );

    if (patientName != null) {

        patientName.innerHTML =
            patient.name;
    }

    var specialization =
        document.getElementById(
            "appointmentSpecialization"
        );

    if (specialization != null) {

        specialization.value = "";
    }

    var doctor =
        document.getElementById(
            "appointmentDoctor"
        );

    if (doctor != null) {

        doctor.innerHTML =
            "<option value=''>" +
            "Select Doctor" +
            "</option>";
    }

    var timeSlotArea =
        document.getElementById(
            "timeSlotArea"
        );

    if (timeSlotArea != null) {

        timeSlotArea.innerHTML = "";
    }

    var selectedTime =
        document.getElementById(
            "selectedTime"
        );

    if (selectedTime != null) {

        selectedTime.value = "";
    }

    clearSymptoms();
}


// ============================================================
// SHOW APPOINTMENT DOCTORS
// ============================================================

function showAppointmentDoctors() {

    var specialization =
        document.getElementById(
            "appointmentSpecialization"
        ).value;

    var doctorSelect =
        document.getElementById(
            "appointmentDoctor"
        );

    doctorSelect.innerHTML =
        "<option value=''>" +
        "Select Doctor" +
        "</option>";

    document.getElementById(
        "timeSlotArea"
    ).innerHTML = "";

    document.getElementById(
        "selectedTime"
    ).value = "";

    if (specialization == "") {
        return;
    }

    var doctors =
        JSON.parse(
            localStorage.getItem("doctors")
        );

    if (doctors == null) {
        doctors = [];
    }

    var found = false;

    for (var i = 0; i < doctors.length; i++) {

        if (
            doctors[i].specialization ==
                specialization
            &&
            doctors[i].availableToday == true
        ) {

            found = true;

            var option =
                document.createElement("option");

            option.value =
                doctors[i].name;

            option.text =
                doctors[i].name;

            doctorSelect.appendChild(
                option
            );
        }
    }

    if (found == false) {

        doctorSelect.innerHTML =
            "<option value=''>" +
            "No doctor available today" +
            "</option>";
    }
}


// ============================================================
// SHOW TIME SLOTS - OLD LOCAL DISPLAY
// Kept for compatibility with the existing page.
// The actual booking uses MySQL slots from Java.
// ============================================================

function showTimeSlots() {

    var doctorName =
        document.getElementById(
            "appointmentDoctor"
        ).value;

    var area =
        document.getElementById(
            "timeSlotArea"
        );

    area.innerHTML = "";

    document.getElementById(
        "selectedTime"
    ).value = "";

    if (doctorName == "") {
        return;
    }

    area.innerHTML =
        "<p><b>Select Time:</b></p>";

    var div =
        document.createElement("div");

    div.className =
        "timeSlots";

    var morningStart = 9 * 60;

    var morningEnd = 13 * 60;

    var afternoonStart =
        14 * 60 + 30;

    var afternoonEnd =
        17 * 60;

    for (
        var time = morningStart;
        time < morningEnd;
        time = time + 30
    ) {

        createTimeButton(
            doctorName,
            time,
            div
        );
    }

    for (
        var time = afternoonStart;
        time < afternoonEnd;
        time = time + 30
    ) {

        createTimeButton(
            doctorName,
            time,
            div
        );
    }

    area.appendChild(div);
}


// ============================================================
// CREATE TIME BUTTON
// ============================================================

function createTimeButton(
    doctorName,
    time,
    div
) {

    var timeText =
        convertMinutesToTime(time);

    var full =
        isTimeFull(
            doctorName,
            timeText
        );

    var button =
        document.createElement("button");

    button.type = "button";

    if (full == true) {

        button.disabled = true;

        button.className =
            "timeButton fullSlot";

        button.innerHTML =
            timeText + " - FULL";

    }
    else {

        button.className =
            "timeButton";

        button.innerHTML =
            timeText;

        button.onclick =
            function () {

                selectTime(
                    this.innerHTML
                );
            };
    }

    div.appendChild(button);
}


// ============================================================
// CONVERT TIME
// ============================================================

function convertTimeToMinutes(time) {

    var parts =
        time.split(":");

    var hour =
        parseInt(parts[0]);

    var minute =
        parseInt(parts[1]);

    return (
        hour * 60 +
        minute
    );
}


function convertMinutesToTime(minutes) {

    var hour =
        Math.floor(
            minutes / 60
        );

    var minute =
        minutes % 60;

    var ampm = "AM";

    if (hour >= 12) {
        ampm = "PM";
    }

    if (hour > 12) {
        hour = hour - 12;
    }

    if (hour == 0) {
        hour = 12;
    }

    var minuteText =
        minute;

    if (minute < 10) {
        minuteText =
            "0" + minute;
    }

    return (
        hour +
        ":" +
        minuteText +
        " " +
        ampm
    );
}


// ============================================================
// CHECK LOCAL TIME FULL
// ============================================================

function isTimeFull(
    doctorName,
    time
) {

    var appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        );

    if (appointments == null) {
        appointments = [];
    }

    var count = 0;

    for (
        var i = 0;
        i < appointments.length;
        i++
    ) {

        if (
            appointments[i].doctor ==
                doctorName
            &&
            appointments[i].time ==
                time
            &&
            appointments[i].status !=
                "Cancelled"
        ) {

            count++;
        }
    }

    if (count >= 1) {
        return true;
    }

    return false;
}


// ============================================================
// SELECT TIME
// ============================================================

function selectTime(time) {

    document.getElementById(
        "selectedTime"
    ).value =
        time;

    alert(
        "Selected Time: " + time
    );
}


// ============================================================
// CLEAR SYMPTOMS
// ============================================================

function clearSymptoms() {

    var symptoms =
        document.getElementsByName(
            "symptom"
        );

    for (
        var i = 0;
        i < symptoms.length;
        i++
    ) {

        symptoms[i].checked =
            false;
    }
}


// ============================================================
// APPOINTMENT FORM
// ============================================================

var appointmentForm =
    document.getElementById(
        "appointmentForm"
    );

if (appointmentForm != null) {

    appointmentForm.onsubmit =
        function () {

        var error =
            document.getElementById(
                "appointmentError"
            );

        error.innerHTML = "";


        // ----------------------------------------------------
        // GET LOGGED-IN PATIENT
        // ----------------------------------------------------

        var patient =
            JSON.parse(
                localStorage.getItem(
                    "loggedInPatient"
                )
            );


        if (patient == null) {

            error.innerHTML =
                "Please login before booking an appointment.";

            showPage("loginPage");

            return false;
        }


        // ----------------------------------------------------
        // CHECK PATIENT ID
        // ----------------------------------------------------

        if (
            patient.patient_id == null ||
            patient.patient_id == ""
        ) {

            error.innerHTML =
                "This patient is not connected to the database. Please use a registered database patient.";

            return false;
        }


        // ----------------------------------------------------
        // GET DOCTOR
        // ----------------------------------------------------

        var doctorElement =
            document.getElementById(
                "appointmentDoctor"
            );

        var doctor =
            "";

        if (doctorElement != null) {

            doctor =
                doctorElement.value;
        }


        if (doctor == "") {

            error.innerHTML =
                "Please select a doctor.";

            return false;
        }


        // ----------------------------------------------------
        // GET TIME
        // ----------------------------------------------------

        var timeElement =
            document.getElementById(
                "selectedTime"
            );

        var time =
            "";

        if (timeElement != null) {

            time =
                timeElement.value;
        }


        if (time == "") {

            error.innerHTML =
                "Please select a time.";

            return false;
        }


        // ----------------------------------------------------
        // GET SYMPTOMS
        // ----------------------------------------------------

        var checkboxes =
            document.getElementsByName(
                "symptom"
            );

        var symptoms = [];

        for (
            var i = 0;
            i < checkboxes.length;
            i++
        ) {

            if (
                checkboxes[i].checked
            ) {

                if (
                    checkboxes[i].value !=
                    "None of these"
                ) {

                    symptoms.push(
                        checkboxes[i].value
                    );
                }
            }
        }


        if (symptoms.length == 0) {

            error.innerHTML =
                "Please select at least one symptom.";

            return false;
        }


        // ----------------------------------------------------
        // SEND SYMPTOMS TO JAVA
        // ----------------------------------------------------

        fetch(
            "http://localhost:8080/symptoms",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "text/plain"
                },

                body:
                    symptoms.join(",")
            }
        )

        .then(
            function(response) {

                return response.json();
            }
        )

        .then(
            function(data) {

                console.log(
                    "Java symptom response:",
                    data
                );


                if (data.error) {

                    error.innerHTML =
                        data.error;

                    return;
                }


                if (
                    data.length == 0
                ) {

                    error.innerHTML =
                        "No matching condition found.";

                    return;
                }


                // ------------------------------------------------
                // BEST MATCH
                // ------------------------------------------------

                var bestMatch =
                    data[0];


                // ------------------------------------------------
                // FIND DOCTOR ID FROM JAVA RESPONSE
                // ------------------------------------------------

                var doctorId =
                    bestMatch.doctorId;


                if (
                    doctorId == null
                ) {

                    error.innerHTML =
                        "Doctor ID was not received from Java.";

                    return;
                }


                // ------------------------------------------------
                // GET SLOTS FROM JAVA
                // ------------------------------------------------

                fetch(
                    "http://localhost:8080/slots",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "text/plain"
                        },

                        body:
                            String(doctorId)
                    }
                )

                .then(
                    function(response) {

                        return response.json();
                    }
                )

                .then(
                    function(slots) {

                        console.log(
                            "Available slots:",
                            slots
                        );


                        if (
                            slots.error
                        ) {

                            error.innerHTML =
                                slots.error;

                            return;
                        }


                        if (
                            slots.length == 0
                        ) {

                            error.innerHTML =
                                "No available appointment slots for this doctor.";

                            return;
                        }


                        // ------------------------------------------------
                        // FIND SELECTED SLOT
                        // ------------------------------------------------

                        var selectedSlot =
                            null;


                        for (
                            var i = 0;
                            i < slots.length;
                            i++
                        ) {

                            if (
                                slots[i].slotTime ==
                                time
                            ) {

                                selectedSlot =
                                    slots[i];

                                break;
                            }
                        }


                        // ------------------------------------------------
                        // IF EXACT TIME IS NOT IN MYSQL
                        // ------------------------------------------------

                        if (
                            selectedSlot == null
                        ) {

                            error.innerHTML =
                                "The selected time is not available in the database.";

                            return;
                        }


                        // ------------------------------------------------
                        // BOOK USING JAVA + MYSQL
                        // ------------------------------------------------

                        var bookingData =
                            patient.patient_id +
                            "|" +
                            doctorId +
                            "|" +
                            selectedSlot.slotId;


                        fetch(
                            "http://localhost:8080/bookAppointment",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "text/plain"
                                },

                                body:
                                    bookingData
                            }
                        )

                        .then(
                            function(response) {

                                return response.json();
                            }
                        )

                        .then(
                            function(result) {

                                console.log(
                                    "Booking response:",
                                    result
                                );


                                if (
                                    result.error
                                ) {

                                    error.innerHTML =
                                        result.error;

                                    return;
                                }


                                if (
                                    result.success !=
                                    true
                                ) {

                                    error.innerHTML =
                                        "Appointment could not be booked.";

                                    return;
                                }


                                // ------------------------------------------------
                                // SAVE LATEST APPOINTMENT LOCALLY
                                // FOR RECEIPT DISPLAY
                                // ------------------------------------------------

                                var appointment = {

                                    patientId:
                                        patient.patient_id,

                                    patientName:
                                        patient.name,

                                    patientLoginName:
                                        patient.loginName,

                                    doctor:
                                        bestMatch.doctor,

                                    doctorId:
                                        doctorId,

                                    time:
                                        selectedSlot.slotTime,

                                    date:
                                        selectedSlot.slotDate,

                                    symptoms:
                                        symptoms.join(", "),

                                    specialist:
                                        bestMatch.specialist,

                                    matchedSymptoms:
                                        bestMatch.matches,

                                    status:
                                        "Booked",

                                    receiptNumber:
                                        result.receiptNumber
                                };


                                localStorage.setItem(
                                    "latestAppointment",
                                    JSON.stringify(
                                        appointment
                                    )
                                );


                                // ------------------------------------------------
                                // SHOW SUCCESS
                                // ------------------------------------------------

                                alert(
                                    "Appointment booked successfully.\n\n" +
                                    "Receipt Number: " +
                                    result.receiptNumber +
                                    "\n\nDoctor: " +
                                    bestMatch.doctor +
                                    "\nSpecialist: " +
                                    bestMatch.specialist +
                                    "\nDate: " +
                                    selectedSlot.slotDate +
                                    "\nTime: " +
                                    selectedSlot.slotTime
                                );


                                showReceipt();

                            }
                        )

                        .catch(
                            function(error) {

                                console.log(
                                    "Booking connection error:",
                                    error
                                );

                                error =
                                    document.getElementById(
                                        "appointmentError"
                                    );

                                error.innerHTML =
                                    "Could not connect to Java booking server.";

                            }
                        );

                    }
                )

                .catch(
                    function(error) {

                        console.log(
                            "Slot connection error:",
                            error
                        );

                        error.innerHTML =
                            "Could not get doctor availability from Java server.";

                    }
                );

            }
        )

        .catch(
            function(error) {

                console.log(
                    "Java connection error:",
                    error
                );

                error.innerHTML =
                    "Could not connect to Java server. Make sure MedicalServer is running.";

            }
        );


        return false;
    };
}


// ============================================================
// SHOW RECEIPT
// ============================================================

function showReceipt() {

    var appointment =
        JSON.parse(
            localStorage.getItem(
                "latestAppointment"
            )
        );

    var patient =
        JSON.parse(
            localStorage.getItem(
                "loggedInPatient"
            )
        );

    if (
        appointment == null ||
        patient == null
    ) {

        showPatientDashboard();

        return;
    }

    showPage(
        "receiptPage"
    );


    var receiptNumber =
        document.getElementById(
            "receiptNumber"
        );

    if (receiptNumber != null) {

        receiptNumber.innerHTML =
            appointment.receiptNumber;
    }


    var receiptPatient =
        document.getElementById(
            "receiptPatient"
        );

    if (receiptPatient != null) {

        receiptPatient.innerHTML =
            patient.name;
    }


    var receiptDoctor =
        document.getElementById(
            "receiptDoctor"
        );

    if (receiptDoctor != null) {

        receiptDoctor.innerHTML =
            appointment.doctor;
    }


    var receiptTime =
        document.getElementById(
            "receiptTime"
        );

    if (receiptTime != null) {

        receiptTime.innerHTML =
            appointment.time;
    }


    var receiptSymptoms =
        document.getElementById(
            "receiptSymptoms"
        );

    if (receiptSymptoms != null) {

        receiptSymptoms.innerHTML =
            appointment.symptoms;
    }


    var receiptStatus =
        document.getElementById(
            "receiptStatus"
        );

    if (receiptStatus != null) {

        receiptStatus.innerHTML =
            appointment.status;
    }


    // Display date if the HTML has a receipt date element

    var receiptDate =
        document.getElementById(
            "receiptDate"
        );

    if (
        receiptDate != null &&
        appointment.date != null
    ) {

        receiptDate.innerHTML =
            appointment.date;
    }
}


// ============================================================
// MY APPOINTMENT
// ============================================================

function showMyAppointment() {

    var patient =
        JSON.parse(
            localStorage.getItem(
                "loggedInPatient"
            )
        );

    if (patient == null) {

        showPage("loginPage");

        return;
    }

    showPage(
        "myAppointmentPage"
    );


    var area =
        document.getElementById(
            "patientAppointmentDetails"
        );

    if (area == null) {
        return;
    }

    area.innerHTML = "";


    /*
     * The actual appointment is now stored in MySQL.
     * The latest appointment is displayed from localStorage
     * until a Java /appointments endpoint is added.
     */

    var latestAppointment =
        JSON.parse(
            localStorage.getItem(
                "latestAppointment"
            )
        );


    if (
        latestAppointment == null ||
        latestAppointment.patientId !=
        patient.patient_id
    ) {

        area.innerHTML =
            "<p>No appointment found.</p>";

        return;
    }


    var div =
        document.createElement(
            "div"
        );

    div.className =
        "doctorBox";


    div.innerHTML =

        "<b>Receipt Number:</b> " +
        latestAppointment.receiptNumber +
        "<br><br>" +

        "<b>Doctor:</b> " +
        latestAppointment.doctor +
        "<br><br>" +

        "<b>Date:</b> " +
        (latestAppointment.date || "Not available") +
        "<br><br>" +

        "<b>Time:</b> " +
        latestAppointment.time +
        "<br><br>" +

        "<b>Specialist:</b> " +
        latestAppointment.specialist +
        "<br><br>" +

        "<b>Symptoms:</b> " +
        latestAppointment.symptoms +
        "<br><br>" +

        "<b>Status:</b> " +
        latestAppointment.status;


    area.appendChild(
        div
    );
}


// ============================================================
// PATIENT LOGOUT
// ============================================================

function patientLogout() {

    localStorage.removeItem(
        "loggedInPatient"
    );

    showPage(
        "loginPage"
    );
}


// ============================================================
// DOCTOR DASHBOARD
// ============================================================

function showDoctorDashboard() {

    var doctor =
        JSON.parse(
            localStorage.getItem(
                "loggedInDoctor"
            )
        );

    if (doctor == null) {

        showPage(
            "loginPage"
        );

        return;
    }

    showPage(
        "doctorDashboardPage"
    );


    var welcome =
        document.getElementById(
            "doctorWelcome"
        );

    if (welcome != null) {

        welcome.innerHTML =
            doctor.name;
    }


    var department =
        document.getElementById(
            "doctorDepartmentWelcome"
        );

    if (department != null) {

        department.innerHTML =
            doctor.department;
    }


    var specialization =
        document.getElementById(
            "doctorSpecializationWelcome"
        );

    if (specialization != null) {

        specialization.innerHTML =
            doctor.specialization;
    }
}


// ============================================================
// DOCTOR - VIEW PATIENTS
// ============================================================

function showDoctorPatients() {

    var doctor =
        JSON.parse(
            localStorage.getItem(
                "loggedInDoctor"
            )
        );

    if (doctor == null) {

        showPage(
            "loginPage"
        );

        return;
    }

    showPage(
        "doctorPatientsPage"
    );


    var patients =
        JSON.parse(
            localStorage.getItem(
                "patients"
            )
        );

    if (patients == null) {
        patients = [];
    }


    var table =
        document.getElementById(
            "patientTable"
        );

    if (table == null) {
        return;
    }

    table.innerHTML = "";


    for (
        var i = 0;
        i < patients.length;
        i++
    ) {

        var row =
            table.insertRow();

        row.insertCell(0).innerHTML =
            patients[i].name;

        row.insertCell(1).innerHTML =
            patients[i].phone;

        row.insertCell(2).innerHTML =
            patients[i].familyName;

        row.insertCell(3).innerHTML =
            patients[i].familyPhone;
    }
}


// ============================================================
// DOCTOR - VIEW APPOINTMENTS
// ============================================================

function showDoctorAppointments() {

    var doctor =
        JSON.parse(
            localStorage.getItem(
                "loggedInDoctor"
            )
        );

    if (doctor == null) {

        showPage(
            "loginPage"
        );

        return;
    }

    showPage(
        "doctorAppointmentsPage"
    );


    var appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        );

    if (appointments == null) {
        appointments = [];
    }


    var table =
        document.getElementById(
            "appointmentTable"
        );

    if (table == null) {
        return;
    }

    table.innerHTML = "";


    var found = false;


    for (
        var i = 0;
        i < appointments.length;
        i++
    ) {

        if (
            appointments[i].doctor ==
            doctor.name
        ) {

            found = true;

            var row =
                table.insertRow();

            row.insertCell(0).innerHTML =
                appointments[i].patientName;

            row.insertCell(1).innerHTML =
                appointments[i].doctor;

            row.insertCell(2).innerHTML =
                appointments[i].time;

            row.insertCell(3).innerHTML =
                appointments[i].symptoms;

            row.insertCell(4).innerHTML =
                appointments[i].status;


            var actionCell =
                row.insertCell(5);


            // APPROVE BUTTON

            var approveButton =
                document.createElement(
                    "button"
                );

            approveButton.innerHTML =
                "Approve";

            approveButton.setAttribute(
                "data-index",
                i
            );

            approveButton.onclick =
                function () {

                    approveAppointment(
                        parseInt(
                            this.getAttribute(
                                "data-index"
                            )
                        )
                    );

                };

            actionCell.appendChild(
                approveButton
            );


            // CANCEL BUTTON

            var cancelButton =
                document.createElement(
                    "button"
                );

            cancelButton.innerHTML =
                "Cancel";

            cancelButton.setAttribute(
                "data-index",
                i
            );

            cancelButton.onclick =
                function () {

                    cancelDoctorAppointment(
                        parseInt(
                            this.getAttribute(
                                "data-index"
                            )
                        )
                    );

                };

            actionCell.appendChild(
                cancelButton
            );
        }
    }


    if (found == false) {

        var row =
            table.insertRow();

        var cell =
            row.insertCell(0);

        cell.colSpan = 6;

        cell.innerHTML =
            "No appointments found.";
    }
}


// ============================================================
// APPROVE APPOINTMENT
// ============================================================

function approveAppointment(index) {

    var appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        );

    if (
        appointments == null ||
        appointments[index] == null
    ) {
        return;
    }

    appointments[index].status =
        "Approved";

    localStorage.setItem(
        "appointments",
        JSON.stringify(
            appointments
        )
    );

    updateLatestAppointment(
        appointments[index]
    );

    alert(
        "Appointment approved."
    );

    showDoctorAppointments();
}


// ============================================================
// CANCEL DOCTOR APPOINTMENT
// ============================================================

function cancelDoctorAppointment(index) {

    var appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        );

    if (
        appointments == null ||
        appointments[index] == null
    ) {
        return;
    }


    if (
        confirm(
            "Are you sure you want to cancel this appointment?"
        )
    ) {

        appointments[index].status =
            "Cancelled";

        localStorage.setItem(
            "appointments",
            JSON.stringify(
                appointments
            )
        );

        updateLatestAppointment(
            appointments[index]
        );

        alert(
            "Appointment cancelled."
        );

        showDoctorAppointments();
    }
}


// ============================================================
// UPDATE RECEIPT
// ============================================================

function updateLatestAppointment(
    appointment
) {

    var latest =
        JSON.parse(
            localStorage.getItem(
                "latestAppointment"
            )
        );

    if (
        latest != null &&
        latest.receiptNumber ==
        appointment.receiptNumber
    ) {

        localStorage.setItem(
            "latestAppointment",
            JSON.stringify(
                appointment
            )
        );
    }
}


// ============================================================
// DOCTOR LOGOUT
// ============================================================

function doctorLogout() {

    localStorage.removeItem(
        "loggedInDoctor"
    );

    showPage(
        "loginPage"
    );
}


// ============================================================
// TEST JAVA SERVER
// ============================================================

function testJavaServer() {

    fetch(
        "http://localhost:8080/symptoms",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "text/plain"
            },

            body:
                "2,1,5"
        }
    )

    .then(
        function(response) {

            return response.json();
        }
    )

    .then(
        function(data) {

            console.log(
                "Java server response:"
            );

            console.log(data);

            alert(
                "Java server connected successfully!"
            );

        }
    )

    .catch(
        function(error) {

            console.log(
                "Java connection error:"
            );

            console.log(error);

            alert(
                "Could not connect to Java server."
            );

        }
    );
}
```
