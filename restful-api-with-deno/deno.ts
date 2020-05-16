import {
    Application,
    Router
} from "https://deno.land/x/oak/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
console.log(typeof config().PORT);

interface Courses {
    id: number,
    course: string
}


const courses: Array < Courses > = [{
        id: 1,
        course: "Javascript"
    },
    {
        id: 2,
        course: "Java"
    },
    {
        id: 3,
        course: "python"
    }
];

;


export const getAllCourses = ({
    response,
    request
}: {
    response: any,
    request: any
}) => {
    response.body = courses
}


export const addCourse = async ({
    response,
    request
}: {
    response: any,
    request: any
}) => {
    const body = await request.body()
    // console.log(body);
    const value= body.value;
    const course = {
        id:courses.length+1,
        course:value.course
    }
    courses.push(course)
    console.log(courses);
    response.body = courses
}

export const getCourse = async ({
    response,
    request,
    params
}: {
    response: any,
    request: any,
    params: any
}) => {

    const findCourse = courses.find(course => course.id === parseInt(params.id))
    if (!findCourse) {
            response.body= `course is not find by the given id ${params.id}`
            response.status = 404
    } else {
        response.body = findCourse
    }
}

export const modifyCourse = async ({
    response,
    request,
    params
}: {
    response: any,
    request: any,
    params: any
}) => {
    // const id = params.id;
    // console.log(typeof id);
    const body = await request.body()
    // console.log(body.value);
    const findCourse = courses.find(course => course.id === parseInt(params.id));
    console.log(findCourse);
    if (!findCourse) {
            response.body= `course is not find by the given id ${params.id}`
            response.status = 404
    } else {
        findCourse.course = body.value.course
        response.body = findCourse
    }
}


export const deleteCourse = ({
    response,
    request,
    params
}: {
    response: any,
    request: any,
    params: any
}) => {
    const course = courses.find(course => course.id === parseInt(params.id));
    if (!course) {
        response.body= `course is not find by the given id ${params.id}`
        response.status = 404
}else{
    const index = courses.indexOf(course)
    courses.splice(index, 1)
    console.log(course);
    response.body = courses
}
    


}

const router = new Router();

router
    .get("/", getAllCourses)
    .post("/add", addCourse)
    .get("/add/:id", getCourse)
    .put("/add/:id", modifyCourse)
    .delete("/add/:id", deleteCourse)


const app = new Application()
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({
    port: parseInt(config().PORT),
});