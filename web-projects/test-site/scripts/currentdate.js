

//day names array
const daynames = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];

//Long months names array
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];

const options = {weekday: 'long', day: 'numeric', month: 'long', year:'numeric'};
document.getElementById('currentdate').textContent = new Date().toLocaleDateString('en-US', options);


let newParagraph = document.createElement('p');
newParagraph.textContent = 'This is my paragraph.';
document.querySelector('div').appendChild(newParagraph);
document.querySelector('img').classList.add('add_border');


// Repetition

function makeList(item){
    document.querySelector('div').innerHTML += `<li> ${item} </li>`
}

const myArray = ['CSE121b', 'WDD230'];

myArray.forEach(makeList);

