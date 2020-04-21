const environments = {
    dev: 'development',
    prod: 'production',
}

const db = {
    connectionString: 'not configured',
    collections: {
        articles: 'articles',
    }
}

export default {
    PORT: process.env.PORT || 80,

    currentEnvironment: environments.prod,
    db,
    environments,
    welcomeMessage: () => {},
}
