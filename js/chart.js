console.log("chart.js loaded");

// var trainingsData = {
//   dates: ["2020-01-01", "2020-01-02", "2020-01-04"],
//   reps: [1, 45, 30],
//   weight: [50, 3, 18],
// };

var chart;

// refresh chart event
function displayData(event) {
  // event.preventDefault();
  console.log("displayData() called");

  // Make sure the elements exist before trying to access their values
  var trainingTypeElement = document.getElementById("trainingType");
  if (!trainingTypeElement) {
    console.log("element 'trainingType' could not be found");
    return;
  }
  var trainingType = trainingTypeElement.value;

  var trainingsData = getData(trainingType);
  displayChart(trainingsData);
}

// get data from sessionStorage
function getData(trainingType) {
  console.log("getData() called");
  console.log("trainingType: " + trainingType);
  var trainingData = JSON.parse(sessionStorage.getItem("trainingData"));
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
        date.toISOString().substring(0, 10) +
          " " +
          date.toISOString().substring(11, 16) +
          " Uhr"
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
          label: "repetitions x weight",
          data: multiplyArray(dispayData.reps, dispayData.weight),
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
    result.push(array1[i] * array2[i]);
  }
  console.log(result);
  return result;
}
