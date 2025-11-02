#!/bin/sh
set -e

echo "🔄 Waiting for PostgreSQL to be ready..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
  if nc -z "${POSTGRES_DB_HOST}" "${POSTGRES_DB_PORT}" 2>/dev/null; then
    echo "✅ PostgreSQL is ready!"
    break
  fi
  attempt=$((attempt + 1))
  echo "⏳ PostgreSQL is unavailable - sleeping (attempt $attempt/$max_attempts)"
  sleep 2
done

if [ $attempt -eq $max_attempts ]; then
  echo "❌ PostgreSQL failed to become ready after $max_attempts attempts"
  exit 1
fi

echo "🔄 Running database migrations..."
pnpm run migration:run:prod || {
  echo "❌ Migration failed!"
  exit 1
}

echo "✅ Migrations completed successfully!"
