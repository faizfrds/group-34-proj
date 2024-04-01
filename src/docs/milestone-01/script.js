const teamNames = [
  {
    name: "Faiz Firdaus",
    grade: "Sophomore",
    major: "Computer Science",
  },
  {
    name: "Ryan Kirchner",
    grade: "Junior",
    major: "Informatics (DS)",
  },
  {
    name: "Luke Walsh",
    grade: "Junior",
    major: "Computer Science",
  },
  {
    name: "Sumrudhi Jadhav",
    grade: "",
    major: "",
  },
];

const addNames = () => {
  const teamSection = document.getElementById("team");
  teamNames.forEach((member) => {
    let nameElement = document.createElement("h2");
    nameElement.className = "text-lg font-semibold pt-5 mx-4";
    nameElement.textContent = member.name;

    let gradeMajor = document.createElement("p");
    gradeMajor.className = "text-sm font-normal"
    gradeMajor.textContent = member.grade + " • " + member.major;

    nameElement.appendChild(gradeMajor);
    teamSection.appendChild(nameElement);
  });
};

addNames();
