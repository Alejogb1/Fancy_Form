// Question Array
const questions = [
    { question: 'Enter Your First Name'},
    { question: 'Enter Your Last Name'},
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create a password', type: 'password'}
];
// Transition Times
const shakeTime = 100; //Shake Transition Time 
const switchTime = 200; // Transition Between Questions

// Init Position At  First Question
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progress = document.querySelector('#progress-bar');


// EVENTS
// Get Question On DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
nextBtn.addEventListener('click', validate);

// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if (e.keyCode == 13) {
    validate();
  }
});

// FUNCTIONS
   
// Get Question from array & Add To Markup
function getQuestion(){
 // Get current Question    
  inputLabel.innerHTML = questions[position].question;
 //Get Current Type
  inputField.type = questions[position].type || 'text';
  // Get Current Answer 
  inputField.value = questions[position].answer || '';
  // Focus Element
  inputField.focus();

  // Set Progress Bar width - Varaible to the questions length
  progress.style.width = (position * 100) / questions.length + '%';
  // Add User Icon or Arrow 
  prevBtn.className = position ? 'fas fa-arrow-left' : 'fas fa-user';
  
  showQuestion();

}
 // Display Question To User
 function showQuestion() {
     inputGroup.style.opacity = 1;
     inputProgress.style.transiton = '';
     inputProgress.style.width = '100%';
 }
 //  Hide Question From User
 function hideQuestion(){
     inputGroup.style.opacity = 0;
     inputProgress.style.width = 0;
     inputLabel.style.marginLeft = 0;
     inputProgress.style.transiton = "none";
     inputGroup.style.border = null;
 }
// Transform to Create Shake Motion
function transform(x, y) {
    console.log(x, y);
    formBox.style.transform = `translate(${x}px, ${y}px)`;
  }
  
  // Validate Field
function validate() {
    //Make Sure Pattern Matches
    if (!inputField.value.match(questions[position].pattern || /.+/)) {
        inputFail();
    } else {
        inputPass();
    }
}

// Field Input Fail
function inputFail() {
    formBox.className = "error";
    // Repeat Shake Motion
    for(let i = 0; i < 6; i++) {
       setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
       setTimeout(transform, shakeTime * 6, 0, 0);
       inputField.focus();
    }
}
// Field Input Passed
function inputPass(){
    formBox.className = "";
    setTimeout(transform, shakeTime * 0, 0, 10);
    setTimeout(transform, shakeTime * 1, 0, 0);
     questions[position].answer = inputField.value;
    // Increment Position
    position++;
    // If New Question, Hide Current and Get Next
    if(questions[position]) {
        hideQuestion();
        getQuestion();
    } else {
        // Remove If no more QUESTIONs
        hideQuestion();
        formBox.className = "close";
        progress.style.width = "100%";

        // Form Complete
        formComplete();
    }
}

//