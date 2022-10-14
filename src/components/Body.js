import react from "react";
import MyFunction from "./MyFunction";
import PrintLabel from "./PrintLabel";
import {useState} from 'react';

function Body() {
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
    return (

        <div>
            <body>

            <div id="tool_area" className="printmon_tools">

                <span id="nav_barcodegen" className="toolselected">
                    Bilal Barcode Generator
                </span>



            </div>


            <div className="title">
                <div className="titletext"><a href=""><img src=""></img></a>
                    <div></div>
                    <div className="titletext">


                        <form id="form" name="form" action="formprocessor.html" method="GET">
                            <div style={{"fontSize": "small" ,"textAlign": "left",  "paddingLeft": "50px"}}>
                             
                            </div>

   {/* <input 
                                id="printafter" 
                                type="checkbox" 
                                defaultChecked=" "> Print after scanning</input>
                                <input 
                                id="jumptoq" 
                                type="checkbox"> Jump to quantity</input>
                                <input 
                                id="nowhitespace" 
                                type="checkbox" 
                                defaultChecked=" "> Trim whitespace characters</input> */}

                            <p>Scan or Enter Barcode Data <i style={{"fontSize": "small"}}>Limited to 43 Characters</i></p>
                            
                            <input 
                            maxLength="43" 
                            id="barcodedata" 
                            type="text" ></input>

                            <p>Enter Display Text </p>
                            <input 
                            maxLength="43" 
                            id="displaytext" 
                            type="text" ></input>

                            <p>Enter Quantity</p>
                            <i style={{"fontSize": "small"}}>Maximum is 500</i>
                            <input 
                            maxLength="3" 
                            id="quantity" 
                            type="text" 
                            defaultValue="1" ></input>



                            <p><a className="apmbutton" style={{"marginTop": "5px"}} href="#" onClick={printlabel}> Print Label</a></p>



                            <input id="bilal" type="button" onClick={MyFunction} defaultValue="Reset form"></input>
                        </form>
                    </div>




                </div >
            </div>
            </body>
            </div>

        

    )
}

export default Body