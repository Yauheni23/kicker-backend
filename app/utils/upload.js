const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
const sha1 = require("sha1");

function getExtension(filename) {
  return filename.split(".").pop();
}

function isImageValid(filename, mimetype) {
  const allowedExts = ["gif", "jpeg", "jpg", "png", "svg", "blob"];
  const allowedMimeTypes = ["image/gif", "image/jpeg", "image/pjpeg", "image/x-png", "image/png", "image/svg+xml"];

  const extension = getExtension(filename);

  return allowedExts.indexOf(extension.toLowerCase()) != -1 &&
    allowedMimeTypes.indexOf(mimetype) != -1;
}

function upload(request, response) {
  const fileRoute = "/uploads/";
  const busboy = new Busboy({ headers: request.headers });

  let saveToPath = null;
  let hadStreamError = null;
  let link = null;

  busboy.on("file", function(fieldname, file, filename, encoding, mimetype) {
    const randomName = sha1(new Date().getTime()) + "." + getExtension(filename);
    link = fileRoute + randomName;

    const appDir = path.dirname(require.main.filename);
    saveToPath = path.join(appDir, link);

    file.on("error", handleStreamError);

    const diskWriterStream = fs.createWriteStream(saveToPath);
    diskWriterStream.on("error", handleStreamError);

    diskWriterStream.on("finish", () => {
      let status = isImageValid(saveToPath, mimetype);

      if (!status) {
        return handleStreamError("File does not meet the validation.");
      }
      return response.send({ link: link });
    });

    file.pipe(diskWriterStream);
  });

  busboy.on("error", handleStreamError);
  request.on("error", handleStreamError);

  return request.pipe(busboy);

  function handleStreamError(error) {
    if (hadStreamError) {
      return;
    }

    hadStreamError = error;

    if (saveToPath) {
      return fs.unlink(saveToPath, (err) => {
        return response.status(500).send(err);
      });
    }

    return response.status(500).send(error);
  }
}

module.exports = upload;
