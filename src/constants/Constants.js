//localhost
if (process.env.NODE_ENV === 'development' && !process.env.REACT_APP_ENVI)
    var BASE_URL = "http://localhost:8000";

export default {
    BASE_URL: BASE_URL
}