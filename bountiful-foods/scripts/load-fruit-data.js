const requestURL = "content/fruit.json";

const drinkNutritionTable = document.getElementById("drink-nutrition-table-id");
const drinkTable = document.getElementById("drink-list-table-id");
const drinkTableScrollableDiv = document.getElementById("drink-list-inner-div");
const drinkTableSelected = document.getElementsByClassName("selected");
const drinkQROuterDiv = document.getElementById("drink-qr-outer-div");
const drinkForm = document.getElementById("drink-form");
const drinkFormReset = document.getElementById("drink-form-reset");

const fruit1 = document.getElementById("fruit-1");
const fruit2 = document.getElementById("fruit-2");
const fruit3 = document.getElementById("fruit-3");

const fruitNames = 1;
const carbohydrates = 2;
const fat = 3;
const protein = 4;
const sugar = 5;
const calories = 6;
const grams = 7;
const specialInstructions = 8;
const date = 9;
const email = 10;
const cellPhone = 11;
const userName = 12;

let fruits = null;

fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (jsonObject) {
    fruits = jsonObject;
    fruits.forEach(loadFruitData);
});

function loadFruitData (fruit) {

    let newFruit1 = document.createElement('option');
    let newFruit2 = document.createElement('option');
    let newFruit3 = document.createElement('option');
    newFruit1.innerText = fruit.name;
    newFruit2.innerText = fruit.name;
    newFruit3.innerText = fruit.name;

    fruit1.appendChild(newFruit1);
    fruit2.appendChild(newFruit2);
    fruit3.appendChild(newFruit3);
    
}

//wire up button event
const calculateDrinkButton = document.getElementById("get-drink-info-button");
calculateDrinkButton.onclick = CalculateDrink;

const clearFormButton = document.getElementById("clear-form-button");
// clearFormButton.onmouseup


function CalculateDrink() {

    if (isFormValid()) {

        // carbohydrates, protein, fat, sugar, and calories , names
        const drink_selection = [];
        drink_selection[date] = new Date().getTime();
        drink_selection[fruitNames] = "";
        drink_selection[carbohydrates] = 0;
        drink_selection[protein] = 0;
        drink_selection[fat] = 0;
        drink_selection[sugar] = 0;
        drink_selection[calories] = 0;
        drink_selection[grams] = 0;
        drink_selection[userName] = document.getElementById("user-name").value;
        drink_selection[email] = document.getElementById("email").value;
        drink_selection[cellPhone] = document.getElementById("cell-phone").value;
        drink_selection[specialInstructions] = document.getElementById("special-instructions").value;
        const fruitSelectionList = [fruit1,fruit2, fruit3];
        fruitSelectionList.forEach((item) => {

            if (item.selectedIndex != 0) {
                const currentFruit = fruits[item.selectedIndex - 1];
                const currentCarbs = currentFruit.nutritions.carbohydrates;
                const currentProtein = currentFruit.nutritions.protein;
                const currentFat = currentFruit.nutritions.fat;
                const currentSugar = currentFruit.nutritions.sugar;
                const currentCalories = currentFruit.nutritions.calories;
                
                drink_selection[fruitNames] += currentFruit.name + " ";
                drink_selection[carbohydrates] += (currentCarbs);
                drink_selection[protein] += (currentProtein);
                drink_selection[fat] += (currentFat);
                drink_selection[sugar] += (currentSugar);
                drink_selection[calories] += (currentCalories);
                drink_selection[grams] += (100);

            }
        })

        // adjust values to 450g = 15.9 oz.
        ratio = 450 / drink_selection[grams];
        drink_selection[carbohydrates] = Math.round(drink_selection[carbohydrates] * ratio);
        drink_selection[protein] = Math.round(drink_selection[protein] * ratio);
        drink_selection[fat] = Math.round(drink_selection[fat] * ratio);
        drink_selection[sugar] = Math.round(drink_selection[sugar] * ratio);
        drink_selection[calories] = Math.round(drink_selection[calories] * ratio);
        drink_selection[grams] = Math.round(drink_selection[grams] * ratio);


        //add item to local storage 
        let drinkList = localStorage.drinkList;
        if (drinkList != null) {
            drinkList = JSON.parse(drinkList);
            drinkList.push(drink_selection);
        }
        else {
            drinkList = [drink_selection];
        }
        
        localStorage.drinkList = JSON.stringify(drinkList);
        localStorage.numDrinks = drinkList.length;

        loadDrinkTable();

        //select the last row in the drink table.
        drinkTable.lastChild.click();

        // bring the latest drink into view
        drinkTableScrollableDiv.scrollTo(0,drinkTable.scrollHeight);

        //bring qr code into view
        drinkQROuterDiv.scrollIntoView({behavior: "smooth", block: "end"});
        
        //clear the form
        // drinkFormReset.click();
    }
}

