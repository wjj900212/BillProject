create database if not exists wjj_db;
use wjj_db;
show create database wjj_db;
/**
* id 自增主键
* name 欠款人姓名
* debtDate 欠款日期
* money 欠款金额
* phone 联系方式
* status 欠款状态（0：已还清，1：还在欠）
* image 欠条图片
* remark 备注
*/
/*欠款表*/
create table if not exists arrears(
	pkey int unsigned not null auto_increment primary key,
    name varchar(200) not null,
    debtDate date,
    money float not null,
    phone varchar(20),
    status int,
    image mediumtext,
    remark mediumtext
);
/*还款表*/
create table if not exists repayment(
	pkey int unsigned not null auto_increment primary key,
    money float not null,
    repaymentDate date
);
select * from arrears;
insert into arrears(name,debtDate,money,phone,status,image,remark) values('测试1','2020-12-14','1000','13699196014','1','','');
insert into arrears(name,debtDate,money,phone,status,image,remark) values('测试2','2020-12-14','1300','13699196016','1','','');

delete from arrears where pkey=1;
/*arrears 添加列 restMoney */
alter table arrears add  column restMoney float;