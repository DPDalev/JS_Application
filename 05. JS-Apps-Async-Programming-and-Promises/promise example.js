console.log('Before promise');
let p = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('done');
    }, 2000);
})
    .then(function(result) {
        console.log('Then returned: ' + result);
    });
console.log('After promise');
for (let i = 0; i < 1000000; i++) {

}