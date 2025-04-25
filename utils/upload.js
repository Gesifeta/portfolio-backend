import multer from "multer";

// Setting up multer
export const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // check if upload is inappropriate image types
    const mimetype = file.mimetype;
    // valid video extenstions

    const validImageMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
      "image/bmp",
      "image/tiff",
      "image/x-icon",
      "image/vnd.microsoft.icon",
      "image/heif",
      "image/heic",
    ];
    // valid mimetypes for video
    const validVideoMimeTypes = [
      "video/mp4",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-ms-wmv",
      "video/x-flv",
      "video/x-matroska",
      "video/3gpp",
      "video/3gpp2",
      "video/x-m4v",
      "video/mp2t",
    ];
    // valid document mimetypes
    const validDocumentMimeTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
      "application/rtf",
      "application/vnd.oasis.opendocument.text",
      "application/vnd.oasis.opendocument.spreadsheet",
      "application/vnd.oasis.opendocument.presentation",
      "application/vnd.oasis.opendocument.graphics",
      "application/vnd.oasis.opendocument.formula",
      "text/csv",
    ];

    if (
      mimetype.startsWith("video/") &&
      validVideoMimeTypes.includes(mimetype)
    ) {
      cb(null, "uploads/videos");
    } else if (
      mimetype.startsWith("image/") &&
      validImageMimeTypes.includes(mimetype)
    ) {
      cb(null, "uploads/images");
    } else if (
      mimetype.startsWith("application/") &&
      validDocumentMimeTypes.includes(mimetype)
    ) {
      cb(null, "uploads/documents");
    }
    // invalid file types
    else {
      cb(new Error("Invalid file type"));
    }
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const fileName = `${file.originalname}-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
