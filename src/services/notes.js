/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import axios from 'axios';

const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = newObject => {
    const config = {
        headers: { Authorization: token },
    };
    const request = axios.post(baseUrl, newObject, config);
    return request.then(response => response.data)
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
};

export default {
    getAll,
    create,
    update,
    setToken
}