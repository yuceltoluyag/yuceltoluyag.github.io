title: PostgreSQL and pgAdmin4 Installation on Arch Linux – Step-by-Step Guide
date: 2025-08-15 00:30
category: Linux
tags: archlinux, postgresql, pgadmin4, veritabanı, kurulum, rehber
slug: arch-linux-postgresql-pgadmin4-kurulum-rehber
authors: yuceltoluyag
status: published
summary: A sincere and understandable guide for beginners that explains the process of installing, configuring, and using PostgreSQL database with pgAdmin4 GUI tool on Arch Linux from start to finish.
template: article
Image: images/arch-linux-postgresql-pgadmin4-kurulum-rehber-xl.webp
Lang: en
Translation: true

🚀 **Introduction**

PostgreSQL is well known as a powerful relational database system, recognized for its data security, JSON support, and flexible structure. Arch Linux, with its minimal structure and up-to-date packages, provides an excellent environment for PostgreSQL installation.

In this guide we will cover step-by-step:

- PostgreSQL installation
- Database and user creation
- Visual management with `pgAdmin4`
- Common errors you might encounter and solutions

...we will examine these topics. If you're ready, let's get started! 🔧

---

## 📌 1. PostgreSQL Installation

On Arch Linux, installation with the `pacman` package manager is very simple. Let's get started.

### ✅ Step 1: Download and Install Package

Open the terminal and run the following command:

```bash
sudo pacman -S postgresql
```

Just press `y` to confirm.

!!! note "Thanks to Arch Linux's rolling release structure, PostgreSQL always comes up-to-date. This is a great advantage in terms of security."

### ✅ Step 2: Start and Enable Service

After the installation is complete, let's start the service and make it automatically run at system startup:

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

To check status:

```bash
systemctl status postgresql
```

!!! note "If service status is: <code>active (running)</code> then everything is fine. 👍"

example output:

```bash
[friday13@baba ~]$ systemctl status postgresql
● postgresql.service - PostgreSQL database server
     Loaded: loaded (/usr/lib/systemd/system/postgresql.service; disabled; preset: disabled)
     Active: active (running) since Fri 2025-08-15 00:38:54 +03; 3h 17min ago
 Invocation: 38373934efff4bf99d54aa90fadb77da
       Docs: man:postgres(1)
    Process: 399869 ExecStartPre=/usr/bin/postgresql-check-db-dir ${PGROOT}/data (code=exited, status=0/SUCCESS)
   Main PID: 399872 (postgres)
      Tasks: 9 (limit: 18626)
     Memory: 36.7M (peak: 92.2M, swap: 31.9M, swap peak: 31.9M)
        CPU: 2.873s
     CGroup: /system.slice/postgresql.service
             ├─399872 /usr/bin/postgres -D /var/lib/postgres/data
             ├─399875 "postgres: checkpointer "
             ├─399876 "postgres: background writer "
             ├─399879 "postgres: walwriter "
             ├─399880 "postgres: autovacuum launcher "
             ├─479979 "postgres: crm_user crm_db ::1(55162) idle"
             ├─479980 "postgres: crm_user postgres ::1(55176) idle"
             └─479981 "postgres: crm_user servis_crm_db ::1(55182) idle"

Ağu 15 00:58:54 baba postgres[399875]: 2025-08-15 00:58:54.656 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 00:59:07 baba postgres[399875]: 2025-08-15 00:59:07.122 +03 [399875] LOG:  checkpoint complete: wrote 125 buffers (0.8%); 0 WAL file(s) added, 0 removed, 0 recycled; write=12.439 s, sync=0.019 s, total=12.467 s; sync files=125, longest=0.004 s, average=0.001 s; distance=705 kB, estimate=3540 kB; lsn=0/1EC>
Ağu 15 01:53:54 baba postgres[399875]: 2025-08-15 01:53:54.983 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 01:53:55 baba postgres[399875]: 2025-08-15 01:53:55.297 +03 [399875] LOG:  checkpoint complete: wrote 3 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.302 s, sync=0.005 s, total=0.314 s; sync files=2, longest=0.005 s, average=0.003 s; distance=15 kB, estimate=3188 kB; lsn=0/1ECC7D0, r>
Ağu 15 02:03:54 baba postgres[399875]: 2025-08-15 02:03:54.447 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 02:03:58 baba postgres[399875]: 2025-08-15 02:03:58.975 +03 [399875] LOG:  checkpoint complete: wrote 46 buffers (0.3%); 0 WAL file(s) added, 0 removed, 0 recycled; write=4.513 s, sync=0.009 s, total=4.529 s; sync files=30, longest=0.005 s, average=0.001 s; distance=27 kB, estimate=2871 kB; lsn=0/1ED3580,>
Ağu 15 02:28:55 baba postgres[399875]: 2025-08-15 02:28:55.350 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 02:28:55 baba postgres[399875]: 2025-08-15 02:28:55.562 +03 [399875] LOG:  checkpoint complete: wrote 2 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.201 s, sync=0.005 s, total=0.213 s; sync files=2, longest=0.005 s, average=0.003 s; distance=6 kB, estimate=2585 kB; lsn=0/1ED4F08, re>
Ağu 15 03:03:55 baba postgres[399875]: 2025-08-15 03:03:55.741 +03 [399875] LOG:  checkpoint starting: time
Ağu 15 03:03:56 baba postgres[399875]: 2025-08-15 03:03:56.153 +03 [399875] LOG:  checkpoint complete: wrote 4 buffers (0.0%); 0 WAL file(s) added, 0 removed, 0 recycled; write=0.402 s, sync=0.004 s, total=0.412 s; sync files=2, longest=0.004 s, average=0.002 s; distance=12 kB, estimate=2328 kB; lsn=0/1ED8100, r>
```

