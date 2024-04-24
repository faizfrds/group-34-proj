//dummy data
const courseInfo = [
  {
    name: "CS220",
  },
  {
    name: "CS230",
  },
  {
    name: "CS240",
  },
  {
    name: "CS250",
  },
  {
    name: "MATH235",
  },
];

const calendarInfo = [
  {
    class: "CS220",
    monday: ["Assignment 1", "Lab Report"],
    tuesday: ["Homework 1"],
    wednesday: ["Quiz 1"],
    thursday: ["Project Proposal", "Reading Assignment"],
    friday: ["Group Project Meeting"],
    saturday: [],
    sunday: ["Research Paper"],
  },
  {
    class: "CS230",
    monday: ["Lab Report", "Assignment 1"],
    tuesday: [],
    wednesday: ["Homework 1", "Quiz 1"],
    thursday: ["Group Discussion"],
    friday: [],
    saturday: ["Project Presentation"],
    sunday: [],
  },
  {
    class: "CS240",
    monday: ["Quiz 1"],
    tuesday: ["Lab Report", "Assignment 1"],
    wednesday: ["Homework 1"],
    thursday: ["Project Proposal", "Reading Assignment"],
    friday: ["Group Project Meeting"],
    saturday: [],
    sunday: ["Research Paper"],
  },
  {
    class: "CS250",
    monday: ["Group Discussion"],
    tuesday: [],
    wednesday: ["Lab Report", "Assignment 1"],
    thursday: ["Project Presentation"],
    friday: ["Quiz 1"],
    saturday: [],
    sunday: ["Homework 1"],
  },
  {
    class: "MATH235",
    monday: ["Quiz 1"],
    tuesday: ["Lab Report", "Assignment 1"],
    wednesday: [],
    thursday: ["Project Proposal", "Reading Assignment"],
    friday: [],
    saturday: ["Group Project Meeting"],
    sunday: ["Research Paper"],
  },
];

const reviewInfo = [
  {
    class: "CS220",
    Beginner: ["linked lists","lecture 14"],
    AlmostThere: ["recursion", "higher order function","lecture 12"],
    Mastered: ["lecture 1, lecture 2 "]

  },
  {
    class: "CS230",
    Beginner: ["Pointers", "Memory Allocation"],
    AlmostThere: ["C Syntax", "Dynamic Arrays"],
    Mastered: ["Basic IO", "Control Structures"]
  },
  {
    class: "CS240",
    Beginner: ["Combinatorics", "Bayes' Theorem"],
    AlmostThere: ["Probability Distributions", "Expected Value"],
    Mastered: ["Conditional Probability", "Independent Events"]
  },
  {
    class: "CS250",
    Beginner: ["Predicate Logic", "Set Theory"],
    AlmostThere: ["Combinatorics", "Boolean Algebra"],
    Mastered: ["Graph Theory", "Modular Arithmetic"]
  },
  {
    class: "MATH235",
    Beginner: ["Linear Transformations", "Matrix Operations"],
    AlmostThere: ["Subspaces", "Dimension Theorem"],
    Mastered: ["Determinants", "Inner Product Spaces"]
  },
];


import Store from './store.js';

//Code for running dashboard and accessing classes 
const dashboard = document.getElementById("class-dashboard");
const loadingElement = document.getElementById("loading-display");
const currentClassNameElement = document.getElementById("current-class-name");
const dashboardButton = document.getElementById("nav-dashboard");
const classNavReview = document.getElementById("class-review-nav");
const classHomeButton = document.getElementById("class-home-nav");

//tracks what course were currently in
let currCourse =''; 

//function to navigate between 
function navigate(viewId) {
  // Hide all views
  document.querySelectorAll(".view").forEach((view) => {
    view.style.display = "none";
  });

  // Show the requested view
  document.getElementById(viewId).style.display = "block";
}

const store = new Store('myDatabase'); // Initialize the Store class with a database name

