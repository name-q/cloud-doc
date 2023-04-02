# zao-ji services

## install mongoDB

[Mac OSX 平台安装 MongoDB](https://www.runoob.com/mongodb/mongodb-osx-install.html)

### 创建超级管理员

账号密码均为 admin

```shell
use admin
db.createUser({user:'admin',pwd:'admin',roles:[{role:"root", db:"admin"}]})
```

### 创建 cloud-docx 数据库

```shell
use cloud-docx
db.createUser({user:'admin',pwd:'admin',roles:[{role:"root", db:"admin"}]})
db.auth("admin","admin")
db.test.insert({"a":"1"})
exit
```

## install redis

[官网下载压缩包](https://redis.io/download)

### 编译并安装
```shell
tar zxvf redis-6.0.9.tar.gz
sudo mv redis-6.0.9 /usr/local/
cd /usr/local/redis-6.0.9
sudo make test
sudo make install
```

## 置快速启动脚本 .zshrc & .bash_profile
此处以.zshrc为例
```shell
vim ~/.zshrc
#插入
alias redismongo="/usr/local/mongodb/bin/mongod --dbpath /usr/local/var/mongodb --logpath /usr/local/var/log/mongodb/mongo.log --fork --auth && redis-server"
source ~/.zshrc
redismongo #启动失败请检查6379 27017端口占用
#lsof -i tcp:27017 #kill -9 PID
```
