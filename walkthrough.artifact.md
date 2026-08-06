# Walkthrough - Mobile Connectivity Support

I have updated the application's network configuration to ensure that emulated phones and other mobile devices on your network can communicate with the backend API.

## Changes Made

### 1. Unified Network IP
- **New API Target**: Changed the frontend's API URL from `localhost` to your computer's actual network IP: `http://192.168.100.35:4000`.
- **Reasoning**: This allows the emulated phone (which sees itself as `localhost`) to correctly route requests to your computer where the backend services are running.

### 2. Updated Build Pipeline
- **Docker Integration**: Updated both `docker-compose.yml` and the frontend `Dockerfile` to use this IP during the build and runtime phases.

## How to Apply

> [!IMPORTANT]
> To apply these changes, you must rebuild the frontend container:

```bash
docker compose up --build
```

## How to Verify
1. **Access from Phone**: Open the browser on your emulated phone and go to:
   `http://192.168.100.35:3000`
2. **Login**: Sign in with `admin` / `admin123`.
3. **Network Check**: Verify that data (like scan instructions) loads correctly on the mobile device.

## Note on Computer Access
The app will now use the network IP even when accessed from your computer. You can still reach it at `http://localhost:3000`, but internally it will talk to the API via `192.168.100.35`.
