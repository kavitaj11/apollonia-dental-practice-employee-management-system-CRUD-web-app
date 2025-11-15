# Running the Apollonia Employee Management App

## Option A — Local (Node.js + Local MongoDB)

### 1. Install dependencies
```bash
npm install
```

### 2. Create environment file
```bash
cp .env.sample .env
```

### 3. (Optional) Seed sample data
```bash
npm run seed
```

### 4. Start the server
```bash
npm start
```

### 5. Open in browser
```
http://localhost:3000
```

---

## Option B — Using Docker & Docker Compose

### 1. Build & run containers
```bash
docker-compose up --build
```

### 2. Seed data inside app container
```bash
docker-compose exec app npm run seed
```

### 3. Open in browser
```
http://localhost:3000
```
