#!/bin/bash
# Quick Start Guide for Backend Integration

echo "🚀 IfyWigatechz Backend Integration - Quick Start"
echo "================================================"
echo ""

# Check if MongoDB is running
echo "1️⃣  Checking MongoDB connection..."
if mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1 || mongo --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is not running. Start it first."
    echo "   Run: mongod"
    exit 1
fi

# Install dependencies if needed
echo ""
echo "2️⃣  Checking dependencies..."
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

echo "✅ Dependencies ready"

# Start the backend
echo ""
echo "3️⃣  Starting backend server..."
cd server && npm run dev &
SERVER_PID=$!

echo "✅ Backend running on http://localhost:5000"
echo "   PID: $SERVER_PID"

# Start the frontend
echo ""
echo "4️⃣  Starting frontend (in another terminal)..."
echo "   Run: npm run dev"

echo ""
echo "================================================"
echo "Test the health endpoint:"
echo "   curl http://localhost:5000/api/health"
echo ""
echo "API Documentation:"
echo "   Base URL: http://localhost:5000/api"
echo "   Courses: GET /courses"
echo "   Products: GET /products"
echo "   Solutions: GET /solutions"
echo "================================================"
