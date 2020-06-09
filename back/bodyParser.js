const { IncomingForm } = require('formidable');

exports.getBody = (req) => new Promise((resolve, reject) => {
  const form = new IncomingForm();
  form.uploadDir = "./uploads";
  
  form.parse(req, (err, fields, files) => {
    if (err) { return reject(err); }
    const body = { ...fields };

    for (let key in files) {
      if (files[key]) {
        body[key] = {
          type: files[key].type,
          name: files[key].path,
        }
      }
    }

    resolve(body);
  });
});