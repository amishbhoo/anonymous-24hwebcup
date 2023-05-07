<?php
//Include the PHP functions to be used on the page 
include('common.php');
$titleName = "Onirix";
$name = "Dreams";
//Output header and navigation 
outputHeader($name);
outnav($name);
?>

<!-- <!DOCTYPE html> -->
<!-- <html> -->
<link href="./CSS/AI.css" type="text/css" rel="stylesheet">
<script src="./js/ai.js"></script>
  <body onload="OnLoad()">
    <div id="idContainer">

        <article class="l-design-widht"> 
            <div class="card">
              <img src="./assets/dream.png" style="width: 50%; margin-left: 25%; "></img><br><h2 style="margin-left: 15%; ">Tell us about your dream</h2>
              <label class="input">
                <input id="txtMsg" class="input__field" type="text" placeholder=" " />
                <span class="input__label"></span>
              </label>
              <div class="button-group">
                <button onclick="Send()" >Send</button>
                <label id="lblSpeak"
                ><input
                  style="display: none;"
                  id="chkSpeak"
                  type="checkbox"
                  onclick="SpeechToText()"
                /><img id="micimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAXZJREFUSEu1lY8xA0EUh3/pICogFaACdEAFqAAVRDqIDuiACkQHVEAHqID5Mu9lnje7e3fjsjOZ3Ozt/r73/yba8ppsWV8ZcCtpKekrgY8lzSUd2P5K0o2kjy4DIwBxRF4lnQQI4s8FIYw47IJEwFQSlu0nCHtHkl4kXRjo3vaeJJ22vMghKkE+TWAWrOUc+4SI/eoqJTlDPO757I+pNgul9jJC3LpRAYhmyE6qrn954FbXEs/7UQDZk1jCowFqEK+uwUnOllHnjykneBKry8v2285tyrZEp7Z3rUsRotFoLH458Q/WfN7tNCPPTQCz6ErSnaRru8CouCxAPCfcOQ93moA9Se92glmDCFYxq0qexHDFbl9L1BLkXjDQGHyI5JXDtTAj/pzr28kAibeD8JJctfqk6YGXJmEhH6XVysnme9Lni0Y5kmz+GeWsN/PGx3fVkz6AaH2reyPkzHqnmuRKVDrnDxAqjsbszEENMmh/aIgGiXP4F5LaZBmw/bafAAAAAElFTkSuQmCC"/></label
              >
              <label id="lblMute"
                ><input
                  style="display: none;"
                  id="chkMute"
                  type="checkbox"
                  onclick="Mute(this.checked)"
                /><img id="volimg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATVJREFUSEvVlWFxwkAQhb8oQAKgAHBQJOAAHOCgVEGpAsABDsAB4AAc1EE7L3PLbI4LBEhm4P5kcsnuu/d2315GwytrOD8vB9AHFoH1IDy3wBTYp9S4h8EM+HRJLPYv7E2AZQxSBcBOradfFjsG5kALuAC5BeBPfQCUbBdQfKzAbX8ISLZ8+Z8+gr6dhJZfgMC0TBLPQNKoDt/AEeimAPShHSW3U/sCxgB6V0LFW44RsI4ZxIFlFkkB/AQGxmIV5CxI9AyAGKptJfPGy+Rr8AyAV6OQ520A1AxqVZPoBOTdWBeDSkX+DW703aPiyZ21tKnoyTCxFwQok8lsVYx2lieWKNX3flQYm4dHRZmxVDwx610ZdjbC7x52Pmdj49qDGBvt2fiu7cIpk/Dq/q374KGkPqhxgH+/LFgZ/DdJbwAAAABJRU5ErkJggg=="/></label>
                <select id="selLang" onchange="ChangeLang(this)" style="display:none">
                    <option value="en-US">English (United States)</option>
                    <option value="fr-FR">French (France)</option>
                  </select>
              </div>
              <p id="message"> This can take a few seconds please wait <img id="loadingpic" src="./assets/R.gif"></img></p>
            </div>
            
          </article>
          
      <div>

      </div>

      <textarea
      id="txtOutput"
      rows="10"
      placeholder="Output"
    ></textarea>

    <section id="articles">
        <article class="article">
          <div class="article-wrapper">
            <figure>
              <img src="./assets/relation.png" alt="" />
            </figure>
            <div class="article-body">
              <h2>Relationships</h2>
              <p id="relcard"></p>
            </div>
          </div>
        </article>
        <article class="article">
      
          <div class="article-wrapper">
            <figure>
              <img src="./assets/career.png" alt="" />
            </figure>
            <div class="article-body">
              <h2>Career</h2>
              <p id="careercard"></p>
            </div>
          </div>
        </article>
        <article class="article">
      
          <div class="article-wrapper">
            <figure>
              <img src="./assets/health.png" alt="" />
            </figure>
            <div class="article-body">
              <h2>Health</h2>
              <p id="healthcard"></p>
             </span>
            </div>
          </div>
        </article>
      </section>
      <div id="idText"></div>
    </div>
  <!-- </body> -->
<!-- </html> -->

<?php
//output the Footer
outputFooter();
?>