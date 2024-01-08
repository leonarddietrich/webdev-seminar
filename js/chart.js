console.log('chart.js loaded');

const exercices = {}

var trainingsData = {
  dates: ['2020-01-01', '2020-01-02', '2020-01-03'],
  reps: [1, 45, 30],
  weight: [50, 3, 18]
}
var chart;
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
window.onload = function() {
  console.log('window.onload() called');
  const today = new Date();
  const formattedDate = today.toISOString().substring(0, 10);
  document.getElementById('date').value = formattedDate;
  document.getElementById('weight').value = 1;
  document.getElementById('repetition').value = 1;
}

function test(){
  const htmlStuff = document.getElementById('test');
  if(testitest){
    htmlStuff.innerHTML = stiff;
  } else {
    htmlStuff.innerHTML = stuff;
  }
  testitest = !testitest;
}

function addData(event) {
  event.preventDefault();
  console.log('addData() called');

  // Make sure the elements exist before trying to access their values
  var dateElement = document.getElementById('date');
  var weightElement = document.getElementById('weight');
  var repsElement = document.getElementById('repetition');

  if (dateElement && weightElement && repsElement) {
    var date = dateElement.value;
    var weight = weightElement.value;
    var reps = repsElement.value;

    console.log(date, reps, weight);

    trainingsData.dates.push(date);
    trainingsData.weight.push(weight);
    trainingsData.reps.push(reps);

    displayData();
  } else {
    console.log('One or more elements could not be found');
  }
}

function displayData() {
  displayChart(trainingsData);
}

// dispay chart with given data
function displayChart(dispayData) {
  console.log('displayChart() called');
  console.log(dispayData);
  const ctx = document.getElementById('myChart');

  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dispayData.dates,
      datasets: [{
        label: 'repetitions x weight',
        data: multiplyArray(dispayData.reps,dispayData.weight),
        borderWidth: 5
      }]
    },
    options: {
      tension: 0.4,
    }
  });
}

function multiplyArray(array1, array2) {
  console.log('multiplyArray() called');
  console.log(array1);
  console.log(array2);
  var result = [];
  for (var i = 0; i < array1.length; i++) {
    result.push(array1[i] * array2[i]);
  }
  console.log(result);
  return result;
}