interface Choice {
    id: string;
    text: string;
  }
  
interface QuestionData {
    id: string;
    questionText: string;
    choices: Choice[];
}

export default QuestionData;