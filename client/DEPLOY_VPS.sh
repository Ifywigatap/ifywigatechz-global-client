#!/bin/bash

# 🚀 IfyWigatechz VPS Deployment Script
echo "Starting Deployment..."

# 1. Navigate to the project root
# (Assumes the script is executed from the project root on the VPS)

# 2. Pull the latest code from GitHub
echo "📥 Pulling latest changes from git..."
git pull origin main

# 3. Install Backend Dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install --production
cd ..

# 4. Run any migrations or cleanups if necessary
echo "🧹 Running property cleanup..."
# (Optional: you could trigger a manual run of your cleanup script here if needed)

# 5. Restart the application using PM2
echo "🔄 Reloading application with PM2..."
pm2 reload ecosystem.config.cjs --env production

echo "✅ Deployment Successful!"
echo "Check logs with: pm2 logs ifywigatechz-backend"
pm2 status