document.addEventListener("DOMContentLoaded", function() {
    var calculateButton = document.getElementById("calculateButton");
    calculateButton.addEventListener("click", calculate);

    var selectNumber = document.getElementById("selectNumber");
    selectNumber.addEventListener("change", generateFields);
	
	var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", clear); 
});

function calculate() {
    var numberInput = document.getElementById("numberInput");
    var reservationFeeOutput = document.getElementById("reservationFeeOutput");
    var totalOutput = document.getElementById("totalOutput");
    var settlementAmountOutput = document.getElementById("settlementAmountOutput");
    var refundAmountOutput = document.getElementById("refundAmountOutput");

    var inputValue = parseFloat(numberInput.value);
    if (!isNaN(inputValue)) {
        var reservationFee = inputValue * 0.1; // Calculate 10%

        // Calculate sum of text field values
        var textFieldContainer = document.getElementById("textFieldContainer");
        var textFields = textFieldContainer.querySelectorAll("input[type='text']");
        var sumOfTextFields = 0;
        var allFieldsValid = true;

        for (var i = 0; i < textFields.length; i++) {
            var textFieldValue = parseFloat(textFields[i].value);
            if (isNaN(textFieldValue)) {
                allFieldsValid = false;
                break;
            }
            sumOfTextFields += textFieldValue;
        }

        if (allFieldsValid) {
            var total = inputValue + reservationFee;
            var settlementAmount = inputValue - sumOfTextFields ;
            var refundAmount = sumOfTextFields + reservationFee;

            reservationFeeOutput.textContent = "Reservation Fee: R " + reservationFee.toFixed(2);
            totalOutput.textContent = "Total Order Amount: R " + total.toFixed(2);
            settlementAmountOutput.textContent = "Settlement Amount: R " + settlementAmount.toFixed(2);
            refundAmountOutput.textContent = "Refund Amount: R " + refundAmount.toFixed(2);
			
		
			
		if (total < 0 || settlementAmount < 0 || refundAmount < 0) {
                var warningMessage = document.getElementById("warningMessage");
                warningMessage.textContent = "Warning! Amounts do not balance!";
				 alert("Warning! Amounts do not balance!."); // Display a pop-up alert
            } else {
                var warningMessage = document.getElementById("warningMessage");
                warningMessage.textContent = ""; // Clear warning message
            }	
			
        } else {
            reservationFeeOutput.textContent = "Please enter a valid number and fill all fields.";
            totalOutput.textContent = "";
            settlementAmountOutput.textContent = "";
            refundAmountOutput.textContent = "";
			var warningMessage = document.getElementById("warningMessage");
            warningMessage.textContent = ""; // Clear warning message
        }
    } else {
        reservationFeeOutput.textContent ="Please enter a valid number and fill all fields!";
        totalOutput.textContent = "";
        settlementAmountOutput.textContent = "";
        refundAmountOutput.textContent = "";
		var warningMessage = document.getElementById("warningMessage");
        warningMessage.textContent = ""; // Clear warning message

    }
}

function generateFields() {
    var selectNumber = document.getElementById("selectNumber");
    var textFieldContainer = document.getElementById("textFieldContainer");

    var selectedNumber = parseInt(selectNumber.value);
    textFieldContainer.innerHTML = ""; // Clear previous fields

    for (var i = 0; i < selectedNumber; i++) {
        var textField = document.createElement("input");
        textField.type = "text";
        textField.name = "text" + i;
        textField.placeholder = "OOS Item Amount: " + (i + 1);
        textFieldContainer.appendChild(textField);
    }
	

}

function clear() {
    var numberInput = document.getElementById("numberInput");
    var reservationFeeOutput = document.getElementById("reservationFeeOutput");
    var totalOutput = document.getElementById("totalOutput");
    var settlementAmountOutput = document.getElementById("settlementAmountOutput");
    var refundAmountOutput = document.getElementById("refundAmountOutput");
    var warningMessage = document.getElementById("warningMessage"); // Warning message element

    numberInput.value = ""; // Clear input field
    reservationFeeOutput.textContent = "";
    totalOutput.textContent = "";
    settlementAmountOutput.textContent = "";
    refundAmountOutput.textContent = "";
    warningMessage.textContent = ""; // Clear warning message

    var textFieldContainer = document.getElementById("textFieldContainer");
    textFieldContainer.innerHTML = ""; // Clear dynamic text fields
}