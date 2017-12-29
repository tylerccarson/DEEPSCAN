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

-enable authentication for teacher and student roles
-ability to view past submissions as a student
-ability to see all submissions, one per student, for each particular student (by classID) in each classroom
-teacher can view all submissions for a particular exam and be able to identify student by their ID
-able to set a latest submission time or due date for an assignment
-score students and display with graphs

-multiple upload to handle 45+ question exams

-mobile ready

-write-in needs very defined boundary, 10-digit for each quetion