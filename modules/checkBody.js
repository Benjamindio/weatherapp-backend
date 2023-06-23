function checkBody(body, value) {
    let haveValue = true
    for (const field of value) {
        if(!body[field] || body[field] === "") {
            haveValue = false;
            return haveValue;
        }
    }
    return haveValue;
}

module.exports = {checkBody}