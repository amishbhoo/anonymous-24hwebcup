var OPENAI_API_KEY = "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";
var Text_Speech = false;
var bSpeechInProgress = false;
var oSpeechRecognizer = null;
var oSpeechSynthesisUtterance = null;
var oVoices = null;
var start_question =
  "Can you please predict my future into different parts concerning relationships, career and health based on the main keywords of this dream:- ";
function OnLoad() {
  if ("webkitSpeechRecognition" in window) {
  } else {
    //speech to text not supported
    lblSpeak.style.display = "none";
  }

  if ("speechSynthesis" in window) {
    Text_Speech = true;
  }
}

function ChangeLang(o) {
  if (oSpeechRecognizer) {
    oSpeechRecognizer.lang = selLang.value;
    //SpeechToText()
  }
}

function Send() {
  document.getElementById("message").style.display = "block";
  var sQuestion = txtMsg.value;
  if (sQuestion == "") {
    swal("Error", "Enter your dream!", "error");
    txtMsg.focus();
    return;
  }

  var oHttp = new XMLHttpRequest();
  oHttp.open("POST", "https://api.openai.com/v1/completions");
  oHttp.setRequestHeader("Accept", "application/json");
  oHttp.setRequestHeader("Content-Type", "application/json");
  oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);

  oHttp.onreadystatechange = function () {
    document.getElementById("message").style.display = "block";
    if (oHttp.readyState === 4) {
      //console.log(oHttp.status);
      var oJson = {};
      if (txtOutput.value != "") txtOutput.value += "\n";

      try {
        oJson = JSON.parse(oHttp.responseText);
      } catch (ex) {
        txtOutput.value += "Error: " + ex.message;
      }

      if (oJson.error && oJson.error.message) {
        txtOutput.value += "Error: " + oJson.error.message;
      } else if (oJson.choices && oJson.choices[0].text) {
        var s = oJson.choices[0].text;

        let relationships = s.search("Relationships");
        console.log(relationships);

        let career = s.search("Career");
        console.log(career);

        let health = s.search("Health");
        console.log(health);

        var t = s.substring(relationships + 15, career - 1);
        var u = s.substring(career + 8, health - 1);
        var v = s.substring(health + 8);

        console.log(t);
        console.log(u);
        console.log(v);
        document.getElementById("articles").style.display = "grid";
        document.getElementById("relcard").innerHTML = t;
        document.getElementById("careercard").innerHTML = u;
        document.getElementById("healthcard").innerHTML = v;
        document.getElementById("message").style.display = "none";

        if (selLang.value != "en-US") {
          var a = s.split("?\n");
          if (a.length == 2) {
            s = a[1];
          }
        }
        TextToSpeech(t);
        TextToSpeech(u);
        TextToSpeech(v);
      }
    }
  };

  var sModel = "text-davinci-003"; // "text-davinci-003";
  var iMaxTokens = 2048;
  var sUserId = "1";
  var dTemperature = 0.5;
  var new_question = start_question + sQuestion;

  var data = {
    model: sModel,
    prompt: new_question,
    max_tokens: iMaxTokens,
    user: sUserId,
    temperature: dTemperature,
    frequency_penalty: 0.0, //Number between -2.0 and 2.0
    //Positive values decrease the model's likelihood
    //to repeat the same line verbatim.
    presence_penalty: 0.0, //Number between -2.0 and 2.0.
    //Positive values increase the model's likelihood
    //to talk about new topics.
    stop: ["#", ";"], //Up to 4 sequences where the API will stop
    //generating further tokens. The returned text
    //will not contain the stop sequence.
  };

  oHttp.send(JSON.stringify(data));

  if (txtOutput.value != "") txtOutput.value += "\n";
  txtOutput.value += "Me: " + sQuestion;
  txtMsg.value = "";
}

function TextToSpeech(s) {
  if (Text_Speech == false) return;
  if (chkMute.checked) return;

  oSpeechSynthesisUtterance = new SpeechSynthesisUtterance();

  if (oVoices) {
    console.log(selVoices.value);
    var sVoice = 0;
    if (sVoice != "") {
      oSpeechSynthesisUtterance.voice = oVoices[parseInt(sVoice)];
    }
  }

  oSpeechSynthesisUtterance.onend = function () {
    //finished talking - can now listen
    if (oSpeechRecognizer && chkSpeak.checked) {
      oSpeechRecognizer.start();
    }
  };

  if (oSpeechRecognizer && chkSpeak.checked) {
    //do not listen to yourself when talking
    oSpeechRecognizer.stop();
  }

  oSpeechSynthesisUtterance.lang = selLang.value;
  oSpeechSynthesisUtterance.text = s;
  //Uncaught (in promise) Error: A listener indicated an
  //asynchronous response by returning true, but the message channel closed
  window.speechSynthesis.speak(oSpeechSynthesisUtterance);
}

