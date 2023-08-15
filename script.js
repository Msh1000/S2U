document.addEventListener("DOMContentLoaded", function() {
  var calculateButton = document.getElementById("calculateButton"); //same
  calculateButton.addEventListener("click", calculate);

  var selectNumber = document.getElementById("weight"); //same id is weight
  selectNumber.addEventListener("change", generateFields);

  var clearButton = document.getElementById("clearButton"); //same
  clearButton.addEventListener("click", refreshPage);

  var copyAndSendButton = document.getElementById("copyAndSendButton"); //same
  copyAndSendButton.addEventListener("click", copyAndSendOutput);

  var outputContainer = document.getElementById("textFieldContainer"); // Replace with the ID of your output container
  var warningMessage = document.getElementById("warningMessage"); // Replace with the ID of your warning message
  
  var popupClose = document.getElementById("popupClose");
  popupClose.addEventListener("click", function() {
      var popupContainer = document.getElementById("popupContainer");
      popupContainer.style.display = "none";
    });

  // Check if output is available and enable the button
  if (outputContainer.textContent.trim() !== "" && warningMessage.textContent.trim() === "") {
    copyAndSendButton.removeAttribute("disabled");
  }
});


function calculate() {
  var numberInput = document.getElementById("numberInput");
  var reservationFeeOutput = document.getElementById("reservationFeeOutput");
  var totalOutput = document.getElementById("totalOutput");
  var settlementAmountOutput = document.getElementById("settlementAmountOutput");
  var refundAmountOutput = document.getElementById("refundAmountOutput");
  var height = document.getElementById("height");

  var orderNumber = height.value;

  var inputValue = parseFloat(numberInput.value);
  if (!isNaN(inputValue)) {
    var reservationFee = inputValue * 0.1; // Calculate 10%

    // Calculate sum of text field values
    var textFieldContainer = document.getElementById("textFieldContainer");
    var numberFields = textFieldContainer.querySelectorAll("input[type='number']");
    var sumOfNumberFields = 0;

    var allFieldsValid = true;

    for (var i = 0; i < numberFields.length; i++) {
      var fieldValue = parseFloat(numberFields[i].value);
      if (!isNaN(fieldValue)) {
        sumOfNumberFields += fieldValue;
      }
    }

    if (allFieldsValid) {
      var total = inputValue + reservationFee;
      var settlementAmount = inputValue - sumOfNumberFields;
      var refundAmount = sumOfNumberFields + reservationFee;

      orderNumberOutput.textContent = "Order Number: #" + orderNumber;
      reservationFeeOutput.textContent = "Reservation Fee: R " + reservationFee.toFixed(2);
      totalOutput.textContent = "Total Order Amount: R " + total.toFixed(2);
      settlementAmountOutput.textContent = "Settlement Amount: R " + settlementAmount.toFixed(2);
      refundAmountOutput.textContent = "Refund Amount: R " + refundAmount.toFixed(2);

     /** var popupContainer = document.getElementById("popupContainer");
    popupContainer.style.display = "block";

    var popupOutput = document.getElementById("popupOutput");
    popupOutput.textContent = "Order Number: #" + orderNumber + "\n"
                              + "Reservation Fee: R " + reservationFee.toFixed(2) + "\n" +
                              "Total Order Amount: R " + total.toFixed(2) + "\n" +
                              "Settlement Amount: R " + settlementAmount.toFixed(2) + "\n" +
                              "Refund Amount: R " + refundAmount.toFixed(2);

   var popupOverlay = document.querySelector(".popup-overlay");
   popupOverlay.addEventListener("click", closePopup);*/
                              

      var copyAndSendButton = document.getElementById("copyAndSendButton");
      copyAndSendButton.removeAttribute("disabled");

      if (total < 0 || settlementAmount < 0 || refundAmount < 0) {
        /**var warningMessage = document.getElementById("warningMessage");
        warningMessage.textContent = "Warning! Amounts do not balance!";
        alert("Warning! Amounts do not balance!"); // Display a pop-up alert*/

        var warningMessage = document.getElementById("warningMessage");
        warningMessage.textContent = "Warning! Amounts do not balance!";

        var popupContainer = document.getElementById("popupContainer");
        popupContainer.style.display = "block";
    
        var popupOutput = document.getElementById("popupOutput");
        popupOutput.textContent = "Warning! Amounts do not balance!";

        var popupOverlay = document.querySelector(".popup-overlay");
        popupOverlay.addEventListener("click", closePopup);

      } else {
        var warningMessage = document.getElementById("warningMessage");
        warningMessage.textContent = ""; // Clear warning message
      }

    } else {
      totalOutput.textContent = "";
      settlementAmountOutput.textContent = "";
      refundAmountOutput.textContent = "";
      var warningMessage = document.getElementById("warningMessage");
      warningMessage.textContent = ""; // Clear warning message
      var copyAndSendButton = document.getElementById("copyAndSendButton");
      copyAndSendButton.setAttribute("disabled", "true");
    }
  } else {
    reservationFeeOutput.textContent = "Please enter a valid number and fill all fields!";
    totalOutput.textContent = "";
    settlementAmountOutput.textContent = "";
    refundAmountOutput.textContent = "";
    var warningMessage = document.getElementById("warningMessage");
    warningMessage.textContent = ""; // Clear warning message
    var copyAndSendButton = document.getElementById("copyAndSendButton");
    copyAndSendButton.setAttribute("disabled", "true");

  }
}

