var makeRequest = function(url, callback) {
    // create new XHR
    var request = new XMLHttpRequest();
    // open the request, passing in the HTTP request type, and the URL
    request.open("GET", url);
    // write an event listener for the request
    request.addEventListener("load", callback);
    // Go!
    request.send();
};
var requestComplete = function() {
  if (this.status !== 200) return;
  // get the data needed as a string
  var jsonString = this.responseText;
  // parse to convert it to JS object
  var returnedData = JSON.parse(jsonString);
  students = returnedData;
  setMenu(returnedData);
};
var app = function() {
  var url = "http://hp-api.herokuapp.com/api/characters/students";
  makeRequest(url, requestComplete);

  var studentSelect = document.getElementById("dropdown-students");
  studentSelect.addEventListener("change", function() {
    displayStudentDetails(this.value);
  });
};

var setMenu = function(students) {
  var top = document.getElementById("dropdown-students");
  for (student of students) {
    var newOption = document.createElement("option");
    newOption.textContent = student.name;
    newOption.name = student.name;
    newOption.house = student.house;
    top.appendChild(newOption);
  };
};

var displayStudentDetails = function(chosen) {
  for (student of students) {
    if (student.name === chosen) {
      var selectedStudent = student;
    };
  };

  var studentUl = createStudentUl();
  var studentName = createInfo("Name", selectedStudent.name);
  var studentHouse = createInfo("House", selectedStudent.house);
  var studentImage = createImage(selectedStudent.image);
  appendElements(studentUl, studentName, studentHouse, studentImage);
};

// create ul
var createStudentUl = function() {
  var ul = document.createElement("ul");
  return ul;
};

var createInfo = function(field, info) {
  var element = document.createElement("li");
  element.append(field + ": " + info);
  return element;
};

var createImage = function(src) {
  var element = document.createElement("img");
  element.src = src;
  return element;
};

var appendElements = function(studentUl, studentName, studentHouse, studentImage) {
  studentUl.appendChild(studentName);
  studentUl.appendChild(studentHouse);
  studentUl.appendChild(studentImage);

  var studentDetails = document.querySelector("#student");
  while (studentDetails.hasChildNodes()) {
    studentDetails.removeChild(studentDetails.lastChild);
  }
  studentDetails.appendChild(studentUl);
};





window.addEventListener("load", app);
