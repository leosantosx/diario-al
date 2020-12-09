import parse from 'json-parser'

const images = "{\"https://diario-al.s3.amazonaws.com/b63c42aa0fa931f0f44c-tumblr.jpg\",\"https://diario-al.s3.amazonaws.com/e15b1ea1c6ce7c3ca260-profile.jpg\"}"

// images = images.split(',').replace('{', '')
// console.log(images);
const json = parse(images)
console.log(json)