const firebaseConfig = {
  apiKey: "AIzaSyBoV9VwI8YJNKekt7zuRCpUx5z6h2xHIo4",
  authDomain: "contactform-gym.firebaseapp.com",
  databaseURL: "https://contactform-gym-default-rtdb.firebaseio.com",
  projectId: "contactform-gym",
  storageBucket: "contactform-gym.appspot.com",
  messagingSenderId: "54907178937",
  appId: "1:54907178937:web:69e17e3ed780ee4565b068",
};


function bmi() {
  const height = parseInt(document.getElementById('height').value)
  const weight = parseInt(document.getElementById('weight').value)
  const bmi = weight / ((height / 100) * (height / 100));
  let n = bmi.toFixed(2);
  document.getElementById('bmi').innerHTML = n;
  var pdfUrl = "";
  if (bmi < 0) {
    alert("Please enter a valid value")
    document.getElementById('bmi').innerHTML = "Invalid"
  }
  else if (bmi < 18.5) {
    pdfUrl = 'WeightGain.pdf'
  }
  else if (bmi > 25) {
    pdfUrl = 'WeightLoss.pdf'
  }
  else {
    pdfUrl = 'NormalWeight.pdf'
  }

  if (bmi > 0) {
    window.open(pdfUrl, '_blank');
  }
}



firebase.initializeApp(firebaseConfig);

var contactFormDB = firebase.database().ref("contactForm");

document.getElementById('contactForm').addEventListener('submit', submitForm);


function submitForm(e) {
  e.preventDefault();

  var emailid = getElementVal("emailid");
  var phonenum = getElementVal("phonenum");
  var msgContent = getElementVal("msgContent");

  saveMessages(emailid, phonenum, msgContent);

 
  document.querySelector(".alert").style.display = "block";

  
  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  
  document.getElementById("contactForm").reset();
}

const saveMessages = (emailid, phonenum, msgContent) => {
  var newContactForm = contactFormDB.push();

  newContactForm.set({
    emailid: emailid,
    phonenum: phonenum,
    msgContent: msgContent,
  });
};

const getElementVal = (id) => {
  return document.getElementById(id).value;
};
