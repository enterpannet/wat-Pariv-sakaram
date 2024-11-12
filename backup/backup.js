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
        testGoogleDriveUpload(backupPath, backupFileName);
    });
}

// ฟังก์ชันอัปโหลดไฟล์ไป Google Drive
async function testGoogleDriveUpload() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const drive = google.drive({ version: 'v3', auth });
    try {
        const response = await drive.files.list({
            pageSize: 10,
            fields: 'files(id, name)',
        });
        console.log('Connected to Google Drive. Files:', response.data.files);
    } catch (error) {
        console.error('Error connecting to Google Drive:', error.message);
    }
}
// ตั้ง cron job ให้ทำงานทุกวันตอนเที่ยงคืน
cron.schedule('59 0 * * *', backupDatabase, {
    scheduled: true,
    timezone: 'Asia/Bangkok',
});

console.log('Database backup and upload to Google Drive scheduled to run daily at midnight.');
