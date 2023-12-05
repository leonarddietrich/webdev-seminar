console.log('chart.js loaded');
var trainingsData = {
  dates: ['2020-01-01', '2020-01-02', '2020-01-03'],
  reps: [1, 45, 30],
  weight: [50, 3, 18]
}

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


function test(){
  const htmlStuff = document.getElementById('test');
  if(testitest){
    htmlStuff.innerHTML = stiff;
  } else {
    htmlStuff.innerHTML = stuff;
  }
  testitest = !testitest;
}

function addData(inputData) {
  console.log('addData() called');
  console.log(inputData);

  var date = new Date();
  console.log(date);
  // console.log(inputData.date);
  // trainingsData.date.push(inputData.getElementById('date').value);
  // trainingsData.reps.push(inputData.reps);
  // trainingsData.weight.push(inputData.weight);
  dispayData();
}

function displayData(){
  console.log('dispayData() called');
  displayChart(trainingsData);
}

// dispay chart with given data
function displayChart(dispayData) {
  console.log('displayChart() called');
  console.log(dispayData);
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
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
