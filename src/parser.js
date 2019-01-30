const replaceContent = require('solc-import').replaceContent;
const resolver = require('./resolver');
// https://github.com/<owner>/<repo>/<path_to_the_file>

module.exports = async function (importPath) {
  const [, , , root, path] = require('./index').match.exec(importPath);

  const url = `https://raw.githubusercontent.com/${root}/master/${path}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    let data = await response.text();
    if (!response.ok || response.status !== 200) throw Error('Content ' + data);
    data = replaceContent(data, importPath, resolver);
    return data;
  } catch (error) {
    throw error;
  }
};


// async function getSource(importPath, root, path) {
//   const url = `https://api.github.com/repos/${root}/contents/${path}`;
//   // console.log('url:', url);
//   try {
//     const response = await fetch(url, { method: 'GET' });
//     let data = await response.text();
//     if (!response.ok || response.status !== 200) throw Error(data);
//     data = JSON.parse(data);
//     data.content = window.atob(data.content);
//     data.content = replaceContent(data.content, importPath, pathResolve);
//     if ('content' in data) return data.content;
//     if ('message' in data) throw Error(data.message);
//     throw Error('Content not received');
//   } catch (error) {
//     // Unknown transport error
//     throw error;
//   }
// }