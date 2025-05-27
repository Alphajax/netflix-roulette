// src/axiosClient.js

import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000', // Base URL for your API
  timeout: 10000, // Set a timeout for requests (optional)
})

export default axiosClient
