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
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  {
    class: "CS230",
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  {
    class: "CS240",
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  {
    class: "CS250",
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
  {
    class: "MATH235",
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  },
];

const reviewInfo = [
  {
    class: "CS220",
    Beginner: ["linked lists", "lecture 14"],
    AlmostThere: ["recursion", "higher order function", "lecture 12"],
    Mastered: ["lecture 1, lecture 2 "],
  },
  {
    class: "CS230",
    Beginner: ["Pointers", "Memory Allocation"],
    AlmostThere: ["C Syntax", "Dynamic Arrays"],
    Mastered: ["Basic IO", "Control Structures"],
  },
  {
    class: "CS240",
    Beginner: ["Combinatorics", "Bayes' Theorem"],
    AlmostThere: ["Probability Distributions", "Expected Value"],
    Mastered: ["Conditional Probability", "Independent Events"],
  },
  {
    class: "CS250",
    Beginner: ["Predicate Logic", "Set Theory"],
    AlmostThere: ["Combinatorics", "Boolean Algebra"],
    Mastered: ["Graph Theory", "Modular Arithmetic"],
  },
  {
    class: "MATH235",
    Beginner: ["Linear Transformations", "Matrix Operations"],
    AlmostThere: ["Subspaces", "Dimension Theorem"],
    Mastered: ["Determinants", "Inner Product Spaces"],
  },
];

// import Store from "./store.js";

//Code for running dashboard and accessing classes
const dashboard = document.getElementById("class-dashboard");
const loadingElement = document.getElementById("loading-display");
const currentClassNameElement = document.getElementById("current-class-name");
const dashboardButton = document.getElementById("nav-dashboard");
const classNavReview = document.getElementById("class-review-nav");
const classHomeButton = document.getElementById("class-home-nav");

let currCourse = "";

/**
 * Navigates between views by hiding all views and displaying the requested view.
 *
 * @param {string} viewId - The id of the view to navigate to.
 * @returns {void}
 */
function navigate(viewId) {
  // Hide all views
  document.querySelectorAll(".view").forEach((view) => {
    view.style.display = "none";
  });

  // Show the requested view
  document.getElementById(viewId).style.display = "block";
}

// const store = new Store("myDatabase"); // Initialize the Store class with a database name

/**
 * Adds classes to the dashboard by creating elements and appending them to the dashboard.
 *
 * @returns {void}
 */
const addClasses = () => {
  loadingElement.textContent = "Loading classes...";
  // console.log("HERE!")
  // setTimeout(() => {
  courseInfo.forEach((course) => {
    let courseElem = document.createElement("div");
    courseElem.className =
      "bg-blue-100 hover:bg-blue-200 hover:cursor-pointer hover:shadow-xl hover:shadow-zinc-400 transition p-4 m-5 text-center rounded-md";

    let namePic = document.createElement("div");
    namePic.className = "justify-center flex flex-col text-center";

    let courseName = document.createElement("p");
    courseName.className = "text-lg font-semibold";
    courseName.textContent = course.name;

    let picContainer = document.createElement("div");
    picContainer.className = "rounded-full m-4 justify-center flex";
    let pic = document.createElement("img");
    pic.src = `images/${course.name}.png`;
    pic.height = "400";
    pic.width = "400";
    pic.style =
      "border:2px solid black; margin-top: 10px; margin-bottom:10px; border-radius:10px";
    picContainer.appendChild(pic);

    namePic.appendChild(picContainer);
    namePic.appendChild(courseName);

    courseElem.appendChild(namePic);

    // Adds a click event listener to each course element
    courseElem.addEventListener("click", async () => {
      currCourse = course;
      const currCourseName = course.name;
      console.log("course clicked was", currCourseName);
      updateCurrentClassName(course.name); // Update the class name in the navbar
      classNavReview.classList.remove("hidden");
      classHomeButton.classList.remove("hidden");
      await populateClass(course); // Call populateClass instead of your previous code
      navigate("class-view");
    });

    dashboard.appendChild(courseElem);
    loadingElement.textContent = "";
    loadingElement.className = "";
  });
  // }, Math.random() * 2000);
};

addClasses();

/**
 * Updates the styling
 *
 * @param {string} className - The class style
 * @returns {void}
 */
const updateCurrentClassName = (className) => {
  currentClassNameElement.textContent = ": " + className; // Set the class name
};

/**
 * Populates the class using data from PouchDB or the server
 * 
 * @param {Object} course - The course object containing the course name
 * @param {string} course.name - The name of the course
 * @returns {void}
 */
const populateClass = async (course) => {
  try {
    let data = localStorage.getItem(course.name);
    if (data) {
      console.log("Using cached data for", course.name);
      data = JSON.parse(data);
    } else {
      console.log("Fetching data from server for", course.name);
      const response = await fetch(`/read?name=${course.name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch class data');
      }
      data = await response.json();
      localStorage.setItem(course.name, JSON.stringify(data));
    }
    
    console.log("Fetched class data:", data); // Log fetched data
    let calendar = {}; // Initialize an empty calendar
    if (data) {
      calendar = data;
    } else {
      console.log("No data available for", course.name);
    }

    displayClassData(calendar, reviewInfo.find(r => r.class === course.name));
  } catch (err) {
    console.error('Error fetching class data:', err);
  }
};

/**
 * Displaying class infromation
 *
 * @param {string} courseToDoData -  ToDo list data of the course
 * @param {string} courseReviewData -  Review data of the course
 * @returns {void}
 */
const displayClassData = (courseToDoData, courseReviewData) => {
  // Populate to do calendar
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  console.log("display class data", courseToDoData);
  daysOfWeek.forEach((day) => {
    const toDoElement = document.getElementById(`${day}-tasks`);
    toDoElement.innerHTML = "";
    const assignments = courseToDoData[day];
    if (assignments && assignments.length > 0) { // Check if assignments is defined
      toDoElement.innerHTML = assignments.join("<br>");
    }
  });

  // Populate review section
  const reviewContainer = document.getElementById("review-items-container");
  reviewContainer.innerHTML = ""; // Clear previous content
  const masteryLevels = ["Beginner", "AlmostThere", "Mastered"];
  masteryLevels.forEach((level) => {
    const reviews = courseReviewData[level];
    if (level === "Mastered") {
      return; // If the content has been mastered we can ignore
    }
    if (reviews && reviews.length > 0) {
      reviews.forEach((reviewItem) => {
        const reviewElement = document.createElement("div");
        reviewElement.className = "review-item";
        const reviewTitle = document.createElement("h3");
        reviewTitle.textContent = reviewItem;
        const reviewStatus = document.createElement("span");
        reviewStatus.className = `status ${level.toLowerCase()}`;
        reviewStatus.textContent = level.replace(/([A-Z])/g, " $1").trim();
        reviewElement.appendChild(reviewTitle);
        reviewElement.appendChild(reviewStatus);
        reviewContainer.appendChild(reviewElement);
      });
    }
  });
};


/**
 * Populates and displays class review information for a specified course. 
 * It first checks if review data is available in local storage. If not, it fetches 
 * the data from the server and stores it locally for future use.
 *
 * @param {Object} course - The course object containing the course name.
 * @param {string} course.name - The name of the course.
 * @returns {void}
 */
const populateClassReview = async (course) => {
  // Check if review data is saved in local storage or PouchDB

  // const localReviewData = await store.getData(course.name);
  const localReviewData = await fetch(
    `http://127.0.0.1:3000/read?name=${course.name}`,
    {
      method: "GET",
    }
  );
  if (localReviewData && localReviewData.reviewData) {
    // If review data is found in local storage or PouchDB, use it
    displayReviewData(localReviewData.reviewData);
  } else {
    // If review data is not found in local storage or PouchDB, generate page
    const courseReviewData = reviewInfo.find((c) => c.class === course.name);
    if (courseReviewData) {
      displayReviewData(courseReviewData);
    } else {
      console.error(`Review data not found for ${course.name}`);
    }
  }

  // Navigate to the review view
  navigate("class-review-view");
};

/**
 * Displaying review data
 *
 * @param {string} reviewData -  The selected reviewData
 * @returns {void}
 */
const displayReviewData = (reviewData) => {
  const reviewContainer = document.getElementById("reviewPage-items-container");
  reviewContainer.innerHTML = ""; // Clear previous content
  const masteryLevels = ["Beginner", "AlmostThere", "Mastered"];
  masteryLevels.forEach((level) => {
    const reviews = reviewData[level];
    if (reviews && reviews.length > 0) {
      reviews.forEach((reviewItem) => {
        const reviewElement = document.createElement("div");
        reviewElement.className = "review-item";
        const reviewTitle = document.createElement("h3");
        reviewTitle.textContent = reviewItem;
        const reviewStatus = document.createElement("span");
        reviewStatus.className = `status ${level.toLowerCase()}`;
        reviewStatus.textContent = level.replace(/([A-Z])/g, " $1").trim();
        reviewElement.appendChild(reviewTitle);
        reviewElement.appendChild(reviewStatus);
        reviewContainer.appendChild(reviewElement);
      });
    }
  });
};

/**
 * Populates the course select input based on the available course information.
 *
 * @returns {void}
 */
function populateCourseSelect() {
  const courseSelect = document.getElementById("course-name-input");
  courseInfo.forEach((course) => {
    let option = document.createElement("option");
    option.value = course.name;
    option.textContent = course.name;
    courseSelect.appendChild(option);
  });
}

populateCourseSelect();

/**
 * Adds an assignment to the calendar for the specified course on the specified day of the week.
 *
 * @param {string} courseName The name of the course.
 * @param {string} dayOfWeek The day of the week (e.g., "Monday", "Tuesday").
 * @param {string} assignmentDescription The description of the assignment.
 * @returns {void}
 */
function addAssignmentToCalendar(courseName, dayOfWeek, assignmentDescription) {
  console.log(courseName);
  const courseCalendar = calendarInfo.find(
    (course) => course.class === courseName
  );
  console.log("CLEN: ", courseCalendar);
  if (courseCalendar) {
    if (courseCalendar[dayOfWeek]) {
      courseCalendar[dayOfWeek].push(assignmentDescription);
      // displayClassData(courseCalendar)
    } else {
      courseCalendar[dayOfWeek] = [assignmentDescription];
    }
  }
}

const calendarButton = document.getElementById("nav-calendar");
const calendarView = document.getElementById("calendar-container");

function populateCalendar(year, month) {
  console.log("working");
  const calendarBody = document.getElementById("calendar-body");
  calendarBody.innerHTML = "";

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        row.appendChild(document.createElement("td"));
      } else if (date > daysInMonth) {
        break;
      } else {
        let cellDate = new Date(year, month, date);
        row.appendChild(generateDayCell(cellDate));
        date++;
      }
    }

    calendarBody.appendChild(row);

    if (date > daysInMonth) {
      break;
    }
  }
}

function isSpecialDay(date) {
  // assume a special day is today
  return date.toDateString() === new Date().toDateString();
}

function generateDayCell(date) {
  const dayCell = document.createElement("td");
  dayCell.textContent = date.getDate();

  // dummy day
  if (date.getDate() === 1 || date.getDate() === 15 || date.getDate() === 17) {
    console.log("date is red");
    dayCell.classList.add("highlight-day");
  }

  if (isSpecialDay(date)) {
    dayCell.classList.add("today-day");
  }

  // assume a special day is an exam day
  const dayString = date.toLocaleDateString("en-US");
  calendarInfo.forEach((course) => {
    Object.entries(course).forEach(([day, tasks]) => {
      if (tasks.includes(dayString)) {
        dayCell.classList.add("exam-day");
      }
    });
  });

  return dayCell;
}

// function generateDayCell(date) {
//   const dayCell = document.createElement('td');
//   dayCell.textContent = date.getDate();

//   if (isSpecialDay(date)) {
//     dayCell.classList.add('highlight-day');
//   }

//   const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();

//   calendarInfo.forEach(course => {
//     const assignments = course[dayOfWeek];
//     if (assignments && assignments.length > 0) {
//       dayCell.classList.add('has-assignment');
//       let assignmentsList = document.createElement('ul');
//       assignments.forEach(assignment => {
//         let listItem = document.createElement('li');
//         listItem.textContent = assignment;
//         assignmentsList.appendChild(listItem);
//       });
//       dayCell.appendChild(assignmentsList);
//     }
//   });

//   return dayCell;
// }

populateCalendar(2024, 3);

/**
 * Event listener setup for multi-views
 *
 * @listens DOMContentLoaded
 * @returns {void}
 */
document.addEventListener("DOMContentLoaded", () => {
  navigate("home-view");
  document
    .getElementById("nav-dashboard")
    .addEventListener("click", () => navigate("home-view"));
  document
    .getElementById("nav-assignment")
    .addEventListener("click", () => navigate("assignment-view"));
  document
    .getElementById("nav-calendar")
    .addEventListener("click", () => navigate("calendar-view"));

  // Initialize with the home view
  navigate("home-view");
});

/**
 * Event listener setup for dashboard
 *
 * @listens click
 * @returns {void}
 */
dashboardButton.addEventListener("click", () => {
  classNavReview.classList.add("hidden");
  classHomeButton.classList.add("hidden");
  currentClassNameElement.textContent = ": Class Dashboard";
});

/**
 * Event listener setup for class home button
 *
 * @listens click
 * @returns {void}
 */
classHomeButton.addEventListener("click", () => navigate("class-view"));

/**
 * Event listener setup for class nav review
 *
 * @listens click
 * @returns {void}
 */
classNavReview.addEventListener("click", () => {
  populateClassReview(currCourse);
});

// calendarButton.addEventListener("click", () => {
//   populateCalendar(2024, 3);
// });

document.addEventListener("DOMContentLoaded", function () {
  const calendarButton = document.getElementById("nav-calendar");
  const calendarView = document.getElementById("calendar-container");

  calendarButton.addEventListener("click", function () {
    document.querySelectorAll(".view").forEach((view) => {
      view.style.display = "none";
    });
    calendarView.style.display = "block";
  });
});

/**
 * Event listener setup to handle form submission for adding assignments to the calendar.
 *
 * @listens submit
 * @param {Event} event - The submit event.
 * @returns {void}
 */
document
  .getElementById("add-assignment-form")
  .addEventListener("submit", (event) => {
    addAssignment();
    event.preventDefault();
  });

//http method for creating new assignmnts
async function addAssignment() {
  const courseName = document.getElementById("course-name-input").value;
  const dayOfWeek = document.getElementById("day-of-week-input").value;
  const assignmentDescription = document.getElementById(
    "assignment-description-input"
  ).value;

  const obj = {
    dayOfWeek: dayOfWeek,
    assignmentDescription: assignmentDescription,
  };

  const encoded = encodeURIComponent(JSON.stringify(obj));
  const read = await fetch(`http://127.0.0.1:3000/read?name=${courseName}`, {
    method: "GET",
  });
  const data = await (await read).text();
  const parsed = JSON.parse(data);

  //if there is already a local storage for the course, update it. If not, create it.
  if (parsed !== null) {
    await fetch(
      `http://127.0.0.1:3000/update?name=${courseName}&data=${encoded}`,
      { method: "PUT" }
    );
  } else {
    await fetch(
      `http://127.0.0.1:3000/create?name=${courseName}&data=${encoded}`,
      { method: "POST" }
    );
  }
  addAssignmentToCalendar(courseName, dayOfWeek, assignmentDescription);
  document.getElementById("add-assignment-form").reset();
  alert("Assignment added successfully!");
}
