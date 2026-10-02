# Express Products API with Caching

A simple Express application organized into a layered architecture with custom cache middleware.

## Architecture Flow
`Route` → `Middleware` → `Controller` → `Service` → `Database`

## Features
- **Layered Structure**: Reusable `routes`, `controllers`, `services`, and `database` modules.
- **Cache Middleware**: Returns `X-Cache: HIT` or `X-Cache: MISS` response headers for GET endpoints.
- **Cache Invalidation**: Automatically clears cache whenever data is modified (`POST`, `PUT`, `PATCH`, `DELETE`).
- **1-Minute TTL**: Cache entries expire after 1 minute to ensure fresh data.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm run server
   ```
