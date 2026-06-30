module.exports = {
  apps: [
    {
      name: 'ifywigatechz-backend',
      script: './server/server.js',
      instances: 'max', // Scales to use all available CPU cores
      exec_mode: 'cluster', // Enables load balancing
      watch: false, // Set to true only in development
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './server/logs/pm2-error.log',
      out_file: './server/logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      merge_logs: true,
      // Wait 3000ms before restarting if it crashes
      restart_delay: 3000,
      // Ensure the process is killed properly before restart
      kill_timeout: 5000
    }
  ]
};