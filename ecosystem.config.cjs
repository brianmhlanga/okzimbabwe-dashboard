module.exports = {
    apps: [
      {
        name: 'Backoffice Zimbabwe',
        port: '3001',
        exec_mode: 'cluster',
        instances: '1',
        script: './.output/server/index.mjs' 
      }
    ]
  }