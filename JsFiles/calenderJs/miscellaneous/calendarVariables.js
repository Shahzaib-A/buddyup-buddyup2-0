
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturaday"]
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var daysOfMonth = {
  'January': [31],
  "February": [28, 29],
  "March": [31],
  "April": [30],
  "May": [31],
  "June": [30],
  "July": [31],
  "August": [31],
  "September": [30],
  "October": [31],
  "November": [30],
  "December": [31]
}
dateObj = new Date();
let currentDate = [months[dateObj.getMonth()], dateObj.getFullYear(), dateObj.getDate()]
let allEvents = []
let updatednew = false
/*

//Planned on changing color for each month, but it did not work )=
var images = [
  "december january february",
  ["../images/winterPics/w1.jpg", "../images/winterPics/w2.jpg", "../images/winterPics/w3.jpg", [
    ["black","black","black","black","black","black"],
    ["white","white","white","black","black","black"],
    ["white","white","white","white","white","white"]
  ]],
  "march april may",
  ["../images/springPics/s1.jpg", "../images/springPics/s2.jpeg", "../images/springPics/s3.png", [
    ["white","white","white","black","black","white"],
    ["black","black","black","black","black","black"],
    ["white","white","white","black","black","white"]
  ]],
  "june july august",
  ["../images/summerPics/sm1.jpg", "../images/summerPics/sm2.jpg", "../images/summerPics/sm3.jpg", [
    ["black","black","black","black","black","black"],
    ["black","black","black","black","black","black"],
    ["black","black","black","black","black","black"]
  ]],
  "september october november",
  ["../images/fallPics/f1.jpg", "../images/fallPics/f2.jpg", "../images/fallPics/f3.jpeg", [
    ["white","white","white","black","black","white"],
    ["black","black","black","black","black","black"],
    ["white","white","white","white","white","white"]
  ]]
]

var subject = ["physics", "math", "computer-science", "science", "earth", "biology", "chemistry", "earth and space science"]
var active_user = sessionStorage.getItem('username')
