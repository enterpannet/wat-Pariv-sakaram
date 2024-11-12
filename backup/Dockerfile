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
ENV PG_USER=<your_pg_user>
ENV PG_PASSWORD=<your_pg_password>
ENV PG_HOST=<your_pg_host>
ENV PG_PORT=5432
ENV PG_DATABASE=<your_database_name>
ENV BACKUP_DIR=/app/backups
ENV GOOGLE_DRIVE_FOLDER_ID=<your_google_drive_folder_id>

# สร้าง backup directory ใน container
RUN mkdir -p $BACKUP_DIR

# รันโปรแกรม
CMD ["node", "backup.js"]
