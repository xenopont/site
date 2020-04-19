const environments = {
    dev: 'development',
    prod: 'production',
}

const db = {
    connectionString: 'not configured',
}

export default {
    PORT: process.env.PORT || 80,

    currentEnvironment: environments.prod,
    db,
    environments,
    welcomeMessage: () => {},
}
