document.addEventListener("DOMContentLoaded", function () {
  
  var selectNumber = document.getElementById("weight"); //same id is weight
  selectNumber.addEventListener("change", generateFields);

  var calculateButton = document.getElementById("calculateButton"); //same
  calculateButton.addEventListener("click", calculate);

  var copyAndSendButton = document.getElementById("copyAndSendButton");
  copyAndSendButton.addEventListener("click", shareOutput);

  var clearButton = document.getElementById("clearButton"); //same
  clearButton.addEventListener("click", refreshPage);
  

});


  // Function to run when the Calculate button is clicked
  function calculate() {

 
     // Calculate sum of text field values
     var textFieldContainer = document.getElementById("textFieldContainer");
     var numberFields = textFieldContainer.querySelectorAll("input[type='number']");
     var sumOfNumberFields = 0;
 
     
     for (var i = 0; i < numberFields.length; i++) {
       var fieldValue = parseFloat(numberFields[i].value);
       if (!isNaN(fieldValue)) {
         sumOfNumberFields += fieldValue;
       }
     }
 
      var storeName = document.getElementById("textInput").value;
      var orderAmount = document.getElementById("numberInput").value;
      var orderNumber = document.getElementById("height").value;
      var warning = document.getElementById("warningMessage").value;

      // Get selected radio button value
      let selectedStore = "";
      const radioButtons = document.getElementsByName("radio");
      for (const radioButton of radioButtons) {
          if (radioButton.checked) {
              selectedStore = radioButton.nextSibling.textContent;
              break;
          }
      }
    
        var calculatedReservationFee = orderAmount *0.1;
        var calculatedTotal = calculatedReservationFee + orderAmount *1;
        var calculatedRefundAmount = sumOfNumberFields + calculatedReservationFee;
        var calculatedSettlementAmount = orderAmount - sumOfNumberFields;
       
        if(orderAmount == ""){
          document.getElementById("warningMessage").textContent = "Fill In Order Amount Field!";
        }

        else{
        // Update HTML elements with calculated values
        document.getElementById("orderNumberOutput").textContent = "Order Number: # " + orderNumber;
        document.getElementById("reservationFeeOutput").textContent = "Reservation Fee: R " + calculatedReservationFee.toFixed(2);
        document.getElementById("totalOutput").textContent = "Total Order Amount: R " + calculatedTotal.toFixed(2);
        document.getElementById("settlementAmountOutput").textContent = "Settlement Amount: R " + calculatedSettlementAmount.toFixed(2);
        document.getElementById("refundAmountOutput").textContent = "Refund Amount: R " + calculatedRefundAmount.toFixed(2);
        document.getElementById("storeNameOutput").textContent = "Store Name: " + storeName + " " + selectedStore ;
        document.getElementById("warningMessage").textContent = "";
        copyAndSendButton.removeAttribute("disabled");
   }

   if (calculatedTotal < 0 || calculatedSettlementAmount < 0 || calculatedRefundAmount < 0) {

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
  
  function shareOutput() {
    var totalOrderAmount = document.getElementById("totalOutput").textContent;
    var settlementAmount = document.getElementById("settlementAmountOutput").textContent;
    var refundAmount = document.getElementById("refundAmountOutput").textContent;
    var orderNumber = document.getElementById("height").value; // Get the order number from input
    var storeName = document.getElementById("textInput").value;

    // Get selected radio button value
    let selectedStore = "";
    const radioButtons = document.getElementsByName("radio");
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedStore = radioButton.nextSibling.textContent;
            break;
        }
    }

  

    var outputText = "Store Name: " + storeName + " " + selectedStore + "\n\nOrder Number: #" + orderNumber + "\n\n" + totalOrderAmount + "\n\n" + settlementAmount + "\n\n" + refundAmount;

    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = outputText;

    document.body.appendChild(tempTextArea);

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

  // Open email 
  var emailBody = encodeURIComponent("Hi TJ,\n \nPlease advise if the below SPAR2U refund has been processed:\n\n" + outputText + "\n\n");
  var emailLink = "mailto:support@switch.tj?subject=SPAR2U Refund Query - Order #"+orderNumber + " || " + storeName + " " + selectedStore + "&body=" + emailBody;
  window.location.href = emailLink;
}

function closePopup() {
  var popupContainer = document.getElementById("popupContainer");
  popupContainer.style.display = "none";

  // Remove event listener 
  var popupOverlay = document.querySelector(".popup-overlay");
  popupOverlay.removeEventListener("click", closePopup);
}

  
  