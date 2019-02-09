const option1 = 'Binary to Decimal' // Option one button conversion
const option2 = 'Decimal to Binary' // Option two button conversion

// Get HTML elements and assign it to a variable
let btnChangeSystem = document.getElementById('changeSystem')
let userInput = document.getElementById('userInput')
let btnConverter = document.getElementById('btnConversion')
let outputNumber = document.getElementById('outputNumber')
let flashMessage = document.getElementById('flashMessage')
let resetBtn = document.getElementById('resetBtn')

// Handle reset button to set input to empty or null values and hide flash messages
resetBtn.addEventListener('click', function onReset(e) {  
  // In case the input fields have been filled
  if (userInput.innerHTML != ' ' || outputNumber.innerHTML != ' ' || flashMessage.style.display == 'block') {
    userInput.value = outputNumber.value = flashMessage.innerHTML = null
    flashMessage.style.display = 'none'
  }
  e.preventDefault()
})

// Set variable option1 as default value to change button converter
btnChangeSystem.innerHTML = option1

// Handle event listener when change numeric system button is click
btnChangeSystem.addEventListener('click', changeNumericSystem)

// Handler for onclick event for button converter
function changeNumericSystem(e) {
  console.log(e);
  // In case button change converter is option1
  if (btnChangeSystem.innerHTML === option1) {
    btnChangeSystem.innerHTML = option2
    userInput.value = outputNumber.value = null
    userInput.placeholder = 'Enter a binary number'
  } else { // In case button change converter is option2
    btnChangeSystem.innerHTML = option1
    userInput.value = outputNumber.value = null
    userInput.placeholder = 'Enter a decimal number'
  }
}

// Handle event listener when conversion button is click
btnConverter.addEventListener('click', function () {
  btnChangeSystem.innerHTML === option1 ? toBinary(userInput.value, onConversion) : toDecimal(userInput.value, onConversion)
  
})


// Validate user input value function
function validateInput(input) {
  // In case input is not a number or is a decimal number
  if (isNaN(input) || (input % 1 != 0) || input === '') {    
    flashMessage.innerHTML = 'You must enter an integer value'
    flashMessage.style.display = 'block'
    throw new Error('You must enter an integer value')
  } else if (input <= 0) {    
    flashMessage.innerHTML = 'You must enter a numeric value greater than cero'
    flashMessage.style.display = 'block'
    // flashMessage.style.backgroundColor = 'red'
    throw new Error('You must enter a numeric value greater than cero')
  }
}

// Callback function
function onConversion(err, result) {
  if (err) {
    console.log('Hubo un error: ' + err)
    return
  }
  outputNumber.value = result
  console.log(`The result is: ${result}`)
}

// Decimal to Binary logic function
function toBinary(number, callback) {

  validateInput(number) 

  let binaryNumber = []

  while (number != 0) {
    residuo = Math.floor(number % 2)
    binaryNumber.push(residuo)
    number = Math.floor(number / 2)
  }
  callback(null, binaryNumber.reverse().join(''))
}

// Binary to Decimal logic function
function toDecimal(number, callback) {

  validateInput(number)
  
  let inputLength = number.length // Get length of the user input
  let binaryArray = number.split('').map(e => Number(e)) // Save user input value into an array
  console.log(binaryArray);
  
  let potentialNumbers = [] // Define an array for potential numbers

  // Loop to create the potential numbers an push them into the array created
  for (let index = 0; index < inputLength; index++) {
    let element = Math.pow(2, index)
    potentialNumbers.push(element)
  }

  potentialNumbers = potentialNumbers.reverse() // Invert the array

  let sum = 0; // Define sum variable
  
  // Loop through the binary number to evaluate
  binaryArray.forEach((element, index) => {
    // In case an element is one, sum the corresponding potential number value
    if (element == 1) {
      sum += potentialNumbers[index];
    }
  });

  callback(null, sum)  
  
}

// TODO:
// Create binary to decimal algorithm
