import { Schema, model } from 'mongoose';

export interface Question {
    question: string;
    description: string;
    categories: string[];
    languages: string[];
    difficulty: number;
    madeBy: string;
    likes: number;
}

const stringType = {
    type: String,
    required: true
};

const arrayType = {
    type: [String],
    default: []
};

const QuestionSchema = new Schema<Question>({
    question: stringType,
    description: stringType,
    categories: arrayType,
    languages: arrayType,
    difficulty: {
        type: Number,
        default: 1,
        required: true
    },
    madeBy: stringType,
    likes: {
        type: Number,
        default: 0,
        required: true
    }
});

const QUESTION = model<Question>('question', QuestionSchema);

export default QUESTION;
