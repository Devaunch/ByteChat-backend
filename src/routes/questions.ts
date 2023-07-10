import { Router } from 'express';
import { getQuestions, createQuestion } from '../controllers/questions';

const questionsRouter = Router();

questionsRouter.post('/getQuestions', getQuestions);
questionsRouter.post('/createQuestion', createQuestion);

export default questionsRouter;
