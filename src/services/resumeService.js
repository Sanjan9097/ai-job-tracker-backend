import fs from 'fs';
import path from 'path';

const usersPath = path.resolve('src/data/users.json');

export function saveResume(email, resumeText) {
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    users[email].resumeText = resumeText;
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

export function getResume(email) {
    const users = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    return users[email]?.resumeText || '';
}
