# 1. استخدام نسخة Node خفيفة ومستقرة
FROM node:18-alpine

# 2. تحديد الفولدر الشغال جوه الحاوية
WORKDIR /app

# 3. نسخ ملفات التعريف وتثبيت الـ Dependencies الأول (عشان الـ Cache)
COPY package*.json ./
RUN npm install

# 4. نسخ باقي كود السيرفر
COPY . .

# 5. فتح البورت اللي السيرفر شغال عليه
EXPOSE 5000

# 6. أمر تشغيل السيرفر
CMD ["node", "server.js"]