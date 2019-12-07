/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import axios from 'axios'
const baseUrl = '/api/login';

const login = async credentials => {
    const response = await axios.post(baseUrl, credentials);
    return response.data
};

export default { login }