const addClasses = () => {
  loadingElement.textContent = "Loading classes...";
  setTimeout(() => {
    courseInfo.forEach((course) => {
      let courseElem = document.createElement("div");
      courseElem.className = "bg-blue-100 hover:bg-blue-200 hover:cursor-pointer hover:shadow-xl hover:shadow-zinc-400 transition p-4 m-5 text-center rounded-md";

      let namePic = document.createElement("div");
      namePic.className = "justify-center flex flex-col text-center";

      let courseName = document.createElement("p");
      courseName.className = "text-lg font-semibold";
      courseName.textContent = course.name;

      let picContainer = document.createElement("div");
      picContainer.className = "rounded-full m-4 justify-center flex";
      let pic = document.createElement("img");
      pic.src = `images/${course.id}.png`; 
      pic.height = "250";
      pic.width = "250";
      pic.style = "border:2px solid black; margin-top: 10px; margin-bottom:10px; border-radius:10px";
      picContainer.appendChild(pic);

      namePic.appendChild(picContainer);
      namePic.appendChild(courseName);

      courseElem.appendChild(namePic);

      // Adds a click event listener to each course element
      courseElem.addEventListener('click', async () => {
        currCourse = course;
        const currCourseName = course.name;
        console.log("course clicked was", currCourseName);
        await populateClass(course); // Call populateClass instead of your previous code
        updateCurrentClassName(course.name); // Update the class name in the navbar
        classNavReview.classList.remove('hidden');
        classHomeButton.classList.remove('hidden');
        navigate("class-view");
      });

      dashboard.appendChild(courseElem);
      loadingElement.textContent = "";
      loadingElement.className = "";
    });
  }, Math.random() * 2000);
};

addClasses();

const updateCurrentClassName = (className) => {
  currentClassNameElement.textContent = ": "+className; // Set the class name
};

const populateClass = async (course) => {
  let courseToDoData;
  let courseReviewData;

  // Check if class data is saved in PouchDB
  const isDataInPouchDB = await store.getData(course.name);
  if (isDataInPouchDB) {
    console.log(`Loading ${course.name} data from PouchDB.`);
    courseToDoData = isDataInPouchDB.toDoData;
    courseReviewData = isDataInPouchDB.reviewData;
    displayClassData(courseToDoData, courseReviewData);
  } else {
    // Check if class data is saved in local storage
    const isDataInLocalStorage = await store.getData(course.name);
    if (isDataInLocalStorage) {
      console.log(`Loading ${course.name} data from local storage.`);
      courseToDoData = isDataInLocalStorage.toDoData;
      courseReviewData = isDataInLocalStorage.reviewData;
      displayClassData(courseToDoData, courseReviewData);
    } else {
      // Data not in PouchDB or local storage, generate it
      console.log(`Generating data for ${course.name}.`);
      courseToDoData = calendarInfo.find(c => c.class === course.name);
      courseReviewData = reviewInfo.find(c => c.class === course.name);
      
      // Save the generated data to PouchDB and local storage
      await store.saveData(course.name, { toDoData: courseToDoData, reviewData: courseReviewData });
      
      displayClassData(courseToDoData, courseReviewData);
    }
  }
};

const displayClassData = (courseToDoData, courseReviewData) => {
  // Populate to do calendar 
  const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  daysOfWeek.forEach(day => {
    const assignments = courseToDoData[day];
    const toDoElement = document.getElementById(`${day}-tasks`);
    if (assignments.length > 0) {
      toDoElement.innerHTML = assignments.join("<br>");
    }
  });

  // Populate review section 
  const reviewContainer = document.getElementById('review-items-container');
  reviewContainer.innerHTML = ''; // Clear previous content
  const masteryLevels = ["Beginner", "AlmostThere", "Mastered"];
  masteryLevels.forEach(level => {
    const reviews = courseReviewData[level];
    if (level === "Mastered") {
      return; // If the content has been mastered we can ignore
    }
    if (reviews && reviews.length > 0) {
      reviews.forEach(reviewItem => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        const reviewTitle = document.createElement('h3');
        reviewTitle.textContent = reviewItem;
        const reviewStatus = document.createElement('span');
        reviewStatus.className = `status ${level.toLowerCase()}`;
        reviewStatus.textContent = level.replace(/([A-Z])/g, ' $1').trim();
        reviewElement.appendChild(reviewTitle);
        reviewElement.appendChild(reviewStatus);
        reviewContainer.appendChild(reviewElement);
      });
    }
  });
};

