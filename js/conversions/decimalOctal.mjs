import { Validation } from '../validation/systemValidation.mjs'

// Decimal to Octal logic function
export default function toOctal(number, callback) {

  Validation.validateDecimal(number)

  let octalNumber = []
  let residue

  while (number != 0) {
    residue = Math.floor(number % 8)
    octalNumber.push(residue)
    number = Math.floor(number / 8)
  }
  callback(null, octalNumber.reverse().join(''))
}
