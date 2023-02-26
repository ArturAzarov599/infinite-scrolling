const { faker } = require("@faker-js/faker");
const fs = require("fs");

const folderName = "src/mocks";
const filePath = `${folderName}/studentsData.ts`;

const SUBJECT_CODES = [`0000`, `0001`, `0002`, `0003`, `0004`];
const SUBJECT_TITLES = [`Math`, `Chemistry`, `Biology`, `Singing`, `Painting`];

const generateStudentMarks = (countOfMarks) => {
  const studentsMarks = {};

  Array.from(Array(countOfMarks).keys()).forEach((key) => {
    studentsMarks[SUBJECT_CODES[key]] = {
      marksObtained: faker.datatype.number({
        min: 0,
        max: 70,
      }),
      totalMarks: faker.datatype.number({
        min: 70,
        max: 100,
      }),
      subjectTitle: SUBJECT_TITLES[key],
    };
  });

  return studentsMarks;
};

const createRandomStudents = () => {
  const studentMarksCount = Math.ceil(Math.random() * 4);

  return {
    id: faker.datatype.uuid(),
    avatarURL: faker.image.avatar(),
    lecturesAttended: faker.datatype.number({
      min: 0,
      max: 15,
    }),
    name: faker.name.fullName(),
    totalLectures: faker.datatype.number({
      min: 0,
      max: 15,
    }),
    marks: generateStudentMarks(studentMarksCount),
  };
};

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    if (!fs.existsSync(filePath)) {
      const STUDENTS = [];

      Array.from({ length: 1000 }).forEach(() => {
        STUDENTS.push(createRandomStudents());
      });

      fs.writeFile(filePath, `export const students = ${JSON.stringify(STUDENTS)};`, (error) => {
        if (error) throw error;
        console.log(`Students data generated!!!`);
      });
    }
  }

  if(fs.existsSync(folderName)) {
    console.log(`Folder already exists`)
  }
} catch (err) {
  console.error(err);
}
