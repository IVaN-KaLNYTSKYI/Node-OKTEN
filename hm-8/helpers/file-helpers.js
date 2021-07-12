const path = require('path');
const fs = require('fs');
const uuid = require('uuid').v1;
const { promisify } = require('util');

const mkdirPromise = promisify(fs.mkdir);

module.exports = {
    fileDownload: async (fileName, itemId, itemType, fileType) => {
        const pathWithoutStatic = path.join(itemType, itemId.toString(), fileType);
        const photoDirectory = path.join(process.cwd(), 'static', pathWithoutStatic);

        const fileExtension = fileName.split('.').pop();
        const photoName = `${uuid()}.${fileExtension}`;
        const finalPath = path.join(photoDirectory, photoName);

        await mkdirPromise(photoDirectory, { recursive: true });

        return {
            finalPath,
            photoPath: path.join(pathWithoutStatic, photoName)
        };
    },
    removeFileAvatar: (fileId) => {
        const avatar = path.join(process.cwd(), 'static', 'users', fileId, 'avatar');

        fs.rmdir(avatar, { recursive: true }, (err) => err && console.log(err));
    },

    removeFileGallery: (fileId) => {
        const gallery = path.join(process.cwd(), 'static', 'users', fileId, 'gallery');

        fs.rmdir(gallery, { recursive: true }, (err) => err && console.log(err));
    },

    removeFileID: (fileId) => {
        const file = path.join(process.cwd(), 'static', 'users', fileId);

        fs.rmdir(file, { recursive: true }, (err) => err && console.log(err));
    },

    unlinkFileAvatar: (fileId) => {
        const avatar = path.join(process.cwd(), 'static', 'users', fileId, 'avatar');
        fs.readdir(avatar, (err, files) => {
            if (err) {
                console.log(err);
                return;
            }

            files.forEach((file) => {
                fs.unlink(`${avatar}/${file}`, (statError) => {
                    if (statError) {
                        console.log(statError);
                    }
                });
            });
        });
    },

};
