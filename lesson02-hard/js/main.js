let num = 266219; 
let result = 1;

for (let i = 0; i < 6; i++) {
  if (num > 0) {
    let unit = Math.floor(num % 10);

    result *= unit;
    Math.floor(num /= 10);

  } else {
    console.log('Error: num должно быть положительным');
  }
}

console.log(result);

result **= 3;

console.log('Первая цифра: ', result.toString()[0],
            '\nВторая цифра: ', result.toString()[1]);