
const teamNames = [
  {
    name: "Faiz Firdaus",
    id: "faiz",
    grade: "Sophomore",
    major: "Computer Science",
    bio: "Faiz is experienced in doing frontend and backend development as well using databases. He can do design work using Figma and also develop frontend using Tailwind CSS. He has some experience with PostgreSQL.",
  },
  {
    name: "Ryan Kirchner",
    id: "ryan",
    grade: "Junior",
    major: "Informatics (DS)",
    bio: "Ryan is proficient in JavaScript, HTML, CSS,Typescript, and has experience developing web applications. He also has skills in other tech-related tools such as MS Office, MS Visual Studio, MS SQL Server Management Studio.",
  },
  {
    name: "Luke Walsh",
    id: "luke",
    grade: "Junior",
    major: "Computer Science",
    bio: "Luke has plentiful experience with Python, java, javascript, and typeScript, as well as a foundational understanding of C++ and HTML. He also possesses a background in Data Science, as he was a data science major",
  },
  {
    name: "Sumrudhi Jadhav",
    id: "sumrudhi",
    grade: "Sophomore",
    major: "Computer Science",
    bio: "In regards to web development, Sumrudhi has worked with TypeScript, JavaScript, HTML, and CSS. She also has experience with Ruby on Rails, Git, Java, Python, C/C++, SQL, MERN Stack, and Swift.",
  },
];

const addNames = () => {
  const teamSection = document.getElementById("team");
  teamNames.forEach((member) => {
    let nameElement = document.createElement("h2");
    nameElement.className = "pt-5 mx-4 text-justify w-full";
    // nameElement.textContent = member.name;

    let namePic = document.createElement("div"); //name and pic container
    namePic.className = "justify-center flex flex-col text-center";

    let memberName = document.createElement("p");
    memberName.className = "text-lg font-semibold";
    memberName.textContent = member.name;

    let picContainer = document.createElement("div");
    picContainer.className = "rounded-full m-4 justify-center flex";
    let pic = document.createElement("img");
    pic.src = `images/${member.id}.png`;
    pic.height = "200";
    pic.width = "200";
    pic.style = "border:2px solid black; margin-top: 10px; margin-bottom:10px; border-radius:10px "
    picContainer.appendChild(pic);

    let gradeMajor = document.createElement("p");
    gradeMajor.className = "text-md font-normal";
    gradeMajor.textContent = member.grade + " • " + member.major;

    namePic.appendChild(picContainer);
    namePic.appendChild(memberName);
    namePic.appendChild(gradeMajor);

    let bio = document.createElement("p"); //bio written on separate container
    bio.className = "text-sm font-normal pt-5 text-justify";
    bio.textContent = member.bio;

    nameElement.appendChild(namePic);
    nameElement.appendChild(bio);
    teamSection.appendChild(nameElement);
  });
};

addNames();
