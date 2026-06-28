import fs from 'fs';

const issueTitle = process.env.ISSUE_TITLE || '';
const issueBody = process.env.ISSUE_BODY || '';

console.log(`Running web update with the following issue
$ISSUE_TITLE=${issueTitle}
$ISSUE_BODY=${issueBody}
`);

const parsedStudentId = issueBody.split('|')[0];
const parsedStudentName = issueBody.split('|')[1];
const parsedCourseTitle = issueBody.split('|')[2];

const updatedContent = fs.readFileSync('template.html', 'utf8')
  .replace('[STUDENT_NAME_PLACEHOLDER]', parsedStudentName)
  .replace('[COURSE_TITLE_PLACEHOLDER]', parsedCourseTitle);

fs.writeFileSync('student_websites/' + parsedStudentId + ".html", updatedContent);
