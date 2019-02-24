import { Validation } from '../validation/systemValidation.mjs'

// Binary to Decimal logic function
export default function toDecimal(number, callback) {

  const err = Validation.validateBinary(number)

  if (err) { return callback(err) }
  
  let inputLength = number.length // Get length of the user input
  let binaryArray = number.split('').map(e => Number(e)) // Save user input value into an array
  
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

  
  return callback(null, sum)
  
}

