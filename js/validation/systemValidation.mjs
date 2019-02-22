// Validate user input value function

export class Validation {

   static validateDecimal(input) {
    setTimeout(function () {
      flashMessage.style.display = 'none'
    }, 4000)   
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
  
  static validateBinary(input) {

    // Validating each number is between 0 and 1
    let isValid = input.split('').every(function(el) {
      return el >= 0 && el < 2 
    })
  
    if (!isValid) { 
      setTimeout(function () {
        flashMessage.style.display = 'none'
      }, 4000) // After 4 seconds hide the flash message

      flashMessage.innerHTML = 'You must enter a binary number'
      flashMessage.style.display = 'block'
      throw new Error('You must enter a binary number')
    }
  }
} 