function isFormValid() {


    if (fruit1.selectedIndex != 0) {
                return true;
    } else {
        return false;
    }
}

function loadDrinkTable() {


    let drinkList = [];

    // clear all children
    drinkTable.innerHTML = "";

    // get the drink data
    const drinkObject = localStorage.drinkList 
    if (drinkObject != null) {
        drinkList = JSON.parse(localStorage.drinkList);
    } else {

    }

   // walk each row and create the table
    drinkList.forEach((drink, index) => {
    
        let drinkRow = document.createElement('tr');

        drinkRow.addEventListener("click", function () {
            const rowNumber = parseInt(this.children[0].innerText);
            this.classList.add("selected")
            getSiblings(this).forEach((item) => {
                item.classList.remove("selected");
            });

            loadNutritionData(rowNumber);
            createQR(rowNumber);
        })

        let drinkNumber = document.createElement('td');
        drinkNumber.innerHTML = "<p>" + (index + 1) + "</p>";
    
        let drinkName = document.createElement('td');
        drinkName.innerHTML= "<p>" + drink[fruitNames] + "</p>";
        
        drinkRow.appendChild(drinkNumber);
        drinkRow.appendChild(drinkName);
    
        drinkTable.appendChild(drinkRow);
    
    })
    
}

function loadNutritionData(value) {

    //get the current drink
    let drinkList = JSON.parse(localStorage.drinkList);
    const drink = drinkList[value - 1]

    // if (screen.width < 640) {
    //     drinkNutritionTable.scrollIntoView({behavior: "smooth", block: "end"});
    // }

    drinkDate = new Date(parseInt(drink[date])).toDateString();

    //walk the current drink selection, add data to the table.
    document.getElementById("drink-user-name-cell-id").innerHTML = "<p>" + drink[userName] + "</p>";
    document.getElementById("drink-user-email-cell-id").innerHTML = "<p>" + drink[email] + "</p>";
    document.getElementById("drink-user-phone-cell-id").innerHTML = "<p>" + drink[cellPhone] + "<p>";
    document.getElementById("drink-special-instructions-cell-id").innerHTML = "<p>" + drink[specialInstructions] + "</p>";
    document.getElementById("drink-fruit-names-cell-id").innerHTML = "<p>" + drink[fruitNames]+ "</p>";
    document.getElementById("drink-carbs-cell-id").innerHTML = "<p>" + drink[carbohydrates] + "</p>";
    document.getElementById("drink-protein-cell-id").innerHTML = "<p>" + drink[protein] + "</p>";
    document.getElementById("drink-fat-cell-id").innerHTML = "<p>" + drink[fat] + "</p>";
    document.getElementById("drink-sugar-cell-id").innerHTML = "<p>" + drink[sugar] + "</p>";
    document.getElementById("drink-calories-cell-id").innerHTML = "<p>" + drink[calories] + "</p>";
    document.getElementById("drink-grams-cell-id").innerHTML = "<p>" + drink[grams] +"<p>";
    document.getElementById("drink-date-cell-id").innerHTML = "<p>" + drinkDate +"<p>";

}

function createQR(value) {
    //get the current drink
    let drinkList = JSON.parse(localStorage.drinkList);
    const drink = drinkList[value - 1]

    // clear all children
    drinkQROuterDiv.innerHTML = "";
    
    if (value != null) {

        //read current nutrition div data into a string.
        dataString = encodeURI(JSON.stringify(drink));
    
        //create the header
        qrHeader = document.createElement('h3');
        qrHeader.innerText = "Scan this code at our store to order your drink!";
        
        
        // create a new img and add the qrcode link to the div
        qrSrc = document.createElement('img');
        qrSrc.src = "https://api.qrserver.com/v1/create-qr-code/?data=" + dataString + "&amp";
        qrSrc.alt = "qr code";
        qrSrc.height = "150";
        qrSrc.width = "150";
        qrSrc.classList.add("center");
        drinkQROuterDiv.classList.add("has-qr")
        drinkQROuterDiv.appendChild(qrSrc);
        drinkQROuterDiv.appendChild(qrHeader);
    }
}       

let getSiblings = function (e) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    if(!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};
 
loadDrinkTable();