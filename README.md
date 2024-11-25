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

AdminJs icon set:
https://storybook.adminjs.co/?path=/docs/designsystem-atoms-icon--docs


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

Log into posgres Server
```shell
sudo -i -u postgres
```
psql cli:
```shell
psql
```
Select DB (ex: \c donorhub-local-database;)
```shell
\c your_database_name; 
SELECT * FROM knex_migrations;
```

Run DB commnads
```shell
SELECT * FROM knex_migrations;
UPDATE knex_migrations SET name = REPLACE(name, '.js', '.cjs');
```


# Nginx Configuration for DonorHub

This document outlines the steps for configuring Nginx in both local and production environments to serve static files, handle file uploads, and ensure everything is properly routed.

## Local vs Production Configuration

### 1. **Actions That Happen Locally vs. Production**

| Action                         | Local (npm run dev)                              | Production                                      |
|--------------------------------|-------------------------------------------------|------------------------------------------------|
| **Serve Static Files**         | Handled by the dev server (e.g., Next.js)       | Must be explicitly configured in Nginx         |
| **Upload Files to `/assets/`** | Saved to `public/assets/uploads` locally        | Backend must save to the correct path (`/var/www/donorWebApp/public/assets/uploads`) |
| **Access Uploaded Files**      | Available via `http://localhost/assets/...`     | Nginx must route `/assets/` properly           |

---

### 2. **Setup Steps for Nginx (Production)**

#### Step 1: Configure Nginx to Serve Static Files

Edit the Nginx configuration file for your project:

```bash
sudo nano /etc/nginx/sites-available/donor-hub
```

Update or add the following `location` block to serve the static files (like images, PDFs, etc.) from the `/assets` folder:

```nginx
# Serve static files from /assets/uploads/
location /assets/ {
    root /var/www/donorWebApp/public;
    autoindex off; # Disable directory listing for security
}
```

#### Step 2: Check Nginx Configuration

Before reloading Nginx, check that the configuration file is valid:

```bash
sudo nginx -t
```

This will test for syntax errors in your Nginx configuration. If the test passes, you'll see a message like `nginx: configuration file /etc/nginx/nginx.conf test is successful`.

#### Step 3: Reload Nginx

To apply the changes, reload the Nginx service:

```bash
sudo systemctl reload nginx
```

This will apply the new configuration without downtime.


---

### 3. **File Uploads Configuration in Backend**

In your backend (e.g., Express or Next.js API), make sure to upload files to the correct path:

- **Local Development**: Files are saved to `public/assets/uploads/`.
- **Production**: Files should be saved to `/var/www/donorWebApp/public/assets/uploads/` on the server.

For example, if you are using Express, the file upload route might look like this:

```js
app.post('/upload', (req, res) => {
    // Use multer or other libraries to save files
    // Ensure files are saved to `/var/www/donorWebApp/public/assets/uploads/` in production
});
```

Make sure to adjust the path for the uploaded files in the production environment.

---

### 4. **Accessing Uploaded Files**

- **Local Development**: Files are accessible through `http://localhost/assets/uploads/...`.
- **Production**: Files are accessible through `https://donorhub.site/assets/uploads/...`.

---

### 5. **Test File Access**

After configuration, try accessing a file (e.g., an image) through your browser in both environments.

In **production**:

```url
https://donorhub.site/assets/uploads/file-dummy1-1732286374375-746456809.jpg
```

If everything is configured correctly, the file should load.

---

### 6. **Troubleshooting**

- **File Not Accessible**: Ensure Nginx is properly serving the `/assets/` path and that the files are located in `/var/www/donorWebApp/public/assets/uploads/`.
- **Permissions Issue**: Check that Nginx has read permissions on the `/assets/uploads/` directory.
- **Nginx Configuration Errors**: If Nginx fails to reload, check for syntax errors with `sudo nginx -t` and fix any issues before reloading.

---

### Conclusion

In production, Nginx must be configured to serve static files, and the backend must upload files to the correct path (`/var/www/donorWebApp/public/assets/uploads/`). Always remember to test after modifying your Nginx configuration and ensure proper file permissions are set.
