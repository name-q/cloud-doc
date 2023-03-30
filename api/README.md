# zao-ji services

## install mongoDB

[Mac OSX 平台安装 MongoDB](https://www.runoob.com/mongodb/mongodb-osx-install.html)


### 创建超级管理员

账号密码均为admin
```shell
use admin
db.createUser({user:'admin',pwd:'admin',roles:['userAdminAnyDatabase']})
```

### 创建 cloud-docx 数据库

```shell
use cloud-docx
show dbs # 此时没有数据不可见此数据库
exit
```

