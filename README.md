# EtherScan Web Application

Welcome to the EtherScan Web Application repository! This application fetches and displays Ethereum blockchain data using the Etherscan API. It provides real-time information such as transaction count, balance, and recent transactions for a given Ethereum address.

## Features

- Fetches Ethereum transaction count and balance using the Etherscan API.
- Retrieves and displays confirmed transactions associated with a specified Ethereum address.
- Updates transaction and balance data every 10 seconds to reflect real-time changes.
- Provides error handling and feedback for API requests.

## Technologies Used

- **Next.js**: React framework for server-side rendering (SSR) and client-side development.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Ethers.js**: JavaScript library for interacting with the Ethereum blockchain.
- **Axios**: Promise-based HTTP client for making API requests.

## Setup

To run this project locally, follow these steps:

```bash
# Clone the repository:
git clone https://github.com/your-username/etherscan-web-app.git
cd etherscan-web-app

# Install dependencies:
npm install
# or
yarn install
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_DONOR_ETHSCAN_APIKEY=your_etherscan_api_key
NEXT_PUBLIC_DONOR_ETH_ADDRESS=your_eth_master_address
```

Replace `your_etherscan_api_key` with your actual Etherscan API key. If you don't have one, you can obtain it from [Etherscan API](https://etherscan.io/apis).

## Running the Development Server

```bash
# Run the development server:
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage

- Upon running the development server, the application will fetch and display Ethereum transaction data associated with the provided address.
- Click the "Fetch Data" button to manually update the transaction and balance information.
- The application updates transaction and balance data automatically every 10 seconds for real-time monitoring.

## Contributions

Contributions to enhance the functionality and features of this application are welcome. Please fork the repository and create a pull request with your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## BACKEND EXPRESS

Create a migration
```shell
npx knex migrate:make migration_name
npx knex migrate:make create_articles_table
```

Run Migrations
```shell
npx knex migrate:latest
```

Seed Database
```shell
npx knex seed:run
```

You can also generate a seed file using:
```shell
npx knex seed:make seed_name
```

Check Migration Status
```shell
npx knex migrate:status
```