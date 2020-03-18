module.exports = reqBody => {
    const userTypes = ['end', 'artist', 'manager', 'content', 'god']

    if (!(reqBody.type in userTypes)) {
        const message = "User type was not provided."
        return (null, message)
    } else {

        // End user
        if (reqBody.type == 'end') {
            if (!reqBody.preference) {
                const message = `Not enought data provided for user type ${reqBody.type}`;
                return (null, message);
            } else {
                return (reqBody.type)
            }
        }

        // Artist
        if (reqBody.type == 'artist') {
            if (!reqBody.label) {
                const message = `Not enought data provided for user type ${reqBody.type}`;
                return (null, message);
            } else {
                return (reqBody.type)
            }
        }

        // Manager
        if (reqBody.type == 'manager') {
            if (!reqBody.company) {
                const message = `Not enought data provided for user type ${reqBody.type}`;
                return (null, message);
            } else {
                return (reqBody.type)
            }
        }

        // Content
        if (reqBody.type == 'end') {
            if (!reqBody.platform) {
                const message = `Not enought data provided for user type ${reqBody.type}`;
                return (null, message);
            } else {
                return (reqBody.type)
            }
        }

        // gods
        if (reqBody.type == 'god') {
            if (!reqBody.godLabel) {
                const message = `Not enought data provided for user type ${reqBody.type}`;
                return (null, message);
            } else {
                return (reqBody.type)
            }
        }
    }

};