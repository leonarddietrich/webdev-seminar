console.log("chart.js loaded");

var chart;

// load trainingData from sessionStorage
function getTrainingData() {
  console.log("getTrainingData() called");
  var trainingData = JSON.parse(localStorage.getItem("trainingData"));
  if (!trainingData) {
    trainingData = [];
  }
  return trainingData;
}

function getActiveWorkout() {
  console.log("getActiveWorkout() called");
  var activeWorkout = sessionStorage.getItem("activeWorkout");
  if (!activeWorkout) {
    console.log("activeWorkout not set");
    return;
  }
  return activeWorkout;
}

// refresh chart event
function displayData(event) {
  console.log("displayData() called");

  var trainingType = getActiveWorkout();
  if (!trainingType) {
    console.log("trainingType not set");
    return;
  }

  var trainingsData = getData(trainingType);
  displayChart(trainingsData);
}

// get data from sessionStorage
function getData(trainingType) {
  console.log("getData() called");
  console.log("trainingType: " + trainingType);
  var trainingData = getTrainingData();
  console.log(trainingData);
  var trainingsData = {
    dates: [],
    reps: [],
    weight: [],
  };

  trainingData
    .find((element) => element.type === trainingType)
    .sets.forEach((element) => {
      var date = new Date(element.timecode);
      trainingsData.dates.push(
        date.toISOString().substring(0, 10)
        // + " "
        // + date.toISOString().substring(11, 16) +" Uhr"
      );
      trainingsData.reps.push(element.repetitions);
      trainingsData.weight.push(element.weight);
    });

  console.log(trainingsData);
  return trainingsData;
}

// dispay chart with given data
function displayChart(dispayData) {
  console.log("displayChart() called");
  console.log(dispayData);
  const ctx = document.getElementById("myChart");
  if (chart) {
    chart.destroy();
  }

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: dispayData.dates,
      datasets: [
        {
          label: "weight x repetitions",
          data: multiplyArray(dispayData.weight, dispayData.reps),
          borderWidth: 5,
        },
      ],
    },
    options: {
      tension: 0.4,
    },
  });
}

function multiplyArray(array1, array2) {
  console.log("multiplyArray() called");
  console.log(array1);
  console.log(array2);
  var result = [];
  for (var i = 0; i < array1.length; i++) {
    result.push(array1[i] * array1[i] * array2[i]);
  }
  console.log(result);
  return result;
}