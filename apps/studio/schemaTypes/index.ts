import blockContentLms from "./lms/blockContent";
import categoryLmsType from "./lms/categoryType";
import courseLmsType from "./lms/courseType";
import enrollmentLmsType from "./lms/enrollmentType";
import instructorLmsType from "./lms/instructorType";
import lessonLmsType from "./lms/lessonType";
import moduleLmsType from "./lms/moduleType";
import studentLmsType from "./lms/studentType";
import lessonLmsCompletionType from "./lms/lessonCompletionType";
import commentType from "./reddit/commentType";
import postType from "./reddit/postType";
import subredditType from "./reddit/subredditType";
import userType from "./reddit/userType";
import voteType from "./reddit/voteType";
import { schema as portfolioSchema } from "./portfolio";


export const schemaTypes = [
    blockContentLms,
    categoryLmsType,
    courseLmsType,
    enrollmentLmsType,
    instructorLmsType,
    lessonLmsCompletionType,
    lessonLmsType,
    moduleLmsType,
    studentLmsType,
    commentType,
    postType,
    subredditType,
    userType,
    voteType,
    ...portfolioSchema.types,
]
