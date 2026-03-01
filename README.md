<div align="center">

# 🎓 Academic Management System — Backend API

**REST API untuk sistem manajemen akademik — dosen, mahasiswa, jadwal, matakuliah, dan analisis dalam satu platform.**

<br/>

<table>
  <tr>
    <td align="center" colspan="5">
      <strong>🛠️ Tech Stack</strong>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=nestjs" width="48" height="48" alt="NestJS"/><br/>
      <sub><b>NestJS</b></sub>
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=ts" width="48" height="48" alt="TypeScript"/><br/>
      <sub><b>TypeScript</b></sub>
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=prisma" width="48" height="48" alt="Prisma"/><br/>
      <sub><b>Prisma ORM</b></sub>
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=mysql" width="48" height="48" alt="MySQL"/><br/>
      <sub><b>MySQL / MariaDB</b></sub>
    </td>
    <td align="center">
      <img src="https://skillicons.dev/icons?i=jest" width="48" height="48" alt="Jest"/><br/>
      <sub><b>Jest</b></sub>
    </td>
  </tr>
  <tr>
    <td align="center" colspan="5">
      <img src="https://img.shields.io/badge/Auth-JWT-black?style=flat-square&logo=jsonwebtokens&logoColor=white"/>
      &nbsp;
      <img src="https://img.shields.io/badge/ORM-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
      &nbsp;
      <img src="https://img.shields.io/badge/API-REST-blue?style=flat-square"/>
      &nbsp;
      <img src="https://img.shields.io/badge/Node.js-20.x-339933?style=flat-square&logo=node.js&logoColor=white"/>
    </td>
  </tr>
</table>

<br/>

[![NestJS](https://img.shields.io/badge/NestJS-10.x-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![MariaDB](https://img.shields.io/badge/MariaDB-10.x-003545?style=for-the-badge&logo=mariadb&logoColor=white)](https://mariadb.org)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io)

</div>

---

## 📁 Struktur Proyek

```
src/
├── analisis/           # Modul analisis & statistik akademik
├── auth/               # Autentikasi & otorisasi (JWT)
├── dosen/              # Manajemen data dosen
├── jadwal/             # Manajemen jadwal perkuliahan
├── mahasiswa/          # Manajemen data mahasiswa
├── matakuliah/         # Manajemen matakuliah
├── user/               # Manajemen user & role
└── app.controller.spec.ts
prisma/
├── schema.prisma       # Definisi skema database
└── migrations/         # Riwayat migrasi database
```

---

## ✨ Fitur

| Modul | Deskripsi |
|-------|-----------|
| 🔐 **Auth** | Login, register, refresh token via JWT |
| 👨‍🏫 **Dosen** | CRUD data dosen & penugasan mengajar |
| 🎓 **Mahasiswa** | CRUD data mahasiswa & informasi akademik |
| 📚 **Matakuliah** | Manajemen matakuliah & SKS |
| 📅 **Jadwal** | Penjadwalan kelas & perkuliahan |
| 📊 **Analisis** | Statistik & laporan akademik |
| 👥 **User** | Manajemen akun & hak akses |

---

## 🚀 Cara Menjalankan

### Prasyarat

Pastikan sudah terinstall:
- **Node.js** >= 20.x
- **npm** / **yarn** / **pnpm**
- **MySQL** atau **MariaDB** yang berjalan

### 1. Clone & Install

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

### 2. Konfigurasi Environment

```bash
cp .env.example .env
```

Isi file `.env`:

```env
# Database
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/nama_database"

# JWT
JWT_SECRET="your-super-secret-key"
JWT_EXPIRES_IN="7d"

# App
PORT=3000
NODE_ENV=development
```

### 3. Setup Database dengan Prisma

```bash
# Jalankan migrasi database
npx prisma migrate dev

# (Opsional) Isi data awal
npx prisma db seed

# Buka Prisma Studio untuk lihat data
npx prisma studio
```

### 4. Jalankan Aplikasi

```bash
# Development
npm run start:dev

# Production
npm run build
npm run start:prod
```

API akan berjalan di `http://localhost:3000`

---

## 🔐 Autentikasi

API menggunakan **JWT (JSON Web Token)**. Sertakan token di setiap request yang membutuhkan autentikasi:

```http
Authorization: Bearer <your_jwt_token>
```

### Endpoint Auth

```http
POST /auth/login      # Login & dapatkan token
POST /auth/register   # Registrasi user baru
POST /auth/refresh    # Refresh access token
POST /auth/logout     # Logout
```

---

## 📡 API Endpoints

```http
# Auth
POST    /auth/login
POST    /auth/register

# Dosen
GET     /dosen
POST    /dosen
GET     /dosen/:id
PATCH   /dosen/:id
DELETE  /dosen/:id

# Mahasiswa
GET     /mahasiswa
POST    /mahasiswa
GET     /mahasiswa/:id
PATCH   /mahasiswa/:id
DELETE  /mahasiswa/:id

# Matakuliah
GET     /matakuliah
POST    /matakuliah
GET     /matakuliah/:id
PATCH   /matakuliah/:id
DELETE  /matakuliah/:id

# Jadwal
GET     /jadwal
POST    /jadwal
GET     /jadwal/:id
PATCH   /jadwal/:id
DELETE  /jadwal/:id

# Analisis
GET     /analisis/statistik
GET     /analisis/laporan

# User
GET     /user
GET     /user/:id
PATCH   /user/:id
DELETE  /user/:id
```

---

## 🗄️ Prisma — Database

### Perintah Umum

```bash
# Buat migrasi baru setelah ubah schema
npx prisma migrate dev --name nama_migrasi

# Apply migrasi ke production
npx prisma migrate deploy

# Reset database (hati-hati: hapus semua data!)
npx prisma migrate reset

# Generate Prisma Client setelah ubah schema
npx prisma generate

# Buka GUI database
npx prisma studio
```

### Contoh Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  role      Role     @default(MAHASISWA)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  DOSEN
  MAHASISWA
}
```

---

## 🧪 Testing

```bash
# Unit test
npm run test

# E2E test
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📦 Scripts

```bash
npm run start         # Jalankan production
npm run start:dev     # Jalankan dengan hot-reload
npm run start:debug   # Jalankan dengan debugger
npm run build         # Build ke dist/
npm run lint          # Cek kode dengan ESLint
npm run format        # Format kode dengan Prettier
```

---

## 📄 Lisensi

Didistribusikan di bawah lisensi **MIT**. Lihat `LICENSE` untuk informasi lebih lanjut.

---

<div align="center">
  <sub>Built with ❤️ using NestJS & Prisma</sub>
</div>
