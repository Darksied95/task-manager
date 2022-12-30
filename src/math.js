function calcTip(amount, tipPercentage = .25) {
    const tip = amount * tipPercentage
    return tip + amount
}


function fahrenheitToCelsius(temp) {
    return (temp - 32) / 1.8
}
function celsiusToFahrenheit(temp) {
    return (temp * 1.8) + 32
}


module.exports = {
    calcTip,
    fahrenheitToCelsius,
    celsiusToFahrenheit
}