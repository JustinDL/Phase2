// added all list items into a div so the items are better wrapped together
// added a div for the map
// added HERE MAP API functionality






let button1 = document.querySelector('.add');
let option1 = document.querySelector('.listItem');
let div1 = document.querySelector('div');
let body = document.querySelector('body');
let mapDiv = document.getElementById('map');
let locationInfo = document.getElementById('loc');




button1.onclick = addToList;


// function to add items to the list
function addToList() {

    // value of initial input
    let text1 = option1.value;

    // create new div to hold list items
    let itemDiv = document.createElement('div');

    // creates new input
    let newInput = document.createElement('input');
    // input is checkbox, has a value of the text above but that was because I assumed value was the text field now it is for the eventlistener. ID is for the label
    newInput.type = 'checkbox';
    newInput.value = text1;
    newInput.id = 'list';

    // create label for the checkbox since it seems it has to be that way?
    let label = document.createElement('label');
    label.for = 'list';
    label.textContent = text1;


    // creates a delete button which should be targetable later
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.class = 'Delete';

    // apply event listener before creation. this kind of makes sense now
    newInput.addEventListener('change', crossOut);
    deleteButton.addEventListener('click', deleteItem);

    // appends all created elements to the div the list resides in
    itemDiv.appendChild(label);
    itemDiv.appendChild(newInput);
    itemDiv.appendChild(deleteButton);
    body.insertBefore(itemDiv, mapDiv);

    // add map marker on location
    service.geocode({
        q: locationInfo.value
      }, (result) => {
        // Add a marker for each location found
        result.items.forEach((item) => {
          map.addObject(new H.map.Marker(item.position));
        });
      }, alert);




}


// function runs when input is changed
function crossOut(e) {


    // target checkbox
    let checked = e.target;
    // target element before checkbox, always the label
    let toCross = checked.previousElementSibling;
    // target div wrapper
    let crossDiv = toCross.parentNode;
    // set class to crossed to apply css. This is confusing because javascript stops offering hints as if .setAttribute isn't an option
    toCross.setAttribute('class', 'crossed');

    // this seems roundabout but target the delete button so I can append all 3 to the bottom one at a time.
    // I feel like there should be a way for me to wrap all 3 elements inside 1. like with a list item but the code didn't actually specifically call for one so I'm afraid to add that
    let buttonAfter = checked.nextElementSibling;

    // append all pieces of the to-do item to the bottom of the div
    crossDiv.appendChild(toCross);
    crossDiv.appendChild(checked);
    crossDiv.appendChild(buttonAfter);
    body.insertBefore(crossDiv, mapDiv);
}

function deleteItem(e) {

    // this seems like again the worst possible way, probably because I didn't wrap the items in a li
    // targeting the 3 desired elements nearest the button clicked
    let button = e.target;
    let checkBox = button.previousElementSibling;
    let label = checkBox.previousElementSibling;
    let div = label.parentNode;


    // removes targeted above from parent div
    div.removeChild(button);
    div.removeChild(checkBox);
    div.removeChild(label);
    div.parentNode.removeChild(div);

}



// -------------- HERE MAP API ------------------

var platform = new H.service.Platform({
    'apikey': 'C3mkgnd3z7ND8tB8xO8_JXaO1keSkXJaSMLIitBHiR4'
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
    mapDiv,
    maptypes.vector.normal.map, {
        zoom: 10,
        center: {
            lng: -79.6903,
            lat: 44.3894
        }
    });
var ui = H.ui.UI.createDefault(map, maptypes);


// attempt geocoding
var service = platform.getSearchService();

// Call the geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):

