export class QuestionModel{
    "question": string;
    "options": string[];
    "answers": AnswerModel[];
}

export class AnswerModel{
    "option": string;
    "age_range": string;
    "gender": string;
    "marital_status": string;
}