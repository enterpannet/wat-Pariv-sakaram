# ใช้ Node.js image
FROM node:18

# ติดตั้ง PostgreSQL client เพื่อใช้คำสั่ง pg_dump
RUN apt-get update && apt-get install -y postgresql-client && apt-get clean

# กำหนด directory ที่จะใช้ใน container
WORKDIR /app

# คัดลอกไฟล์ project ทั้งหมดไปยัง container
COPY . .

# ติดตั้ง dependencies
RUN npm install

# ตั้งค่า environment variables (ถ้าใช้ dotenv ให้ npm install dotenv และเพิ่มใน container ด้วย)
ENV PG_USER=watRoot
ENV PG_PASSWORD=wat123546
ENV PG_HOST=210.246.215.231
ENV PG_PORT=5432
ENV PG_DATABASE=wat
ENV BACKUP_DIR=/app/backups
ENV GOOGLE_DRIVE_FOLDER_ID="/app/credentials/credentials.json"

# สร้าง backup directory ใน container
RUN mkdir -p $BACKUP_DIR

# รันโปรแกรม
CMD ["node", "backup.js"]
