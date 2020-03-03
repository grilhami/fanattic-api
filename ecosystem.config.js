module.exports = {
  apps: [
    {
      name: 'FanatticAPI',
      script: './index.js',
      env: {
        NODE_ENV: 'development',
        PORT: 4771,
      },
      env_test: {
        NODE_ENV: 'test',
        PORT: 4771,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 800,
      },
      time: true,
    },
  ],
};
