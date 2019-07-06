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
 document.addEventListener('DOMcontentLoaded', getQuestion);
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

