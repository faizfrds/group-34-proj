const teamNames = [
  {
    name: "Faiz Firdaus",
    id: "faiz",
    grade: "Sophomore",
    major: "Computer Science",
    bio: "I have some experience with web development projects. Can do some TypeScript, JavaScript, Java, Python, C. Experience and knowledge of postgreSQL, Git, Prisma, REST API.  I`m mostly familiar with building using frameworks, not too familiar with vanilla javascript/html/css. Can do some design/frontend as well as backend if needed.",
  },
  {
    name: "Ryan Kirchner",
    id: "ryan",
    grade: "Junior",
    major: "Informatics (DS)",
    bio: "I am proficient in JavaScript, HTML, CSS,Typescript,  HTML/CSS. I have experience developing web applications. My other skills less relevant to the project include Python, Java, R, Linux, MS Office, MS Visual Studio, MS SQL Server Management Studio. I am willing to fill any role whether it’s design, programming or a mixture of both",
  },
  {
    name: "Luke Walsh",
    id: "luke",
    grade: "Junior",
    major: "Computer Science",
    bio: "I have plentiful experience with Python, java, javascript, and typeScript, as well as a foundational understanding of C++ and HTML. I also have a background in Data Science, as I was a data science major for a year and a half at Bryant University until I transferred here. I have always been comfortable with working in teams and can work on any task I`m assigned and always have my work done on time.",
  },
  {
    name: "Sumrudhi Jadhav",
    id: "sumrudhi",
    grade: "",
    major: "",
    bio: "In regards to web development, I have worked with TypeScript, JavaScript, HTML, and CSS. However, I am not too well versed in HTML and CSS. I also have experience with Ruby on Rails, Git, Java, Python, C/C++, SQL, MERN Stack, and Swift.",
  },
];

const addNames = () => {
  const teamSection = document.getElementById("team");
  teamNames.forEach((member) => {
    let nameElement = document.createElement("h2");
    nameElement.className = "pt-5 mx-4 text-justify w-full";
    // nameElement.textContent = member.name;

    let namePic = document.createElement("div");

    let memberName = document.createElement("p");
    memberName.className = "text-lg font-semibold";
    memberName.textContent = member.name;

    // let picContainer = document.createElement("div");
    // picContainer.className = "h-10 w-10 rounded-full bg-black";
    // let pic = document.createElement("img");
    // pic.src = `https://cdn.pixabay.com/photo/2018/07/08/14/16/cat-3523992_640.jpg`;
    // pic.className = "h-2 w-2 rounded-full object-fit"
    // picContainer.appendChild(pic);

    let gradeMajor = document.createElement("p");
    gradeMajor.className = "text-md font-normal";
    gradeMajor.textContent = member.grade + " • " + member.major;

    // namePic.appendChild(pic);
    namePic.appendChild(memberName);
    namePic.appendChild(gradeMajor);

    let bio = document.createElement("p");
    bio.className = "text-sm font-normal pt-5 text-justify";
    bio.textContent = member.bio;

    nameElement.appendChild(namePic);
    // nameElement.appendChild(gradeMajor);
    nameElement.appendChild(bio);
    teamSection.appendChild(nameElement);
  });
};

addNames();
