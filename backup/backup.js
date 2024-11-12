const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');
require('dotenv').config();

const PG_USER = process.env.PG_USER;
const PG_PASSWORD = process.env.PG_PASSWORD;
const PG_HOST = process.env.PG_HOST;
const PG_PORT = process.env.PG_PORT;
const PG_DATABASE = process.env.PG_DATABASE;
const BACKUP_DIR = process.env.BACKUP_DIR || './backups';
const GOOGLE_DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
const GOOGLE_APPLICATION_CREDENTIALS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
// ตั้งค่า Google Drive API
const auth = new google.auth.GoogleAuth({
    keyFile: `${GOOGLE_APPLICATION_CREDENTIALS}`,
    scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });

// ฟังก์ชันสำหรับ backup
function backupDatabase() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${PG_DATABASE}-${timestamp}.sql`;
    const backupPath = path.join(BACKUP_DIR, backupFileName);

    const dumpCommand = `PGPASSWORD="${PG_PASSWORD}" pg_dump -U ${PG_USER} -h ${PG_HOST} -p ${PG_PORT} -F c -b -v -f ${backupPath} ${PG_DATABASE}`;

    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Backup failed: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`pg_dump error: ${stderr}`);
            return;
        }
        console.log(`Backup successful: ${backupPath}`);
        uploadToGoogleDrive(backupPath, backupFileName);
    });
}

// ฟังก์ชันอัปโหลดไฟล์ไป Google Drive
async function uploadToGoogleDrive(filePath, fileName) {
    try {
        const fileMetadata = {
            name: fileName,
            parents: [GOOGLE_DRIVE_FOLDER_ID],
        };
        const media = {
            mimeType: 'application/octet-stream',
            body: fs.createReadStream(filePath),
        };

        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });

        console.log(`File uploaded successfully, File ID: ${response.data.id}`);
        
        // List files in the folder to confirm the upload
        const files = await drive.files.list({
            q: `'${GOOGLE_DRIVE_FOLDER_ID}' in parents`,
            fields: 'files(id, name)',
        });

        console.log('Files in Drive:');
        files.data.files.forEach(file => {
            console.log(`- ${file.name} (ID: ${file.id})`);
        });

        fs.unlinkSync(filePath); // ลบไฟล์หลังจากอัปโหลดสำเร็จ
    } catch (error) {
        console.error(`Error uploading file to Google Drive: ${error.message}`);
    }
}

async function listFilesInDrive() {
    try {
        const response = await drive.files.list({
            pageSize: 10,
            fields: 'files(id, name)',
        });
        console.log('Files in Drive:');
        response.data.files.forEach((file) => console.log(`${file.name} (${file.id})`));
    } catch (error) {
        console.error(`Error listing files: ${error.message}`);
    }
}

// ทดสอบเรียกใช้งานเพื่อดูว่าเข้าถึงได้หรือไม่
listFilesInDrive();


// ตั้ง cron job ให้ทำงานทุกวันตอนเที่ยงคืน
// cron.schedule('30 0 * * *', backupDatabase, {
//     scheduled: true,
//     timezone: 'Asia/Bangkok',
// });
backupDatabase()
console.log('Database backup and upload to Google Drive scheduled to run daily at midnight.');
