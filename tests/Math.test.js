const { calcTip, fahrenheitToCelsius, celsiusToFahrenheit } = require('../src/math')

// test('should calculate tip', () => {
//     const total = calcTip(10, .3)
//     expect(total).toBe(13)
// })

// test('should calculate tip with default value', () => {
//     const total = calcTip(10)
//     expect(total).toBe(12.5)
// })

// test('Should convert 32F to 0 C', () => {
//     const answer = fahrenheitToCelsius(32)
//     expect(answer).toBe(0)
// })
// test('Should convert 0 C to 32F', () => {
//     const answer = celsiusToFahrenheit(0)
//     expect(answer).toBe(32)
// })

test('async', (done) => {
    setTimeout(() => {
        expect(2).toBe(2)
    }, 2000);
})