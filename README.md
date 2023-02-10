# Otomatisasi absen

- Headless Browser - [Puppeteer](https://pptr.dev/)
- Cron Job with - [Github Actions](https://docs.github.com/en/actions)

## How to use
1. Fork this repository
2. Buat file `.env` di root project
3. Isi file `.env` dengan format berikut:
    ```
    SITE="website kampusmu itu"
    NIM="your_nim"
    PASSWORD="your_password"
    ```
4. Commit and push to server
5. Buat cron job di Github Actions
6. Done
