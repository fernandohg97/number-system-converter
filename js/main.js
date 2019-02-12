
// Get HTML elements and assign it to a variable
let btnChangeSystem = document.getElementById('fromOption')
let userInput = document.getElementById('userInput')
let btnConverter = document.getElementById('btnConversion')
let outputNumber = document.getElementById('outputNumber')
let flashMessage = document.getElementById('flashMessage')


// -------------------------------------------
let conversion = {}
let x, i, j, selElmnt, a, b, c;
/*look for any elements with the class "select-menu":*/
x = document.getElementsByClassName('select-menu')
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        
        let y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        console.log(s.getAttribute('name'));
        
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            if (s.getAttribute('name') == 'fromMenu') {
              conversion.from = s.options[i].innerHTML
            } else {
              conversion.to = s.options[i].innerHTML
            }
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            
            y = this.parentNode.getElementsByClassName("same-as-selected");
            console.log(y);
            
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  let x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
  
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

// --------------------------------

// Handle reset button to set input to empty or null values and hide flash messages
btnConverter.addEventListener('click', function onReset(e) {  
  // In case the input fields have been filled
  if (userInput.value === '' || !conversion.from || !conversion.to) {
    setTimeout(function () {
      flashMessage.style.display = 'none'
    }, 4000)
    flashMessage.innerHTML = 'Fill the required fields'
    flashMessage.style.display = 'block'
  } else {
    if (conversion.from == 'Decimal' && conversion.to == 'Binary') {
      toBinary(userInput.value, onConversion)
    } else if (conversion.from == 'Binary' && conversion.to == 'Decimal') {
      toDecimal(userInput.value, onConversion)
    } else {
      setTimeout(function () {
        flashMessage.style.display = 'none'
      }, 4000)
      flashMessage.innerHTML = 'Please select two different numerical systems'
      flashMessage.style.display = 'block'
    }
  }
  e.preventDefault()
})


// NUMERICAL SYSTEMS ALGORITHMS

// Validate user input value function
function validateInput(input) {
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

// Callback function
function onConversion(err, result) {
  if (err) {
    console.log('Hubo un error: ' + err)
    return
  }
  outputNumber.style.display = 'block'
  outputNumber.innerHTML = result
  setTimeout(function() {
    outputNumber.style.display = 'none'
    outputNumber.innerHTML = null
  }, 10000)
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




