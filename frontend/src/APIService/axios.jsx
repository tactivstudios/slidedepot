import axios from 'axios';
import React from 'react';

export default axios.create({
    baseURL: 'http://127.0.0.1:8000/'
});

