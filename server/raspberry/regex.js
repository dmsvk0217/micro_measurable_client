const value = "1/-6/-10/14/9/0.04/남동/8";
const value1 = "1/-6/-10/14";

const regexPattern = /^(-?\d+\/){5}-?\d+$/;
console.log(regexPattern.test(value1));
