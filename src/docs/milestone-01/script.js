
const teamNames = [
  {
    name: "Faiz Firdaus",
    id: "faiz",
    role: "Project Manager",
    bio: "Faiz is experienced in doing frontend and backend development as well using databases. He can do design work using Figma and also develop frontend using Tailwind CSS. He has some experience with PostgreSQL.",
  },
  {
    name: "Luke Walsh",
    id: "luke",
    role: "Back-End Developer",
    bio: "Luke has plentiful experience with Python, java, javascript, and typeScript, as well as a foundational understanding of C++ and HTML. He also possesses a background in Data Science, as he was a data science major",
  },
  {
    name: "Sumrudhi Jadhav",
    id: "sumrudhi",
    role: "Front-End Developer",
    bio: "In regards to web development, Sumrudhi has worked with TypeScript, JavaScript, HTML, and CSS. She also has experience with Ruby on Rails, Git, Java, Python, C/C++, SQL, MERN Stack, and Swift.",
  },
  {
    name: "Ryan Kirchner",
    id: "ryan",
    role: "Documentation Lead",
    bio: "Ryan is proficient in JavaScript, HTML, CSS,Typescript, and has experience developing web applications. He also has skills in other tech-related tools such as MS Office, MS Visual Studio, MS SQL Server Management Studio.",
  },
];

const addNames = () => {
  const teamSection = document.getElementById("team");
  teamNames.forEach((member) => {
    let nameElement = document.createElement("h2");
    nameElement.className = "pt-5 mx-4 text-justify w-full";

    let namePic = document.createElement("div"); //name and pic container
    namePic.className = "justify-center flex flex-col text-center";

    let memberName = document.createElement("p");
    memberName.className = "text-lg font-semibold";
    memberName.textContent = member.name;

    let picContainer = document.createElement("div");
    picContainer.className = "rounded-full m-4 justify-center flex";
    let pic = document.createElement("img");
    pic.src = `images/${member.id}.png`;
    pic.height = "250";
    pic.width = "250";
    pic.style = "border:2px solid black; margin-top: 10px; margin-bottom:10px; border-radius:10px "
    picContainer.appendChild(pic);

    let role = document.createElement("p");
    role.className = "text-md font-normal";

    role.textContent = member.role;

    namePic.appendChild(picContainer); //adding pictures, names, grade, and major under the same div
    namePic.appendChild(memberName);
    namePic.appendChild(role);

    let bio = document.createElement("p"); //bio written on separate container
    bio.className = "text-sm font-normal pt-5 text-justify";
    bio.textContent = member.bio;

    nameElement.appendChild(namePic);
    nameElement.appendChild(bio);
    teamSection.appendChild(nameElement);
  });
};

addNames();
