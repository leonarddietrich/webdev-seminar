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

function setActiveWorkout(workoutType) {
  console.log("changeActiveWorkout() called");
  console.log("workoutType: " + workoutType);
  sessionStorage.setItem("activeWorkout", workoutType);
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

function addWorkoutType(event) {
  event.preventDefault();
  console.log("addWorkoutType() called");

  // Make sure the elements exist before trying to access their values
  var workoutTypeElement = document.getElementById("workoutType");

  if (!workoutTypeElement) {
    console.log("element 'workoutType' could not be found");
    return;
  }
  var workoutType = workoutTypeElement.value;
  var trainingData = getTrainingData();

  if (trainingDataContainsType(trainingData, workoutType)) {
    console.log("trainingData for 'workoutType' already exists");
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
  var weightElement = document.getElementById("weight");
  var repetitionsElement = document.getElementById("repetition");
  if (!weightElement || !repetitionsElement) {
    console.log("One or more elements could not be found");
    return;
  }
  var weight = parseFloat(weightElement.value);
  var repetitions = parseInt(repetitionsElement.value);
  if (!weight || weight <= 0 || !repetitions || repetitions <= 0) {
    console.log("weight or repetitions <= 0");
    return;
  }

  var workoutType = getActiveWorkout();
  var timecode = new Date().getTime();

  console.log(workoutType, new Date(timecode), repetitions, weight);

  var trainingData = getTrainingData();

  if (!trainingDataContainsType(trainingData, workoutType)) {
    console.log("trainingData for 'workoutType' not found");
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

  // add to first table entry
  var tableRef = document
    .getElementById("workoutDataDisplayTable")
    .getElementsByTagName("tbody")[0];
  if (!tableRef) {
    console.log("element 'workoutDataDisplayTable' could not be found");
    return;
  }
  var newRow = tableRef.insertRow(1);
  newRow.innerHTML = `<tr>
      <td>${new Date(timecode).toISOString().substring(0, 10)}</td>
      <td>${weight}</td>
      <td>${repetitions}</td>
      </tr>`;

  // refresh chart
  displayData(event);
}

function trainingDataContainsType(trainingData, workoutType) {
  console.log("trainingDataContainsType() called");
  return trainingData.find((element) => element.type === workoutType);
}

// get all workout types from training data
function getWorkoutTypes(tag) {
  console.log("getWorkoutTypes() called");
  var trainingData = getTrainingData();
  var workoutTypes = [];
  trainingData.forEach((element) => {
    if (tag) {
      if (element.tags.includes(tag)) workoutTypes.push(element.type);
    } else workoutTypes.push(element.type);
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
  var content = "";

  workoutTags.forEach((element) => {
    content += `<button onclick="displayWorkoutTypes('${element}')">${element}</button>`;
  });
  content += `<button onclick="displayWorkoutTypes()">RESET</button>`;
  workoutTagsDisplayElement.innerHTML = content;
}

// list workoutTypes
function displayWorkoutTypes(tag) {
  console.log("listTypes() called");

  var workoutTypeElement = document.getElementById("workoutTypeDisplay");
  if (!workoutTypeElement) {
    console.log("element 'workoutTypeList' could not be found");
    return;
  }
  var workoutTypes = getWorkoutTypes(tag);
  var content = "";
  workoutTypes.forEach((element) => {
    content += `<button><a href="sites/workout.html" onclick="setActiveWorkout('${element}')">${element}</a></button>`;
    // content += `<button onclick="changeActiveWorkout('${element}'); onclick="location.href='../sites/workout.html'"">${element}</button>`;
  });
  workoutTypeElement.innerHTML = content;
}

// list trainingData
function displayDataForWorkoutType() {
  console.log("displayDataForWorkoutType() called");

  var tableRef = document
    .getElementById("workoutDataDisplayTable")
    .getElementsByTagName("tbody")[0];
  if (!tableRef) {
    console.log("element 'workoutDataDisplayTable' could not be found");
    return;
  }

  var workoutType = getActiveWorkout();
  var trainingData = getTrainingData().find(
    (element) => element.type === workoutType
  );

  // reverse sets
  trainingData.sets.reverse();

  trainingData.sets.forEach((element) => {
    var date = new Date(element.timecode);
    var newRow = tableRef.insertRow();
    newRow.innerHTML = `<tr>
      <td>${date.toISOString().substring(0, 10)}</td>
      <td>${element.weight}</td>
      <td>${element.repetitions}</td>
      </tr>`;
  });
}
