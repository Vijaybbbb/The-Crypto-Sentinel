# Crypto Sentinel Backend
-Hosted to aws http://13.51.158.44:3000

## Features

- RESTful API for alert management
- Real-time price monitoring using CoinGecko API
- Rate-limited price fetching (60-second intervals)
- Alert status management (ACTIVE → TRIGGERED)
- Three-layer architecture (Controller → Business → Service)
- Comprehensive error handling
- Security headers with Helmet.js
- CORS enabled for cross-origin requests
- Complete test coverage with Jest
- Docker containerization support

Note : Alerts are stored in-memory for simplicity. This can be easily extended to a persistent database.

## Architecture

```
src/
├── controllers/     # HTTP request/response handling
├── business/        # Business logic layer
├── services/        # Data operations & external APIs
├── config/          # Database & environment configuration
├── utils/           # Common utilities
├── jobs/            # Background price monitoring
├── routes/          # API route definitions
└── __tests__/       # Unit & integration tests
```

## Ai used
- Used ChatGPT 5.0 to read documentation and SDKs for the CoinGecko API
- Used Claude Sonnet 4.5 to build service-layer logic for alert functionality using the Amazon Q VS Code extension
- Built test suites
- Used AI to implement security in Express.js and to create custom error-handling middleware
- Created a well-structured README file and Docker files


## AWS Live Endpoints

- **POST** – http://13.51.158.44:3000/alerts – Create Alert  
- **GET** – http://13.51.158.44:3000/alerts – Get All Alerts  
- **DELETE** – http://13.51.158.44:3000/alerts/:id – Delete Alert




## Quick Start

### Local Development------------------------------
```bash
npm install
npm start
```

### Docker----------------------------
```bash
# Build and run
docker build -t crypto-sentinel .
docker run -p 3000:3000 crypto-sentinel
```

### Testing-------------------------------
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
```

## API Endpoints----------------------------------------------

### Create Alert
```bash
POST /alerts
Content-Type: application/json
##targetPrice expect usd
{
  "cryptocurrency": "bitcoin",
  "targetPrice": 100000,
  "condition": "above"
}
```
**Response**: Alert object with `id`, `status`, `createdAt`

### List Alerts
```bash
GET /alerts
```
**Response**: Array of alerts with current prices

### Delete Alert
```bash
DELETE /alerts/:id
```
**Response**: Deleted Message

## Example Usage

```bash
# Create an alert for Bitcoin above $100,000
curl -X POST http://localhost:3000/alerts \
  -H "Content-Type: application/json" \
  -d '{"cryptocurrency": "bitcoin", "targetPrice": 100000, "condition": "above"}'

# Create an alert for Ethereum below $3,000
curl -X POST http://localhost:3000/alerts \
  -H "Content-Type: application/json" \
  -d '{"cryptocurrency": "ethereum", "targetPrice": 3000, "condition": "below"}'

# List all alerts with current prices
curl http://localhost:3000/alerts

# Delete an alert
curl -X DELETE http://localhost:3000/alerts/ALERT_ID
```




## Alert Conditions

- **above**: Triggers when price reaches or exceeds target
- **below**: Triggers when price drops to or below target

## Alert Status Flow

1. **ACTIVE**: Alert is monitoring price
2. **TRIGGERED**: Alert condition met, stops monitoring

## Supported Cryptocurrencies

Use CoinGecko IDs: `bitcoin`, `ethereum`, `cardano`, `polkadot`, `solana`, etc.

## Environment Variables

- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode (development/production)

## Dependencies

- **express**: Web framework
- **axios**: HTTP client for CoinGecko API
- **cors**: Cross-origin resource sharing
- **helmet**: Security headers
- **uuid**: Unique ID generation
- **jest**: Testing framework
- **supertest**: API testing

## Development

```bash
npm run dev          # Development with nodemon
npm test             # Run tests
npm run test:watch   # Test watch mode
```

## Production Deployment

```bash
# Docker
docker build -t crypto-sentinel .
docker run -p 3000:3000 crypto-sentinel

# Direct
NODE_ENV=production npm start
```