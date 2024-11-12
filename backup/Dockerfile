# Dockerfile
FROM node:20

# ติดตั้ง postgresql-client เพื่อใช้งาน pg_dump
RUN apt-get update && apt-get install -y postgresql-client

# กำหนด working directory ใน container
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดจากโฟลเดอร์ backup ไปยัง container
COPY . .

# ติดตั้ง dependencies
RUN npm install

# รันสคริปต์
CMD ["node", "backup.js"]
