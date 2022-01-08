import * as fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import path from 'path';

const POST_DIR = path.join(__dirname, '../../post/');
const DIST_PATH = path.join(__dirname, '../../dist/');

async function main(inputMdFile: string, fileName: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(inputMdFile);

  if (!fs.existsSync(DIST_PATH)) fs.mkdirSync(DIST_PATH);
  const outputFilePath = `${DIST_PATH}${fileName}.html`;

  fs.writeFile(outputFilePath, String(file), 'utf-8', (err) => {
    err ? console.error(err) : console.log(`${outputFilePath}\n${String(file)}\n`);
  });
}

const mdToHtml = () => {
  fs.readdir(POST_DIR, (err, mdFiles) => {
    if (err) {
      console.log(err);
    }

    for(const mdFile of mdFiles) {
      const filePath = POST_DIR + mdFile;
      const fileName = mdFile.replace(/.md/g, '');
      const inputMdFile = fs.readFileSync(filePath, 'utf8');

      main(inputMdFile, fileName);
    }
  });
};

mdToHtml();
