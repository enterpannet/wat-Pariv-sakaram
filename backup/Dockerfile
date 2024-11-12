# Dockerfile
FROM node:14

# ติดตั้ง postgresql-client เพื่อใช้งาน pg_dump
RUN apt-get update && apt-get install -y postgresql-client

# คัดลอกไฟล์ทั้งหมดจากโฟลเดอร์ backup ไปยัง container
WORKDIR /app
COPY . .

# ติดตั้ง dependencies
RUN npm install

# รันสคริปต์
CMD ["node", "backup.js"]
