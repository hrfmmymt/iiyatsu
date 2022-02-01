import fs from 'fs';
import path from 'path';

const DIST_PATH = path.join(__dirname, '../post/');
const arg = process.argv[2];

const newDate = new Date();
const year = newDate.getFullYear();
const rawMonth = newDate.getMonth() + 1;
const zeroPad = (num: number) => {
  if (num < 10) {
    return '0' + num;
  }
  return num;
};
const month = zeroPad(rawMonth);
const day = zeroPad(newDate.getDate());

const fileName = arg ? arg + '.md' : 'new_post.md';

const newPostTemplate = `# ${
  arg || 'new post'
}\n\n*date:${year}-${month}-${day}*\n\n*desc> new-post*\n`;

fs.writeFileSync(path.join(DIST_PATH, fileName), newPostTemplate);
