var allContacts = [];
var request = new Api();

function init() {
	createContacts(request.contacts);
}

/**
 * Take an array and create the contacts
 * @param {contacts} An array of contacts
 * @return {void}
 */
function createContacts(contacts) {
	var contact = {};
	//Populate the allContacts array
	for (var i = 0; i < contacts.length; i++) {
		contact = contacts[i];
		allContacts.push(new Contact(contact.name, contact.number, contact.email));
	}

	// Populate the select box with all contacts array
	for(var i = 0; i < allContacts.length; i++) {
		populateSelect(allContacts[i]);
	}
}

/**
 * Add an elemet to the select box
 * @param  {Contact} value A Contact Object
 * @return {void}
 */
function populateSelect(value) {
	var selectBox = document.getElementById("allContacts"), options;

	options = document.createElement("option");
	//Populate Id as an attribute so that we get correct item in array
	options.setAttribute('value', value.id);
	options.appendChild(document.createTextNode(value.name + ' : ' + value.number + ' : ' + value.email));
	selectBox.appendChild(options);
}


/**
 * Delete the options selected in the select box
 * @return {void}
 */
function deleteSelected() {
	selectBox = document.getElementById("allContacts"),
	selectedOptions = selectBox.selectedOptions,
	selectedContact = {};
	// Loop backwards so that we can delete without index interfaring	
	for (var i = selectedOptions.length - 1; i >= 0; i--) {
		// get the contact from Contact array
		selectedContact = allContacts.filter(function (contact) {
			return contact.id == selectedOptions[i].value;
		})[0];
		//Destroy in our Contact array
		selectedContact.destroy();
		// Remove from select box
		selectBox.removeChild(selectBox[selectedOptions[i].index]);
	}
}

/**
 * Add a contact to the select box and allContacts array. Validate
 */
function addContact() {
	var name, number;
	name = document.getElementById("newName");
	number = document.getElementById("newNumber");
	email = document.getElementById("newEmail");

	// Validation of inputs, all are required
	if (name.value.length < 3 || number.value.length < 3 || email.value.length < 3 ||
		typeof name.value == 'undefined' || typeof number.value == 'undefined' || typeof email.value == 'undefined') {
		throw("Name or Number too small")
	} else {
		allContacts.push(new Contact(name.value, number.value, email.value));
		// We need to get the element again to get the id.
		populateSelect(allContacts[allContacts.length - 1]);
	}

	//Set inputs back to empty
	name.value = '';
	number.value = '';
	email.value = '';
}

/**
 * Sort by give key
 * Reorder the contact array then populate all again.
 * @param {key} The key you want to sort by i.e. number
 */
function sortSelect(key) {
	//Sort all contacts by key first
	allContacts = allContacts.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    //Repopulate the select box
    clearSelect();
    for (var i = 0; i < allContacts.length; i++) {
    	populateSelect(allContacts[i]);
    }
}

/**
 * Clear the select box
 * @return {void}
 */
function clearSelect() {
	var selectBox = document.getElementById("allContacts"),
	selectedOptions = selectBox.options;
	for (var i = selectedOptions.length - 1; i >= 0; i--) {
		selectBox.removeChild(selectBox[selectedOptions[i].index]);
	}
}

function Contact(name, number, email) {
	this.id = this.generateId();
	this.name = name;
	this.number = number;
	this.email = email;
}

/**
 * Removes the Contact from the allContacts array
 * @return {void}
 */
Contact.prototype.destroy = function() {
	allContacts.slice(this.id);
};

/**
 * Generate a random ID to stop conflicts
 * @return {number} a random Id
 */
Contact.prototype.generateId = function() {
	var randomNumber, isNumberFound = true;

	// If we find the number then another number gets generated. 
	while(isNumberFound === true) {
		randomNumber = Math.floor(Math.random()*100) + 1;
		isNumberFound = false;
		// Loop through other contacts to make sure we don't duplicate
		for(var i = 0; i < allContacts.length; i++) {
			if (allContacts[i].id == randomNumber) {
				isNumberFound = true;
				break;
			} else {
				isNumberFound = false;
			}
		}
	}
	return randomNumber;
}

/**
 * Dummy API
 */
function Api() {
	this.contacts = [
		{'name': 'Steve', 'number': '123 456 789', 'email': 'hello@test.com'},
		{'name': 'Mark', 'number': '555 448 692', 'email': 'goodbye@test.com'},
		{'name': 'Lucy', 'number': '255 147 359', 'email': 'aloha@test.com'}
	];
}

init();