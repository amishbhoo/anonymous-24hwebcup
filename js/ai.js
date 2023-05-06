var OPENAI_API_KEY = "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";
var start_question =
  "Can you please give me the meaning of this dreams? - ";

function Send() {
    var sQuestion = txtMsg.value;
    if (sQuestion == "") {
      alert("Type in your question!");
      txtMsg.focus();
      return;
    }
  
    var oHttp = new XMLHttpRequest();
    oHttp.open("POST", "https://api.openai.com/v1/completions");
    oHttp.setRequestHeader("Accept", "application/json");
    oHttp.setRequestHeader("Content-Type", "application/json");
    oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY);
  
    oHttp.onreadystatechange = function () {
      if (oHttp.readyState === 4) {
        //console.log(oHttp.status);
        var oJson = {};
        if (txtOutput.value != "") txtOutput.value += "\n";
  
        try {
          oJson = JSON.parse(oHttp.responseText);
        } catch (ex) {
          txtOutput.value += "Error: " + ex.message;
        }
        var s = oJson.choices[0].text;
        
        
        if (s == "") s = "No response";
        txtOutput.value += "Orinix : " + s;
    };
}
  
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