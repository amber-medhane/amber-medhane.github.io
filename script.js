  $(document).ready(function() {

//set up the page, hide the intelligence and escalation pages initially. set up logic for the divs to hide/show based on a dropdown selection.

    $(".intelligence").hide();
    $(".escalation").hide();

    $(".template-type").change(function(){
      if ($(".template-type").val() == "intelligence") {
        $(".case-work").hide();
        $(".escalation").hide();
        $(".intelligence").show();
        toIntelligence();
      }else if ($(".template-type").val() == "escalation") {
        $(".case-work").hide();
        $(".escalation").show();
        $(".intelligence").hide();
      }else {
        $(".case-work").show();
        $(".escalation").hide();
        $(".intelligence").hide();
      }

    })



    //validates the enter key
    function Validate(e) {
      if (e.which == 13) {
        return true;
      }
    }

function toIntelligence(){
  console.log("toIntelligence");
  //case number
  if (document.getElementById("intel-case-number").value == "") {
    console.log("intel number was empty");
    console.log($("#summary").val());


  }else {
    console.log("intel numberwas not empty");

  }

  //Summary
  if (document.getElementById("intel-issue").value == "") {
    console.log("we in here");
    $("#intel-issue").val($("#summary").val()) ;
  }else {
    console.log("was not empty");
  }

  //troubleshooting step
  var steps = document.getElementsByName("intel-steps[]");
  var troubles = document.getElementsByName("troubles[]");
  if (steps.length == 0) {
    console.log(troubles.length);
    if (troubles.length > 0) {
      console.log("troubles.length");
      $("#intel-steps").val($("#troubles").val()) ;
      if (troubles.length > 1) {
        for (i = 1; i < troubles.length; i++){
          $(".intel-steps").append('<input type="text" id="intel-steps" name="intel-steps[]" value="'+ troubles[i].value + '">')
        }
      }

    }
  }

  //opscon info
}

    //automatically generate a new line for each step. when the enter key is pressed, the event handler is triggered. the function validates that it was the enter key, that the input was not blank, and that it was the most recent input

    $(".steps-container").on('keypress', '.steps', function(e) {
      if (Validate(e) == true && this.value != "") {
        var steps = document.getElementsByName('steps[]');
        var length = steps.length;
        if (this.value == steps[steps.length - 1].value) {
          $(".steps-container").append('<input type="text" name="steps[]" class="steps" value="">');
          $(".steps-container input").focus();
        }

      };
    })

    //the process is the same for trouble shooting steps.
    $(".troubles-container").on('keypress', '.troubles', function(e) {
      if (Validate(e) == true && this.value != "") {
        var troubles = document.getElementsByName('troubles[]');
        var length = troubles.length;
        if (this.value == troubles[troubles.length - 1].value) {
          $(".troubles-container").append('<input type="text" name="troubles[]" class="troubles" value="">');
          $(".troubles-container input").focus();
        }

      };
    })






    //when the form is clicked, this function assigns variables to each input. the troubleshooting and next steps both have for loops that concatenate them into one string. a new div is appended to the content container and a div is added with all of the information. if the user presses submit more than once, the function first removes the previous div so there arent a bunch.

    $("#concat").click(
      function() {
        var steps = document.getElementsByName('steps[]');
        var troubles = document.getElementsByName('troubles[]');
        var summary = String($("#summary").val());
        var trouble = String($("#trouble").val());
        var opscon = String($("#opscon").val());
        var info = String($("#info").val());
        var step_string = "";
        var trouble_string = "";

        for (i = 0; i < steps.length; i++) {
          if (String(steps[i].value) != "") {
            step_string += "<br>•" + String(steps[i].value);
          }
        }

        for (i = 0; i < troubles.length; i++) {
          if (String(troubles[i].value) != "") {
            trouble_string += "<br>•" + String(troubles[i].value);
          }
        }

        $(".selectme").remove();


        $(".content").append('<div class="selectme"><div id="selectme" name="concated" rows="4" cols="80"><br>  Summary of Current Issue: ' + summary + '<br><br>Troubleshooting Steps taken: ' + trouble_string + '<br><br>Next Steps:' + step_string +
          '<br><br>Relevant OpsCon info: ' + opscon + '<br><br>Additional information(Slack URL, related ticket numbers, etc.): ' + info + '</div>' + '<br>' + '      <button id="copier" type="button">Copy to Clipboard</button></div>');
      });



    function SelectText(element) {
      var doc = document,
        text = doc.getElementById(element),
        range, selection;
      if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
      } else if (window.getSelection) {
        selection = window.getSelection();
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy')
      }
    }



    $('.content').on('click', '#copier', function() {
      SelectText('selectme');
    })




  });
