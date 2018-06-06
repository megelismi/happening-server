/**
 * Check if the required elements for an route were provided in
 * the request body or request params
 *
 * @param {object}          request
 * @param {object}          response
 * @param {function}        next
 * @param {object[]|string} required
 *
 * @returns {boolean|promise}
 *
*/

export const requiredParam = (request, response, next, required) => {
    let missingRequiredParam = false;

    if (Array.isArray(required)) {
        for (let i = 0; i < required.length; i++) {
            if (!request.body[required[i]] && !request.param[required[i]]) {
                missingRequiredParam = true;

                break;
            }
        }
    } else {
        if (!request.body[required] && !request.param[required]) {
            missingRequiredParam = true;
        }
    }

    if (missingRequiredParam) {
        return response.status(422).json({ error: 'Missing required parameter(s)' });
    }

    next();
};

