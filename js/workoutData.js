console.log("trainingData.js loaded");

// function getLocalTrainingData() {
//   console.log("getLocalTrainingData() called");
//   var trainingData = JSON.parse(localStorage.getItem("trainingData"));
//   if (!trainingData) {
//     trainingData = [];
//   }
//   return trainingData;
// }

// function setLocalTrainingData(trainingData) {
//   console.log("setLocalTrainingData() called");
//   localStorage.setItem("trainingData", JSON.stringify(trainingData));
// }

// load trainingData from sessionStorage
function getTrainingData() {
  console.log("getTrainingData() called");
  var trainingData = JSON.parse(localStorage.getItem("trainingData"));
  if (!trainingData) {
    trainingData = [];
    localStorage.setItem("trainingData", JSON.stringify(trainingData));
  }
  return trainingData;
}

// save trainingData to sessionStorage
function setTrainingData(trainingData) {
  console.log("setTrainingData() called");
  localStorage.setItem("trainingData", JSON.stringify(trainingData));
}

function setActiveWorkout(workoutType) {
  console.log("setActiveWorkout() called");
  sessionStorage.setItem("activeWorkout", workoutType);
}

function getActiveWorkout() {
  console.log("getActiveWorkout() called");
  var activeWorkout = sessionStorage.getItem("activeWorkout");
  if (!activeWorkout) {
    console.log("activeWorkout not set");
    return "";
  }
  return activeWorkout;
}

function setActiveWorkoutTags(tags) {
  console.log("setActiveWorkoutTags() called");
  sessionStorage.setItem("activeWorkoutTags", JSON.stringify(tags));
}

function getActiveWorkoutTags() {
  console.log("getActiveWorkoutTags() called");
  var activeWorkout = JSON.parse(sessionStorage.getItem("activeWorkoutTags"));
  if (!activeWorkout) {
    console.log("activeWorkoutTags not set");
    setActiveWorkoutTags([]);
    return [];
  }
  return activeWorkout;
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
  if (!workoutType) {
    console.log("workoutType not set");
    return;
  }
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
function getWorkoutTypes() {
  console.log("getWorkoutTypes() called");
  var trainingData = getTrainingData();
  var workoutTypes = [];
  var activeWorkoutTags = getActiveWorkoutTags();
  trainingData.forEach((element) => {
    if (
      Array.isArray(activeWorkoutTags) &&
      activeWorkoutTags.every((tag) => element.tags.includes(tag))
    )
      workoutTypes.push(element.type);
    else if (!activeWorkoutTags) workoutTypes.push(element.type);
  });
  return workoutTypes;
}

// rename workoutType in trainingData
function renameWorkout(event) {
  console.log("renameWorkout() called");

  var newWorkoutTypeElement = document.getElementById("newWorkoutType");

  if (!newWorkoutTypeElement) {
    console.log("element 'newWorkoutType' could not be found");
    return;
  }

  var currentWorkoutType = getActiveWorkout();
  var newWorkoutType = newWorkoutTypeElement.value;

  var trainingData = getTrainingData();
  trainingData.find((element) => element.type === currentWorkoutType).type =
    newWorkoutType;
  setTrainingData(trainingData);
  setActiveWorkout(newWorkoutType);
}

// revmove workoutType from trainingData
function deleteWorkout(event) {
  console.log("deleteWorkout() called");

  var currentWorkoutType = getActiveWorkout();
  var trainingData = getTrainingData();
  trainingData = trainingData.filter(
    (element) => element.type !== currentWorkoutType
  );
  setTrainingData(trainingData);
}

function activateWorkoutTag(tag) {
  console.log("activateWorkoutTag() called");
  var workoutTags = getActiveWorkoutTags();
  workoutTags.push(tag);
  setActiveWorkoutTags(workoutTags);
  displayWorkoutTags();
  displayWorkoutTypes();
}

function deactivateWorkoutTag(tag) {
  console.log("deactivateWorkoutTag() called");
  var workoutTags = getActiveWorkoutTags();
  workoutTags = workoutTags.filter((element) => element !== tag);
  setActiveWorkoutTags(workoutTags);
  displayWorkoutTags();
  displayWorkoutTypes();
}

function resetTags() {
  console.log("resetTags() called");
  setActiveWorkoutTags([]);
  displayWorkoutTags();
  displayWorkoutTypes();
}

function getUsableWorkoutTags() {
  console.log("getUsableWorkoutTags() called");
  var trainingData = getTrainingData();
  var usedWorkoutTags = getActiveWorkoutTags();
  var usableWorkoutTags = [];
  trainingData.forEach((element) => {
    if (element.tags.length > 0) {
      if (usedWorkoutTags.length == 0) {
        usableWorkoutTags.push(element.tags);
      } else if (usedWorkoutTags.every((tag) => element.tags.includes(tag))) {
        usableWorkoutTags.push(
          element.tags.filter((tag) => !usedWorkoutTags.includes(tag))
        );
      }
    }
  });
  console.log(usableWorkoutTags.flat());
  return usableWorkoutTags.flat();
}

function displayWorkoutTags() {
  console.log("displayTags() called");

  var workoutTagsDisplayElement = document.getElementById("workoutTagsDisplay");
  if (!workoutTagsDisplayElement) {
    console.log("element 'workoutTagsDisplay' could not be found");
    return;
  }

  var usableWorkoutTags = getUsableWorkoutTags();
  var content = "";

  usableWorkoutTags.forEach((element) => {
    content += `<button onclick="activateWorkoutTag('${element}')">${element}</button>`;
  });

  var activeWorkoutTags = getActiveWorkoutTags();
  if (Array.isArray(activeWorkoutTags)) {
    activeWorkoutTags.forEach((element) => {
      content += `<button onclick="deactivateWorkoutTag('${element}')">${element}</button>`;
    });
  }

  content += `<button onclick="resetTags()">RESET</button>`;
  workoutTagsDisplayElement.innerHTML = content;
}

// list workoutTypes
function displayWorkoutTypes() {
  console.log("displayWorkoutTypes() called");

  var workoutTypeElement = document.getElementById("workoutTypeDisplay");
  if (!workoutTypeElement) {
    console.log("element 'workoutTypeList' could not be found");
    return;
  }
  var workoutTypes = getWorkoutTypes();
  var content = "";
  workoutTypes.forEach((element) => {
    content += `<button class="col"><a href="sites/workout.html" onclick="setActiveWorkout('${element}')">${element}</a></button>`;
    // content += `<button onclick="changeActiveWorkout('${element}'); onclick="location.href='../sites/workout.html'"">${element}</button>`;
  });
  workoutTypeElement.innerHTML = content;
}

// list training data
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

  // reverse sets so the newest is displayed on top
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

function downloadData() {
  console.log("downloadData() called");
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(getTrainingData()));
  var dlAnchorElem = document.getElementById("downloadAnchorElem");
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute(
    "download",
    "gain_training_data_" + new Date().toISOString().substring(0, 10) + ".json"
  );
  dlAnchorElem.click();
}

