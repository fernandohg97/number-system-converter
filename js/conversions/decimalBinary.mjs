import { Validation } from '../validation/systemValidation.mjs'

// Decimal to Binary logic function
export default function toBinary(number, callback) {

  Validation.validateDecimal(number)

  let binaryNumber = []
  let residue

  while (number != 0) {
    residue = Math.floor(number % 2)
    binaryNumber.push(residue)
    number = Math.floor(number / 2)
  }
  callback(null, binaryNumber.reverse().join(''))
}
