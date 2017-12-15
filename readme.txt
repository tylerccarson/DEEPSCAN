To run this application, start your mongo server & do the following from the command line:

in order to ensure using python2.7, create a virtual env entitled .env
cd into python/
pip install -r requirements.txt

cd ..

sudo mongod
npm install
npm run dev
npm start


for reference regarding python dependecies: 
-https://github.com/extrabacon/python-shell/issues/50

Notes for development / user stories:
-add ReactRouter for navigating different user experiences (teacher, student, submitting test as teacher, submitting student exam sheet, and looking at results)

-create teacher and student roles
-classroom role?

-teacher is able to add a new exam, establishing the number of questions, and able to set A, B, C, or D as the answer via dropdown
-teacher is also able to provide an explanation for each question when inputting exam
-that key cannot be submitted unless an answer has been picked for every question
-teacher can view all submissions for a particular exam and be able to identify student by their ID

-a student should be able to download the multiple-choice answer sheet as a .pdf file
-student should get immediate feedback on their submission, including score, teacher's comments