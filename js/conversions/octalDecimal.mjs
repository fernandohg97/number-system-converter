import { Validation } from '../validation/systemValidation.mjs'

export default function octal2Decimal(number, callback) {

    const err = Validation.validateOctal(number)
    
    if (err) { return callback(err) }

    let numArray = number.split('').map(e => Number(e))
    let potentialNumbers = []

    let index = numArray.length - 1;
    let sum = 0
    for (let i = 0; i < numArray.length; ++i) {
      let item = numArray[i] * Math.pow(8, index--)
      sum += item
    }
  
    return callback(null, sum)
  }