function Mute(b) {
  if (b) {
    document.getElementById("volimg").src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZFJREFUSEu1le0xhFEMhc9WgApQATqgBB1QAR2gAlSADnSACpYOdIAKmOdOshPZ3N29xubP+3WTk5yT5J1ozTZZc3xlgEtJN5I+/ws4AhD8QtKrpKMOyL6kOwM/sOuzpHPzm8srAmxK4vBeB8QT8CDu+20vTiXdZ4RMUQWyY1mTfTT3PTFaNyTNgVQiR5B3SQBgb5IINrXn6Au4v4demGgWDx1aMMqMIJy7NZ65d0piBfigw7UkktqtAPiwHcrsaZIBeCYg/h7jWNJjriA78r0C+UjV4+cVehUPRucviiqACsTFjl1Ea9O20PwUaYoa9AAySK9Nc9u251UBKpAtG8aYGJRC4ZfROwSwSJMXo8cp8udhgJ4mV5KYdBd51taRIhYc0xgN8ZhOrtHynCAwZxa2KeUxMMxCNrIjS4xpzsNIcGg5syuxmi37H8QF59WwEnzn5EqI6UO3EgCH6HsyZstG8+Ty7oKu2f9kWQUxYG9d97qrgYwAxGr8vid8uYsKbYdfQRcCt0X3lwqGEUcpGgb4AUcXcBmqMhuQAAAAAElFTkSuQmCC";
    selVoices.style.display = "none";
  } else {
    document.getElementById("volimg").src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATVJREFUSEvVlWFxwkAQhb8oQAKgAHBQJOAAHOCgVEGpAsABDsAB4AAc1EE7L3PLbI4LBEhm4P5kcsnuu/d2315GwytrOD8vB9AHFoH1IDy3wBTYp9S4h8EM+HRJLPYv7E2AZQxSBcBOradfFjsG5kALuAC5BeBPfQCUbBdQfKzAbX8ISLZ8+Z8+gr6dhJZfgMC0TBLPQNKoDt/AEeimAPShHSW3U/sCxgB6V0LFW44RsI4ZxIFlFkkB/AQGxmIV5CxI9AyAGKptJfPGy+Rr8AyAV6OQ520A1AxqVZPoBOTdWBeDSkX+DW703aPiyZ21tKnoyTCxFwQok8lsVYx2lieWKNX3flQYm4dHRZmxVDwx610ZdjbC7x52Pmdj49qDGBvt2fiu7cIpk/Dq/q374KGkPqhxgH+/LFgZ/DdJbwAAAABJRU5ErkJggg==";
    selVoices.style.display = "";
  }
}

function SpeechToText() {
  if (oSpeechRecognizer) {
    if (chkSpeak.checked) {
      document.getElementById("micimg").src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUhJREFUSEvtleExBEEQhb+LABEgAkSACMgAESACQiACQiACJwJEgAgQAfWpbjV1N7s7++OqVNG/7mZ73nvd2/12woJjsmB8Wgl2gDNgMwRNgVPgZUhgC4HgdxWgd2BriKSFQLXbwD1wCAh8ARwAt8B+XxUtBJ8BsF6oXQbe4r/nnTGGYDY3iXsx/gns/R9s0ex0OPdLwErsgG1ZA56B1/jtWXWqav1z/VdjSx+BG2APcOGOYuCvADc8F00LeQCeCjv5Tq0RuKXHwCVwEgolsooyPgJMQdex2XnnJ69GkOWbpNcI7pnEaXaeSS54qje/3PbOCnyQVdj/3SCp2YHgGqHWMad+aIbT5MyzBQKo3BDYNmp+hkboO5mLIavISrrdrEN5XhgiyJE8D9UbcdFpsRrPez86LQSl+iYHLS/8OoK+d1F9NraC0QRfHEZJGbHDJtgAAAAASUVORK5CYII=";
      oSpeechRecognizer.start();
    } else {
      document.getElementById("micimg").src =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXZJREFUSEu1lY8xA0EUh3/pICogFaACdEAFqAAVRDqIDuiACkQHVEAHqID5Mu9lnje7e3fjsjOZ3Ozt/r73/yba8ppsWV8ZcCtpKekrgY8lzSUd2P5K0o2kjy4DIwBxRF4lnQQI4s8FIYw47IJEwFQSlu0nCHtHkl4kXRjo3vaeJJ22vMghKkE+TWAWrOUc+4SI/eoqJTlDPO757I+pNgul9jJC3LpRAYhmyE6qrn954FbXEs/7UQDZk1jCowFqEK+uwUnOllHnjykneBKry8v2285tyrZEp7Z3rUsRotFoLH458Q/WfN7tNCPPTQCz6ErSnaRru8CouCxAPCfcOQ93moA9Se92glmDCFYxq0qexHDFbl9L1BLkXjDQGHyI5JXDtTAj/pzr28kAibeD8JJctfqk6YGXJmEhH6XVysnme9Lni0Y5kmz+GeWsN/PGx3fVkz6AaH2reyPkzHqnmuRKVDrnDxAqjsbszEENMmh/aIgGiXP4F5LaZBmw/bafAAAAAElFTkSuQmCC";

      oSpeechRecognizer.stop();
    }

    return;
  }

  oSpeechRecognizer = new webkitSpeechRecognition();
  oSpeechRecognizer.continuous = true;
  oSpeechRecognizer.interimResults = true;
  oSpeechRecognizer.lang = selLang.value;
  oSpeechRecognizer.start();

  oSpeechRecognizer.onresult = function (event) {
    var interimTranscripts = "";
    for (var i = event.resultIndex; i < event.results.length; i++) {
      var transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        txtMsg.value = transcript;
        Send();
      } else {
        transcript.replace("\n", "<br>");
        interimTranscripts += transcript;
      }

      var oDiv = document.getElementById("idText");
      oDiv.innerHTML =
        '<span style="color: #999;">' + interimTranscripts + "</span>";
    }
  };

  oSpeechRecognizer.onerror = function (event) {};
}
