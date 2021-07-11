const { ErrorHandler, codesEnum } = require('../../errors');
const { fileEnum } = require('../../constants');

module.exports = (req, res, next) => {
    try {
        if (req.files) {
            const files = Object.values(req.files);

            const documents = [];
            const videos = [];
            const photos = [];
            for (let i = 0; i < files.length; i++) {
                const { size, mimetype } = files[i];

                if (fileEnum.PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > fileEnum.PHOTO_MAX_SIZE) {
                        throw new ErrorHandler(codesEnum.BAD_REQUEST, 'File is too big', 4006);
                    }

                    photos.push(files[i]);
                } else if (fileEnum.VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (size > fileEnum.VIDEO_MAX_SIZE) {
                        throw new ErrorHandler(codesEnum.BAD_REQUEST, 'File is too big', 4006);
                    }

                    videos.push(files[i]);
                } else if (fileEnum.DOCS_MIMETYPES.includes(mimetype)) {
                    if (size > fileEnum.FILE_MAX_SIZE) {
                        throw new ErrorHandler(codesEnum.BAD_REQUEST, 'File  is too big', 4006);
                    }

                    documents.push(files[i]);
                } else {
                    throw new ErrorHandler(codesEnum.BAD_REQUEST, 'Wrong file format', 4007);
                }
            }

            req.documents = documents;
            req.videos = videos;
            req.photos = photos;

            [req.avatar] = req.photos;
        }

        next();
    } catch (e) {
        next(e);
    }
};
