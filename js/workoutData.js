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
  // do nothin if trainingData already exists
  if (getTrainingData().length > 0) {
    return;
  }
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
  var workoutTypeElement = document.getElementById("workoutType");

  if (!workoutTypeElement) {
    console.log("element 'workoutType' could not be found");
    return;
  }
  var workoutType = workoutTypeElement.value;
  var trainingData = getTrainingData();

  if (trainingDataContainsType(trainingData, workoutType)) {
    console.log("trainingData for 'traingingType' already exists");
    return;
  }

  trainingData.push({
    type: workoutType,
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
  var workoutTypeElement = document.getElementById("workoutType");
  var weightElement = document.getElementById("weight");
  var repetitionsElement = document.getElementById("repetition");

  if (!workoutTypeElement || !weightElement || !repetitionsElement) {
    console.log("One or more elements could not be found");
    return;
  }
  var workoutType = workoutTypeElement.value;
  var timecode = new Date().getTime();
  var weight = parseFloat(weightElement.value);
  var repetitions = parseInt(repetitionsElement.value);

  console.log(workoutType, new Date(timecode), repetitions, weight);

  var trainingData = getTrainingData();

  if (!trainingDataContainsType(trainingData, workoutType)) {
    console.log("trainingData for 'traingingType' not found");
    return;
  }

  trainingData
    .find((element) => element.type === workoutType)
    .sets.push({
      timecode: timecode,
      repetitions: repetitions,
      weight: weight,
    });

  setTrainingData(trainingData);
}

function trainingDataContainsType(trainingData, workoutType) {
  console.log("trainingDataContainsType() called");
  return trainingData.find((element) => element.type === workoutType);
}

// get all workout types from training data
function getWorkoutTypes() {
  console.log("getWorkoutTypes() called");
  var trainingData = getTrainingData();
  var workoutTypes = [];
  trainingData.forEach((element) => {
    workoutTypes.push(element.type);
  });
  return workoutTypes;
}

// rename workoutType in trainingData
function renameTrainingType(event) {
  event.preventDefault();
  console.log("renameTrainingType() called");

  // Make sure the elements exist before trying to access their values
  var workoutTypeElement = document.getElementById("workoutType");
  var newworkoutTypeElement = document.getElementById("newTrainingType");

  if (!workoutTypeElement || !newworkoutTypeElement) {
    console.log("One or more elements could not be found");
    return;
  }
  var workoutType = workoutTypeElement.value;
  var newTrainingType = newworkoutTypeElement.value;

  var trainingData = getTrainingData();
  trainingData.find((element) => element.type === workoutType).type =
    newTrainingType;
  setTrainingData(trainingData);
}

// revmove workoutType from trainingData
function removeTrainingType(event) {
  event.preventDefault();
  console.log("removeTrainingType() called");

  // Make sure the elements exist before trying to access their values
  var workoutTypeElement = document.getElementById("workoutType");

  if (!workoutTypeElement) {
    console.log("element 'workoutType' could not be found");
    return;
  }
  var workoutType = workoutTypeElement.value;

  var trainingData = getTrainingData();
  trainingData = trainingData.filter((element) => element.type !== workoutType);
  setTrainingData(trainingData);
}

function displayWorkoutTags() {
  console.log("displayTags() called");

  var workoutTagsDisplayElement = document.getElementById("workoutTagsDisplay");
  if (!workoutTagsDisplayElement) {
    console.log("element 'workoutTagsDisplay' could not be found");
    return;
  }

  var trainingData = getTrainingData();
  var workoutTags = [];
  trainingData.forEach((element) => {
    console.log(element.type + " => " + element.tags);
    if (element.tags.length > 0) workoutTags.push(element.tags);
  });
  console.log("workoutTags: " + workoutTags);
  workoutTagsDisplayElement.innerHTML = "";
  workoutTags.forEach((element) => {
    workoutTagsDisplayElement.innerHTML += `<button>${element}</button>`;
  });
}

// list workoutTypes
function displayWorkoutTypes() {
  console.log("listTypes() called");

  var workoutTypeElement = document.getElementById("workoutTypeDisplay");
  if (!workoutTypeElement) {
    console.log("element 'workoutTypeList' could not be found");
    return;
  }

  var workoutTypes = getWorkoutTypes();
  workoutTypeElement.innerHTML = "";
  workoutTypes.forEach((element) => {
    workoutTypeElement.innerHTML += `<button>${element}</button>`;
  });
}

// list trainingData
function displayDataForTrainingType(traingingType) {
  console.log("listData() called");
  console.log("workoutType: " + traingingType);

  var trainingData = getTrainingData().find(
    (element) => element.type === traingingType
  );
  console.log(trainingData);

  trainingData.sets.forEach((element) => {
    console.log(element);
  });
}
