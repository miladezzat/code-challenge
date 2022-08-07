# KIB Challenge

## Challenge One (SAMPLE CURD OPERATIONS)
A simple CRUD Application using ExpressJs and MongoDB

1. Requirements
   - Docker
   - Docker Compose
   - Post `8080` to be available on your machine

2. Installation
   - Clone repo ``

3. Run Project
   - Open project on CRUD dir that inside root project dir in your terminal
   - Then run `docker-compose up`
   - You could access swagger doc using `http://localhost:8080/api/docs`

5. Run unit test cases
   - Open project `crud-operations` dir that inside root project dir in your terminal, `cd crud-operations`
   - Then run `npm install`
   - The run `npm run test`


---------------------------
## Challenge Two Problem-Solving Case

1. Requirements
   - Node and NPM
   - The `csv file` in the root directory has records for those columns and in the same order(`id`,`area`,`productName`,`quantity`,`brandName`) 

2. Run
   - One project on problemSolving dir that inside root project dir
   - `npm install`
   - `node inndex.js` or `npm run process`
   - Then enter the file name that mentioned in requirements section including `.csv extension`


-------------------------

## Notes
- For CRUD Operations
    1. I Ignored the authentication to reduce time
    2. I didn't cover all the test cases, I wrote some examples.
    3. I added pipeline for testing with github action.
- 

## Future implementation

If I have time, I will:

1. Using TypeScript or Using `NestJS` framework
2. Add unit e2e  test cases for services, controller and resolvers and the rest of unit tests.
3. Setup Seeder
4. Setup migration
5. Add faker data to generate fake data fot testing

## What I did do to develop the code?
1. I took between 2h to 3h for planning and designing.
2. Develop Product CRUD operations and its test case take from 4h up to 5h, I implemented it for  RESTful.
3. Write this readme file take 30m.
