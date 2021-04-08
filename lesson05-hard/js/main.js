//Первое задание
const arr = ['4234', '5234', '211132456', '654456', '40000', '546676', '205432'];

for (let i = 0; i < arr.length; i++) {
  if (arr[i].slice(0, 1) === '4' || arr[i].slice(0, 1) === '2') {
    console.log(arr[i]);
  }
}

//Второе задание
for (let i = 2; i <= 100; i++) {
  let print = 1;
  for (let j = 2; (j <= Math.sqrt(i)) && (print === 1); j++) {
    if (i % j === 0) print = 0;
  }
  if (print === 1) console.log(`Делители числа ${i}: 1 и ${i}`);
}