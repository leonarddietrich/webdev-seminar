console.log("trainingData.js loaded");

onload = initTrainingData();

// load trainingData from sessionStorage
function getTrainingData() {
  console.log("getTrainingData() called");
  var trainingData = JSON.parse(sessionStorage.getItem("trainingData"));
  if (!trainingData) {
    trainingData = [];
    sessionStorage.setItem("trainingData", JSON.stringify(trainingData));
  }
  return trainingData;
}

// save trainingData to sessionStorage
function setTrainingData(trainingData) {
  console.log("setTrainingData() called");
  sessionStorage.setItem("trainingData", JSON.stringify(trainingData));
}

// inistialize trainingData
function initTrainingData() {
  console.log("initTrainingData() called");
  var trainingData = [
    {
      type: "benchpress",
      tags: ["push"],
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
  setTrainingData(trainingData);
}

function addTrainingType(event) {
  event.preventDefault();
  console.log("addTrainingType() called");

  // Make sure the elements exist before trying to access their values
  var trainingTypeElement = document.getElementById("trainingType");

  if (!trainingTypeElement) {
    console.log("element 'trainingType' could not be found");
    return;
  }
  var trainingType = trainingTypeElement.value;
  var trainingData = getTrainingData();

  if (trainingDataContainsType(trainingData, trainingType)) {
    console.log("trainingData for 'traingingType' already exists");
    return;
  }

  trainingData.push({
    type: trainingType,
    tags: [],
    sets: [],
  });

  setTrainingData(trainingData);
}

// add a set to the trainingData
function addData(event) {
  event.preventDefault();
  console.log("addData() called");

  // Make sure the elements exist before trying to access their values
  var trainingTypeElement = document.getElementById("trainingType");
  var weightElement = document.getElementById("weight");
  var repetitionsElement = document.getElementById("repetition");

  if (!trainingTypeElement || !weightElement || !repetitionsElement) {
    console.log("One or more elements could not be found");
    return;
  }
  var trainingType = trainingTypeElement.value;
  var timecode = new Date().getTime();
  var weight = weightElement.value;
  var repetitions = repetitionsElement.value;

  console.log(trainingType, new Date(timecode), repetitions, weight);

  var trainingData = getTrainingData();

  if (!trainingDataContainsType(trainingData, trainingType)) {
    console.log("trainingData for 'traingingType' not found");
    return;
  }

  trainingData
    .find((element) => element.type === trainingType)
    .sets.push({
      timecode: timecode,
      repetitions: repetitions,
      weight: weight,
    });

  setTrainingData(trainingData);
}

function trainingDataContainsType(trainingData, trainingType) {
  console.log("trainingDataContainsType() called");
  return trainingData.find((element) => element.type === trainingType);
}

// get all trainingTypes from trainingData
function getTrainingTypes() {
  console.log("getTrainingTypes() called");
  var trainingData = getTrainingData();
  var trainingTypes = [];
  trainingData.forEach((element) => {
    trainingTypes.push(element.type);
  });
  return trainingTypes;
}

// rename trainingType in trainingData
function renameTrainingType(event) {
  event.preventDefault();
  console.log("renameTrainingType() called");

  // Make sure the elements exist before trying to access their values
  var trainingTypeElement = document.getElementById("trainingType");
  var newTrainingTypeElement = document.getElementById("newTrainingType");

  if (!trainingTypeElement || !newTrainingTypeElement) {
    console.log("One or more elements could not be found");
    return;
  }
  var trainingType = trainingTypeElement.value;
  var newTrainingType = newTrainingTypeElement.value;

  var trainingData = getTrainingData();
  trainingData.find((element) => element.type === trainingType).type =
    newTrainingType;
  setTrainingData(trainingData);
}

// revmove trainingType from trainingData
function removeTrainingType(event) {
  event.preventDefault();
  console.log("removeTrainingType() called");

  // Make sure the elements exist before trying to access their values
  var trainingTypeElement = document.getElementById("trainingType");

  if (!trainingTypeElement) {
    console.log("element 'trainingType' could not be found");
    return;
  }
  var trainingType = trainingTypeElement.value;

  var trainingData = getTrainingData();
  trainingData = trainingData.filter(
    (element) => element.type !== trainingType
  );
  setTrainingData(trainingData);
}

// list trainingData
function listData(traingingType) {
  console.log("listData() called");
  console.log("trainingType: " + traingingType);
  var trainingData = getTrainingData().find(
    (element) => element.type === traingingType
  );
  console.log(trainingData);

  trainingData.sets.forEach((element) => {
    console.log(element);
  });
}
