import { Validation } from '../validation/systemValidation.mjs'

// Decimal to Binary logic function
export default function toBinary(number, callback) {

  const err = Validation.validateDecimal(number)

  if (err) { return callback(err) }

  let binaryNumber = []
  let residue

  while (number != 0) {
    residue = Math.floor(number % 2)
    binaryNumber.push(residue)
    number = Math.floor(number / 2)
  }
  return callback(null, binaryNumber.reverse().join(''))
}
