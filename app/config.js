const { hostname } = window.location;

const Config = {
    BASE_URL: true || process.env.NODE_ENV === 'production' ? '/api/' : 'http://localhost:7000/api/',
    LANDING_URL: '/home'
};

export default Config;
