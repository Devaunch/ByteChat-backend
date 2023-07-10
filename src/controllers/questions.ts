import { RequestHandler } from 'express';
import QUESTION from '../model/Question';
import { createError } from '../utils/createError';

export const getQuestions: RequestHandler = async (req, res, next) => {
    let { filter, sortBy } = req.body;
    if (!filter) {
        filter = {};
    }
    if (!sortBy) {
        sortBy = '';
    }
    let questions;
    let filterCheck = () => {
        const languagesFilter = { languages: { $in: filter.languages } };
        if (filter.languages) {
            return languagesFilter;
        } else {
            return filter;
        }
    };
    if (sortBy == 'likes') {
        questions = await QUESTION.find(filterCheck()).sort({ likes: -1 });
    } else if (sortBy == 'createdAt') {
        questions = await QUESTION.find(filterCheck()).sort({ createdAt: -1 });
    } else if (sortBy == 'difficulty') {
        questions = await QUESTION.find(filterCheck()).sort({ difficulty: -1 });
    } else {
        questions = await QUESTION.find(filterCheck());
    }
    res.status(200).json(questions);
};

export const createQuestion: RequestHandler = async (req, res, next) => {};
