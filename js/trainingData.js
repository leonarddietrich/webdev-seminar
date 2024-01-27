console.log("trainingData.js loaded");

var trainingData = [
  {
    type: "benchpress",
    subTypeOf: "push",
    sets: [
      {
        timecode: new Date(2024, 1, 1, 20, 10, 3).getTime(),
        repetitions: 1,
        weight: 50,
      },
      {
        timecode: new Date(2024, 1, 1, 20, 13, 12).getTime(),
        repetitions: 45,
        weight: 3,
      },
      {
        timecode: new Date(2024, 1, 1, 20, 18, 1).getTime(),
        repetitions: 30,
        weight: 18,
      },
    ],
  },
];

sessionStorage.setItem("trainingData", JSON.stringify(trainingData));

// add a set to the trainingData
function addData(event) {
  event.preventDefault();
  console.log("addData() called");

  // Make sure the elements exist before trying to access their values
  var trainingTypeElement = document.getElementById("trainingType");
  var dateElement = new Date().getTime();
  var weightElement = document.getElementById("weight");
  var repetitionsElement = document.getElementById("repetition");

  if (
    !trainingTypeElement ||
    !dateElement ||
    !weightElement ||
    !repetitionsElement
  ) {
    console.log("One or more elements could not be found");
    return;
  }
  var trainingType = trainingTypeElement.value;
  var date = dateElement.value;
  var weight = weightElement.value;
  var repetitions = repetitionsElement.value;

  console.log(trainingType, date, repetitions, weight);

  trainingData
    .find((element) => element.type === trainingType)
    .sets.push({
      timecode: date,
      repetitions: repetitions,
      weight: weight,
    });
}
