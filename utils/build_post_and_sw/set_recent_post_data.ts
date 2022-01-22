import * as fs from 'fs';

import { PostInfo } from '../types';

import { FOOTER_TAG, createTagOfPostEnd } from './create_tag_of_post_end';

export const setRecentPostData = ({
  postDir,
  postListStr,
}: {
  postDir: string;
  postListStr: string;
}): void => {
  const postList = JSON.parse(postListStr);

  fs.readdir(postDir, (err, mdFiles) => {
    if (err) {
      console.error(err.message);
      process.exit(1);
      return;
    }

    mdFiles
      .filter((file) => !/(^|\/)\.[^\/\.]/g.test(file))
      .forEach((mdFile) => {
        const thisFileIndex = postList.findIndex(
          (post: PostInfo) => mdFile.replace(/.md/g, '') === decodeURI(post.url),
        );

        const nextPost: PostInfo | null = postList[thisFileIndex].nextPost;
        const prevPost: PostInfo | null = postList[thisFileIndex].prevPost;
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
                if (err) {
                  console.error(err.message);
                  process.exit(1);
                  return;
                }
              });
            }
          }
        });
      });
  });
};
