const mongoose = require('mongoose');

/**
 * 
 * - job description
 * - resume text
 * - Self description
 * 
 * -- Score:{
 *    technical: 0-10,}
 * 
 * 
 * - Technical Question : [{
 *         question:"",
 *         intention :"",
 *         answer:"", 
 * }]
 * - Behavioral Question: [{
 *       question:"",
 *       intention :"",
 *       answer:"",
 * }]
 * - Skills Gap :[{ 
 *      skill:"",
 *      severity{
 *         type: String,
 *        enum: ['Low', 'Medium', 'High'],
 * 
 * }
 * 
 * }
 * -- Preparation Plan=[{
 *         day: Number,
 *         focus: String,
 *         tasks: [String],
 * 
 * }]
 */

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Technical question is required']
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
},{
    _id: false
})

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Behavioral question is required']
    },
    intention: {
        type: String,
        required: [true, 'Intention is required']
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    }
},{
    _id: false
})

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, 'Skill is required']
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High']
    }
},{
    _id: false
    
})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, 'Day is required']

    },
    focus: {
        type: String,
        required: [true, 'Focus is required']
    },
    tasks: {
        type: String,
        required: [true, 'Tasks are required']
    }
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, 'Job description is required']
    },
    resumeText: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    scores: {
        
            type: Number,
            min: 0,
            max: 10
        
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})



const InterviewReport = mongoose.model('InterviewReport', interviewReportSchema);

module.exports = InterviewReport;
