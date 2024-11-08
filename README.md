# Backend Tugas Besar (NestJS)

## Hal Wajib Dilakukan Setelah Cloning
1. Install nestjs cli
```npm i -g @nestjs/cli```

2. Install semua package (pastikan sudah berada dalam folder)
```npm i```
or 
```yarn i```

3. Setup ENV

Untuk env lakukan **copy dan paste** file ```.env.example``` terus rename jadi ```.env``` dan isi sesuai petunjuk.

4. Lakukan migrasi database (ku belum tau cara untuk seeding gmn tapi untuk sekarang isi sendiri dulu)

```npx prisma migrate deploy```


## Dokumentasi API Spec

Untuk dokumentasi API Specification bisa diliat di link berikut inih:
- [User API Spec](./doc/user.md) (Done)
- [Role API Spec](./doc/role.md) (done)
- [Product API Spec](./doc/product.md) (create - update done)
- [Disease API Spec](./doc/disease.md) (In Progress)
- [Scan History API Spec](./doc/history.md) (In Progress)