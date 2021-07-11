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
};