const populateClassReview = async (course) => {
  // Check if review data is saved in local storage or PouchDB
  const localReviewData = await store.getData(course.name);
  if (localReviewData && localReviewData.reviewData) {
    // If review data is found in local storage or PouchDB, use it
    displayReviewData(localReviewData.reviewData);
  } else {
    // If review data is not found in local storage or PouchDB, generate page 
    const courseReviewData = reviewInfo.find(c => c.class === course.name);
    if (courseReviewData) {
      displayReviewData(courseReviewData);
    } else {
      console.error(`Review data not found for ${course.name}`);
    }
  }

  // Navigate to the review view
  navigate("class-review-view");
};

const displayReviewData = (reviewData) => {
  const reviewContainer = document.getElementById('reviewPage-items-container');
  reviewContainer.innerHTML = ''; // Clear previous content
  const masteryLevels = ["Beginner", "AlmostThere", "Mastered"];
  masteryLevels.forEach(level => {
    const reviews = reviewData[level];
    if (reviews && reviews.length > 0) {
      reviews.forEach(reviewItem => {
        const reviewElement = document.createElement('div');
        reviewElement.className = 'review-item';
        const reviewTitle = document.createElement('h3');
        reviewTitle.textContent = reviewItem;
        const reviewStatus = document.createElement('span');
        reviewStatus.className = `status ${level.toLowerCase()}`;
        reviewStatus.textContent = level.replace(/([A-Z])/g, ' $1').trim();
        reviewElement.appendChild(reviewTitle);
        reviewElement.appendChild(reviewStatus);
        reviewContainer.appendChild(reviewElement);
      });
    }
  });
};


// Function to populate the course select input
function populateCourseSelect() {
  const courseSelect = document.getElementById('course-name-input');
  courseInfo.forEach(course => {
    let option = document.createElement('option');
    option.value = course.name;
    option.textContent = course.name;
    courseSelect.appendChild(option);
  });
}

populateCourseSelect();

function addAssignmentToCalendar(courseName, dayOfWeek, assignmentDescription) {
  const courseCalendar = calendarInfo.find(course => course.class === courseName);
  if (courseCalendar) {
    if (courseCalendar[dayOfWeek]) {
      courseCalendar[dayOfWeek].push(assignmentDescription);
    } else {
      courseCalendar[dayOfWeek] = [assignmentDescription];
    }
  }
}

//Code for for handling multi page view

document.addEventListener("DOMContentLoaded", () => {
  navigate("home-view");
  document
  .getElementById("nav-dashboard")
  .addEventListener("click", () => navigate("home-view"));
  document
  .getElementById("nav-assignment")
  .addEventListener("click", () => navigate("#assignment-view"));
document
  .getElementById("nav-calendar")
  .addEventListener("click", () => navigate("#calendar-view"));

// Initialize with the home view
navigate("home-view");
});

dashboardButton.addEventListener("click",() => {
  classNavReview.classList.add('hidden');
  classHomeButton.classList.add('hidden');
  currentClassNameElement.textContent = ': Class Dashboard'})

  classHomeButton.addEventListener('click', () => navigate("class-view"))

  classNavReview.addEventListener('click',() => {populateClassReview(currCourse)});

  document.getElementById('add-assignment-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const courseName = document.getElementById('course-name-input').value;
    const dayOfWeek = document.getElementById('day-of-week-input').value;
    const assignmentDescription = document.getElementById('assignment-description-input').value;
    addAssignmentToCalendar(courseName, dayOfWeek, assignmentDescription);
    document.getElementById('add-assignment-form').reset();
    alert('Assignment added successfully!');
  });

  

