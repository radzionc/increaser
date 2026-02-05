# Increaser App

This directory contains the frontend application for Increaser, built with Next.js. It's part of a yarn monorepo.

## Getting Started

### Prerequisites

- Node.js (version 14 or later recommended)
- Yarn

### Installation

1. Clone the repository
2. Navigate to the root directory of the monorepo
3. Install dependencies using yarn:
   ```
   yarn install
   ```

### Environment Variables

To run the application locally, you need to set up environment variables. Create a `.env.development.local` file in the `product/app` directory with the following variables:

```
# Authentication
NEXT_PUBLIC_GOOGLE_CLIENT_ID=1014540554504-pn7mcbh6vp7dhm67nuo41n4n0e8ce500.apps.googleusercontent.com
NEXT_PUBLIC_FACEBOOK_APP_ID=356315411761615

# API Configuration
NEXT_PUBLIC_API_URL=https://pomodoro-api.increaser.org
NEXT_PUBLIC_WEBSITE_URL=https://increaser.org
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Running the Application

Start the development server from the monorepo root:

```
yarn workspace @product/app dev
```

Or navigate to the app directory and run:

```
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the application for production:

```
yarn workspace product-app build
```

Or within the app directory:

```
yarn build
```

Then start the production server:

```
yarn workspace product-app start
```

Or within the app directory:

```
yarn start
```

## Project Structure

- `components/` - React components
- `pages/` - Next.js pages
- `public/` - Static assets
- `styles/` - CSS and styling files
- `utils/` - Utility functions

## Additional Resources

For more information on the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Yarn Workspaces Documentation](https://classic.yarnpkg.com/en/docs/workspaces/)
