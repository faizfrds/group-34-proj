const teamNames = [
  {
    name: "Faiz Firdaus",
    grade: "Sophomore",
    major: "Computer Science",
  },
  {
    name: "Ryan Kirchner",
    grade: "",
    major: "",
  },
  {
    name: "Luke Walsh",
    grade: "",
    major: "",
  },
  {
    name: "Sumrudhi Jadhav",
    grade: "",
    major: "",
  },
];

const addNames = () => {
    const teamSection = document.getElementById("team");
    // Check if team section exists
    if (teamSection) {
      teamNames.forEach(member => {
        let nameElement = document.createElement("h2");
        nameElement.className = "pt-5";
        console.log(nameElement)
        nameElement.textContent = member.name;
        let gradeMajor = document.createElement("p");
        gradeMajor.textContent = member.grade + "•" + member.major;
        nameElement.appendChild(gradeMajor);
        console.log(nameElement)
        teamSection.appendChild(nameElement);
      });
    }

  };

addNames();