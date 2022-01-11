class PermissionError extends Error {
    constructor(message) {
        super(message);
        this.name = "PermissionError";
    }
}

module.exports.PermissionError = PermissionError;