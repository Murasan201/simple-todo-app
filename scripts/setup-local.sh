#!/bin/bash

echo "🚀 Setting up local development environment..."

# Copy development schema
echo "📋 Setting up SQLite database..."
cp prisma/schema.dev.prisma prisma/schema.prisma

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push database schema
echo "📊 Creating database tables..."
npx prisma db push

echo "✅ Local setup complete!"
echo ""
echo "📍 Next steps:"
echo "  1. Run: npm run dev"
echo "  2. Open: http://localhost:3000"
echo "  3. Test user registration and login"
echo ""
echo "🗄️  Database location: ./prisma/dev.db"
echo "🔍 View database: npx prisma studio"