!!! note "PostgreSQL service is running and its status can be observed as follows:"

```bash
[friday13@baba ~]$ systemctl status postgresql
● postgresql.service - PostgreSQL database server
Loaded: loaded (/usr/lib/systemd/system/postgresql.service; disabled; preset: disabled)
Active: active (running) since Fri 2025-08-15 00:38:54 +03; 3h 17min ago
Main PID: 399872 (postgres)
Tasks: 9 (limit: 18626)
```

### ✅ Step 3: Password the Default User

PostgreSQL comes with a user called `postgres`. It is critically important to set a strong password for this user:

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'your_password';"
```

!!! tip "💡 I usually create temporary users like `postgres_test` for test environments; this way production and test don't get mixed up."

### ✅ Step 4: Create Database and User

As an example, let's create a database and user for a CRM application:

```bash
sudo -u postgres createdb crm_db
sudo -u postgres createuser --superuser crm_user
sudo -u postgres psql -c "ALTER USER crm_user WITH PASSWORD 'crm_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE crm_db TO crm_user;"
```

!!! tip "Choosing database and user names that fit the project naming convention prevents confusion later. For example, you can use names like <code>crm_user_dev</code> or <code>crm_user_prod</code>."

---

## 🛠️ 2. PostgreSQL Configuration

PostgreSQL's configuration files are generally located in the `/var/lib/postgres/data/` directory. Inside this directory are the `postgresql.conf` and `pg_hba.conf` files which determine your database's behavior.

### ✅ Step 1: Check File Locations

```bash
sudo -u postgres ls /var/lib/postgres/data/
```

### ✅ Step 2: Edit `pg_hba.conf`

Open the file to set connection permissions:

```bash
sudo nano /var/lib/postgres/data/pg_hba.conf
```

Example setting:

```conf
# Local connections
host    all             all             127.0.0.1/32            trust

# Network connections
host    all             all             192.168.1.0/24          md5
```

!!! warning "Using 'md5' or 'scram-sha-256' instead of 'trust' in production environments is critically important for security."

### ✅ Step 3: `postgresql.conf` Settings

```bash
sudo nano /var/lib/postgres/data/postgresql.conf
```

Recommended parameters for performance:

```conf
listen_addresses = '*'
port = 5432
max_connections = 100
shared_buffers = 128MB
```

### ✅ Step 4: Restart Service

```bash
sudo systemctl restart postgresql
```

!!! note "🔧 Note: To test changes immediately, you can connect with <code>psql</code> and list databases with the <code>\l</code> command."

---

## 🖥️ 3. pgAdmin4 Installation

### ✅ Step 1: Create Required Directories

```bash
sudo mkdir /var/lib/pgadmin
sudo mkdir /var/log/pgadmin
sudo chown $USER /var/lib/pgadmin
sudo chown $USER /var/log/pgadmin
```

### ✅ Step 2: Python Virtual Environment

```bash
python3 -m venv pgadmin-env
source pgadmin-env/bin/activate
```

### ✅ Step 3: pgAdmin4 Installation

```bash
pip install pgadmin4
```

### ✅ Step 4: Run pgAdmin4

```bash
pgadmin4
```

In browser: `http://127.0.0.1:5050`

!!! tip "When creating the first user, you can use a simple test email and password, then change them as you like later."

---

## ⚙️ 4. Automation Script

