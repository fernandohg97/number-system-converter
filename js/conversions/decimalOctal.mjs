import { Validation } from '../validation/systemValidation.mjs'

// Decimal to Octal logic function
export default function toOctal(number, callback) {

  const err = Validation.validateDecimal(number)

  if (err) { return callback(err) }

  let octalNumber = []
  let residue

  while (number != 0) {
    residue = Math.floor(number % 8)
    octalNumber.push(residue)
    number = Math.floor(number / 8)
  }
  return callback(null, octalNumber.reverse().join(''))
}
