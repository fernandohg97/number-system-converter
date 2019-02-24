// Class Validation
// Contains validation methods for each numerical system
export class Validation {

   static validateDecimal(input) {

    // Create an instance error with specified message
    const err = new Error('You must enter an integer value')

    // In case input is not a number or is a decimal number or is empty
    if (isNaN(input) || (input % 1 != 0) || input === '') { 
      return err
    } else if (input <= 0) {  // In case is a negative number
      err.message = 'You must enter a numeric value greater than cero'
      return err
    }
  }
  
  static validateBinary(input) {

    // Create an instance error with specified message
    const err = new Error('You must enter a binary number')

    // Validating each number is between 0 and 1
    let isValid = input.split('').every(function(el) {
      return el >= 0 && el < 2 
    })
  
    if (!isValid) { return err }
  }

  static validateOctal(input) {

    // Create an instance error with specified message
    const err = new Error('You must enter an octal number')
    
    if (isNaN(input) || (input % 1 != 0) || input === '') { // Validating number is not string, decimal or empty
      err.message = 'You must enter an integer value'
      return err
    } else if (!input.split('').every(function(el) { return el >= 0 && el < 8  })) { // Validation each number is between 0 and 7
      return err
    }
  }
}
