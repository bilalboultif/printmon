var webuiport = 5965;

function genId() {
  var id = "";

  for (var i = 0; i < 10; i++)
    id += Math.floor(Math.random() * 9);

  return id;
}


function getStatus(url, funcvalid, funcinvalid) {
  var xmlhttp;

  if (window.XMLHttpRequest)
    xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      if (xmlhttp.responseText == "valid")
        funcvalid();
      else
        funcinvalid();
    }
  };

  try {
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }
  catch (e) {
    funcinvalid();
  }
}

function asciihex(str) {
  var text = "";

  for (var i = 0, l = str.length; i < l; i++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    text += hex;
  }

  return text;
}

function printFailed() {
  alert("failed to print the barcode!");
}

function printlabel() {
  var barcode = document.getElementById("barcodedata").value;
  var text = document.getElementById("displaytext").value;


  if (document.getElementById("nowhitespace").checked) {
    barcode = barcode.trim();
    text = text.trim();
  }

  getStatus("http://localhost:" + webuiport + "/printer?action=print&type=barcode&" + "data=" + asciihex(barcode) + "&text=" + asciihex(text) + "&quantity=" + document.getElementById("quantity").value + "&seq=" + genId(), function () { }, printFailed);
  document.getElementById('barcodedata').select();
}

function focusElement(id) {
  document.getElementById(id).value = "";
  document.getElementById(id).focus();
}


function KeyCheck(e) {
  //listen for scanner prefix [CR]
  if (e.keyCode == 13) {
    if (document.activeElement == document.getElementById('barcodedata') && document.getElementById("jumptoq").checked) {
      setTimeout(function () { focusElement("quantity"); }, 10);
    }
    else if (document.activeElement == document.getElementById('barcodedata')) {
      if (document.getElementById("printafter").checked) printlabel();
      else document.getElementById('barcodedata').select();
    }
    else if (document.activeElement == document.getElementById('quantity') && document.getElementById("jumptoq").checked && document.getElementById("printafter").checked) {
      printlabel();
      setTimeout(function () { focusElement("barcodedata"); }, 10);
    }
  }
}




window.addEventListener('keydown', KeyCheck, false);

function myFunction() {
  document.getElementById("form").reset();
}