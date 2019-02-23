import numericalSystem from './selectMenu.mjs'
import toDecimal from './conversions/decimalBinary.mjs'
import toBinary from './conversions/binaryDecimal.mjs'
import toOctal from './conversions/decimalOctal.mjs'


// Get HTML elements and assign it to a variable
// let btnChangeSystem = document.getElementById('fromOption')
let userInput = document.getElementById('userInput')
let btnConverter = document.getElementById('btnConversion')
let outputNumber = document.getElementById('outputNumber')
let flashMessage = document.getElementById('flashMessage')


// Handle reset button to set input to empty or null values and hide flash messages
btnConverter.addEventListener('click', function onReset(e) {  
  // In case the input fields have not been filled
  if (userInput.value === '' || !numericalSystem.from || !numericalSystem.to) {
    console.log(userInput.value);
    console.log(numericalSystem.from);
    console.log(numericalSystem.to);
    
    
    setTimeout(function () {
      flashMessage.style.display = 'none'
    }, 4000) // After 4 second close the flash message

    flashMessage.innerHTML = 'Fill the required fields'
    flashMessage.style.display = 'block'

  } else {

    if (numericalSystem.from == 'Decimal' && numericalSystem.to == 'Binary') {
      toDecimal(userInput.value, onConversion) // Execute Decimal to Binary algorithm
    } else if (numericalSystem.from == 'Binary' && numericalSystem.to == 'Decimal') {
      toBinary(userInput.value, onConversion) // Execute Binary to Decimal algorithm
    } else if (numericalSystem.from == 'Decimal' && numericalSystem.to == 'Octal') {
      toOctal(userInput.value, onConversion) // Execute Decimal to Octal algorithm
    } else {
      setTimeout(function () {
        flashMessage.style.display = 'none'
      }, 4000) // After 4 seconds close the flash message

      flashMessage.innerHTML = 'Please select two different numerical systems'
      flashMessage.style.display = 'block'
    }

  }
  e.preventDefault()
})

// Callback function
function onConversion(err, result) {
  if (err) {
    setTimeout(function () {
      flashMessage.style.display = 'none'
    }, 4000) // After 4 seconds close the flash message

    // Display in the html document the flash error message
    flashMessage.innerHTML = 'Oops! There was an error calculating the result'
    flashMessage.style.display = 'block'

    console.log('Hubo un error: ' + err) // Print in console
    return
  }
  // Show in the html document the result
  outputNumber.style.display = 'block'
  outputNumber.innerHTML = result

  setTimeout(function() {
    outputNumber.style.display = 'none'
    outputNumber.innerHTML = null
  }, 10000) // After 10 seconds close the result message

  console.log(`The result is: ${result}`)
}