// get uploaded file
function replaceUploadedData() {
  console.log("replaceUploadedData() called");
  // get file from file input field
  var input = document.getElementById("uploadedTrainingData");
  if (!input) {
    console.log("input element 'uploadedTrainingData' not found");
    return;
  }
  console.log(input);

  var file = input.files.length > 0 ? input.files[0] : null;
  console.log(file);
  if (!file) {
    console.log("no file uploaded");
    return;
  }
  var reader = new FileReader();
  reader.onload = function (event) {
    var trainingData = JSON.parse(event.target.result);
    console.log("uploaded TrainingData: " + trainingData);
    setTrainingData(trainingData);
  };
  reader.readAsText(file);
}

function mergeUploadedData() {
  console.log("mergeUploadedData() called");
  // get file from file input field
  var input = document.getElementById("uploadedTrainingData");
  if (!input) {
    console.log("input element 'uploadedTrainingData' not found");
    return;
  }
  console.log(input);

  var file = input.files.length > 0 ? input.files[0] : null;
  console.log(file);
  if (!file) {
    console.log("no file uploaded");
    return;
  }
  var reader = new FileReader();
  reader.onload = function (event) {
    var trainingData = JSON.parse(event.target.result);
    console.log("uploaded TrainingData: " + trainingData);
    var currentTrainingData = getTrainingData();
    trainingData.forEach((element) => {
      if (!trainingDataContainsType(currentTrainingData, element.type)) {
        currentTrainingData.push(element);
      } else {
        currentWorkout = currentTrainingData.find(
          (currentWorkout) => currentWorkout.type === element.type
        );
        currentWorkout.tags = currentWorkout.tags.concat(element.tags);
        currentWorkout.sets = currentWorkout.sets
          .concat(element.sets)
          .sort((a, b) => a.timecode - b.timecode);
      }
    });
    setTrainingData(currentTrainingData);
  };
  reader.readAsText(file);
}

function setWorkoutTitle() {
  var workoutTitleElement = document.getElementById("workoutTitle");
  if (!workoutTitleElement) {
    console.log("element 'workoutTitle' could not be found");
    return;
  }
  var workoutType = getActiveWorkout();
  workoutType = workoutType.charAt(0).toUpperCase() + workoutType.slice(1);
  workoutTitleElement.innerHTML = workoutType;
}

function displayTagsForWorkout() {
  console.log("displayTagsForWorkout() called");
  var tagsElement = document.getElementById("tagsForWorkoutDisplay");
  if (!tagsElement) {
    console.log("element 'tagsForWorkoutDisplay' could not be found");
    return;
  }
  var workoutType = getActiveWorkout();
  var trainingData = getTrainingData().find(
    (element) => element.type === workoutType
  );
  var content = "";
  trainingData.tags.forEach((element) => {
    content += `<button>${element}</button>`;
  });
  tagsElement.innerHTML = content;
}

function addTagToWorkout() {
  console.log("addTagToWorkout() called");
  var tagElement = document.getElementById("addTagInput");
  if (!tagElement) {
    console.log("element 'addTagInput' could not be found");
    return;
  }
  var tag = tagElement.value;
  if (!tag) {
    console.log("tag not set");
    return;
  }
  var workoutType = getActiveWorkout();
  var trainingData = getTrainingData();
  trainingData.find((element) => element.type === workoutType).tags.push(tag);
  setTrainingData(trainingData);

  displayTagsForWorkout();
}
