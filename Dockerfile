# เลือกฐานของเว็บเซิร์ฟเวอร์ที่รวม PHP และ extension mysqli
FROM php:7.4-apache

# คัดลอกไฟล์ api.php ไปยังเซิร์ฟเวอร์
COPY Api.php /var/www/html/

# ติดตั้งและเปิดใช้งาน PHP extension mysqli
RUN docker-php-ext-install mysqli

# เริ่มเซิร์ฟเวอร์ Apache
CMD ["apache2-foreground"]
