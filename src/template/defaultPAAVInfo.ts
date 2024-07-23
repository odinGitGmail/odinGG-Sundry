const packageAuthorVersionTemplate: string = `"icon": "assets/avatar.png",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/$author$/$gitRepositoryName$.git"
  },
  "publisher": "$author$",
  "keywords": [],
  "author": "$author$",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/$author$/$gitRepositoryName$/issues"
  },
  "homepage": "https://github.com/$author$/$gitRepositoryName$#readme",`;

const packageAuthorVersion = (author: string, gitRepositoryName: string): string => {
  return packageAuthorVersionTemplate.replaceAll("$author$", author).replaceAll("$gitRepositoryName$", gitRepositoryName);
};

export default packageAuthorVersion;