function generateFields() {
  var selectNumber = document.getElementById("weight");
  var textFieldContainer = document.getElementById("textFieldContainer");

  var selectedNumber = parseInt(selectNumber.value);
  textFieldContainer.innerHTML = ""; // Clear previous fields

  for (var i = 0; i < selectedNumber; i++) {
    var numberField = document.createElement("input");
    numberField.type = "number"; // Change to number input type
    numberField.name = "number" + i;
    numberField.placeholder = "Amount: " + (i + 1);
    numberField.classList.add("custom-number-input");
    textFieldContainer.appendChild(numberField);
  }


}

function refreshPage() {
  location.reload(); // Reload the page
}


function copyAndSendOutput() {
    var totalOrderAmount = document.getElementById("totalOutput").textContent;
    var settlementAmount = document.getElementById("settlementAmountOutput").textContent;
    var refundAmount = document.getElementById("refundAmountOutput").textContent;
    var orderNumber = document.getElementById("height").value; // Get the order number from input
  

    var outputText = "Order Number: #" + orderNumber + "\n\n" + totalOrderAmount + "\n\n" + settlementAmount + "\n\n" + refundAmount;

    // Create a temporary textarea and set its value
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = outputText;

    // Append the textarea to the DOM
    document.body.appendChild(tempTextArea);

    // Select the text in the textarea
    tempTextArea.select();

    try {
        // Copy the selected text to the clipboard
        document.execCommand("copy");
        var popupContainer = document.getElementById("popupContainer");
        popupContainer.style.display = "block";
    
        var popupOutput = document.getElementById("popupOutput");
        popupOutput.textContent = "Amounts have been shared via Email!";

        var popupOverlay = document.querySelector(".popup-overlay");
        popupOverlay.addEventListener("click", closePopup);
    } catch (err) {
        console.error("Sharing via email failed:", err);
    }

    // Remove the temporary textarea
    document.body.removeChild(tempTextArea);

  // Open email client with copied content
  var emailBody = encodeURIComponent("Hi TJ,\n \nPlease advise if the below SPAR2U refund has been processed:\n\nStore -\n\n" + outputText + "\n\n");
  var emailLink = "mailto:support@switch.tj?subject=SPAR2U Refund Query - Order #"+orderNumber + " ||&body=" + emailBody;
  window.location.href = emailLink;
}

function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";

  // Remove event listener to prevent multiple bindings
  var popupOverlay = document.querySelector(".popup-overlay");
  popupOverlay.removeEventListener("click", closePopup);
}


/**function clear() {
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
}*/
