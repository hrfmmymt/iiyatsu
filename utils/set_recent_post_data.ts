import * as fs from 'fs';
import * as path from 'path';
import { PostInfo } from './types';

const postDir = path.join(__dirname, '../post/');
const postList = JSON.parse(fs.readFileSync(path.join(__dirname, '../post-list.json'), 'utf8'));

const FOOTER_TAG = '<footer>&#8718;</footer>';

const createTagOfPostEnd = ({
  nextPost,
  prevPost,
}: {
  nextPost: PostInfo['nextPost'];
  prevPost: PostInfo['prevPost'];
}) => {
  const next = nextPost
    ? `<dt>次に出た記事</dt><dd><a href="${nextPost.url}">${nextPost.title}</a></dd>`
    : '';
  const prev = prevPost
    ? `<dt>前に出た記事</dt><dd><a href="${prevPost.url}">${prevPost.title}</a></dd>`
    : '';
  const result = `${FOOTER_TAG}<nav class="post-recent"><dl>${next}${prev}</dl></nav>`;

  return result;
};

export const setRecentPostData = (): void => {
  fs.readdir(postDir, (err, mdFiles) => {
    if (err) {
      console.log(err);
      return;
    }

    mdFiles.forEach((mdFile) => {
      const thisFileIndex = postList.findIndex(
        (post: PostInfo) => mdFile.replace(/.md/g, '') === decodeURI(post.url),
      );
      const nextPost: PostInfo | undefined = postList[thisFileIndex].nextPost;
      const prevPost: PostInfo | undefined = postList[thisFileIndex].prevPost;
      const destination = createTagOfPostEnd({ nextPost, prevPost });
      const filePath = postDir + '/' + mdFile;

      fs.readFile(filePath, 'utf8', (err, mdString) => {
        if (err) {
          return console.log(err);
        }

        // md にフッターがなかった
        if (!mdString.match(FOOTER_TAG)) {
          fs.appendFile(filePath, destination, 'utf8', (err) => {
            if (err) {
              return console.log(err);
            }
          });
        } else {
          // md と json のデータに差分なかった
          if (mdString.match(destination)) {
            return;
          } else {
            // md と json のデータに差分があった
            const existingEndTag = mdString.substring(
              mdString.indexOf(FOOTER_TAG) + 0,
              mdString.length,
            );
            const replacement = mdString.replace(existingEndTag, destination);

            fs.writeFile(filePath, replacement, 'utf8', (err) => {
              if (err) return console.log(err);
            });
          }
        }
      });
    });
  });
};

setRecentPostData();
