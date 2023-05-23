// Production Branch
const fs = require('fs');

// SQL Config
const sqlCFG = {
    host: 'schooladmin.mysql.database.azure.com',
    user: 'paulorogero',
    password: 'Omnitribe@2023!',
    database: 'school1',
    port: 3306,
    ssl: {
        rejectUnauthorized: true,
        // ca: fs.readFileSync('./libs/CERT/BaltimoreCyberTrustRoot.crt.pem')
        ca: fs.readFileSync('./libs/CERT/DigiCertGlobalRootCA.crt.pem')
    }
}

//Helmet Config
const cspSrc = [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    "'unsafe-hashes'",
    "'unsafe-inline'",
    "data:",
    "blob:",
    "wss:"
];
const contentSecurityPolicy = {
    useDefaults: true,
    directives: {
        childSrc: cspSrc,
        workerSrc: cspSrc,
        connectSrc: cspSrc,
        scriptSrc: cspSrc,
        styleSrc: cspSrc,
        defaultSrc: [

        ],
        imgSrc: [
            "'self'",
            "blob:",
            "data:",
            "images.unsplash.com"
        ],
        "frame-ancestors": [
            "*"
        ]
    },
}

//CORS Config
const allowedOrigins = 
    [
        'http://localhost:8080'
    ];

//Export Configurations
const config = {
    cspConfig: contentSecurityPolicy,
    allowedOrigins,
    sqlCFG
};

module.exports = config;