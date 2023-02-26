export interface IStudentMark {
  subjectTitle: string;
  totalMarks: number;
  marksObtained: number;
}

export interface IStudent {
  id: string;
  name: string;
  avatarURL: string;
  lecturesAttended: number;
  totalLectures: number;
  marks: Record<string, IStudentMark>
}
