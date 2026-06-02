
## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Edit config database (Sebenarnya Ga Perlu Diubah Lagi Karena Udah Pake PostgreSQL Cloud)
Di `config/config.json`, ubah:
```json
{
  "development": {
    "username": "root",
    "password": "YOUR_PASSWORD",
    "database": "hashmicro",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### 3. Jalankan server
```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Buka: http://localhost:3000
