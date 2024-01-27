console.log("utility.js loaded");

var testitest = true;
var stuff = `
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
`;

var stiff = `
<h1>Test</h1>
`;

// set default values for date, weight and repetitions
window.onload = function () {
  console.log("window.onload() called");
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);
  document.getElementById("date").value = formattedDate;
  document.getElementById("weight").value = 1;
  document.getElementById("repetition").value = 1;
};

function test() {
  const htmlStuff = document.getElementById("test");
  if (testitest) {
    htmlStuff.innerHTML = stiff;
  } else {
    htmlStuff.innerHTML = stuff;
  }
  testitest = !testitest;
}
