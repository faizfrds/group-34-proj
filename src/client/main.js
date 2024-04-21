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

const dashboard = document.getElementById("class-dashboard");

const loadingElement = document.getElementById("loading-display");

const addClasses = () => {
  loadingElement.textContent = "Loading classes...";
  setTimeout(
    () => {
      courseInfo.forEach((course) => {
        let courseElem = document.createElement("div");
        courseElem.className = "bg-blue-100 hover:bg-blue-200 hover:cursor-pointer hover:shadow-xl hover:shadow-zinc-400 transition p-4 m-5 text-center rounded-md";

        let namePic = document.createElement("div"); //name and pic container
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
        pic.style =
          "border:2px solid black; margin-top: 10px; margin-bottom:10px; border-radius:10px ";
        picContainer.appendChild(pic);

        namePic.appendChild(picContainer); //adding pictures, names, grade, and major under the same div
        namePic.appendChild(courseName);

        courseElem.appendChild(namePic);
        dashboard.appendChild(courseElem);
        loadingElement.textContent = "";
        loadingElement.className = "";
      });
    },
    Math.random() * 2000
  );
};

addClasses();