To make manual running easier:

```bash
nano ~/bin/pgadmin-start.sh
```

Content:

```bash
#!/bin/bash
source ~/pgadmin-env/bin/activate
pgadmin4
```

```bash
chmod +x ~/bin/pgadmin-start.sh
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
echo "alias pgadmin='~/bin/pgadmin-start.sh'" >> ~/.bashrc
source ~/.bashrc
```

!!! tip "💡 Choosing short and memorable alias names makes things easier. For example, <code>pgadmin</code>."

---

## 🔗 5. Connection to PostgreSQL with pgAdmin4

To add a server:

| Field          | Value          |
| -------------- | -------------- |
| Name           | `CRM Database` |
| Host           | `localhost`    |
| Port           | `5432`         |
| Maintenance DB | `postgres`     |
| Username       | `crm_user`     |
| Password       | `crm_password` |

For connection problems:

```bash
systemctl status postgresql
```

```bash
sudo firewall-cmd --add-port=5432/tcp --permanent
sudo firewall-cmd --reload
```

---

## ❌ 6. Common Errors

!!! warning "Always make sure the service is running first. Most connection errors stem from this."

### Error 1: No module named ‘pgadmin4.**main**’

- Solution: Delete and recreate the virtual environment.

### Error 2: FATAL: database “crm_db" does not exist

- Solution: Recreate the database:

```bash
sudo -u postgres createdb crm_db
```

---

## 💡 7. Tips and Recommendations

- Improve performance by increasing `work_mem` and `maintenance_work_mem` values.
- SSD usage speeds up disk I/O.
- You can use cron job for weekly backups.
- Keep encryption methods up to date in production environments.

---

## 🔄 8. PostgreSQL Version Upgrades

Upgrading PostgreSQL to a new version may sometimes be necessary. Thanks to Arch Linux's rolling release structure, packages are generally up-to-date, but you may need to upgrade your database manually.

!!! tip "The pg_upgrade tool can be used, but it may be complex for some users. A safer and simpler method is to backup your database with <code>pg_dump</code> and restore it on the new version with <code>pg_restore</code>."

Example:

```bash
# Backup database
sudo -u postgres pg_dump crm_db > crm_db_backup.sql

# Restore on new version
sudo -u postgres createdb crm_db
sudo -u postgres psql crm_db < crm_db_backup.sql
```

This method helps prevent possible compatibility issues.

---

## 📦 9. phpPgAdmin Installation (Optional)

Some users may prefer phpPgAdmin instead of pgAdmin4. phpPgAdmin is a web-based interface, and for it to work, PHP's pgsql extension must be enabled.

!!! tip "When installing Apache web server and PHP, make sure the <code>php-pgsql</code> package is installed and enabled."

Installation example:

```bash
sudo pacman -S php-apache php-pgsql phppgadmin
sudo systemctl enable --now httpd
```

After configuring Apache, you can access phpPgAdmin from your browser.

- If you need a detailed guide for Apache and PHP installation for phpPgAdmin, you can check the [Arch Linux Apache (LAMPP) Virtual Host Setup](/arch-linux-apache-lampp-sanal-sunucu-kurulumu/) page.

---

## 🧹 10. Data Backup and Restore

Data security requires backup. In our article we previously gave an example of automatic backup with cron job. Now let's also add the **restore** example.

### ✅ Taking Backup

```bash
sudo -u postgres pg_dump crm_db > ~/backups/crm_db_$(date +%F).sql
```

### ✅ Restore from Backup

```bash
sudo -u postgres createdb crm_db_restore
sudo -u postgres psql crm_db_restore < ~/backups/crm_db_2025-08-15.sql
```

!!! tip "Using different database names for different environments (e.g. <code>crm_db_dev</code>, <code>crm_db_prod</code>) prevents confusion."

- If you are working with MySQL or MariaDB, for similar backup and restore operations you can check the [Arch Linux LAMPP Installation (PHP7x + MariaDB + MySQL + PhpMyAdmin)](/arch-linux-lampp-kurulumu-php7x-mariadb-mysql-phpmyadmin/) guide.

---

## 🎯 Conclusion

Now you have learned how to install, configure, and manage PostgreSQL and pgAdmin4 on Arch Linux. With code examples, tips, and step-by-step guide, you can securely manage your database projects. 💻

!!! note "If you have any questions, please leave a comment; I'd be happy to help! 😊"

## [responsive_img src="/images/arch-linux-postgresql-pgadmin4-kurulum-rehber-xl.webp" alt="Arch Linux PostgreSQL pgAdmin4 Installation" /]