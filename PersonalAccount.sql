drop database if exists PersonalAccountBook;

create database PersonalAccountBook;
use PersonalAccountBook;

create table totalMoney(
totalMoney float(40) primary key,
modifiedDate date
);

create table Tags(
Tag varchar(40),
kind int(1),
primary key (Tag,kind)
);

create table bill(
billMoney float(40),
billDate date,
billTime time,
billTag varchar(40),
purpose text(1000),
kind int(1),
primary key(billDate,billTime),
foreign key (billTag,kind) references Tags (Tag,kind)
);

create table earning(
earningMoney float(40),
earningDate date,
earningTime time,
earningTag varchar(40),
purpose text(1000),
primary key(earningDate,earningTime),
foreign key (earningTag) references Tags (Tag)
);

create table annualMoney(
theYear int(2),
theYearSumOfMoney float(40),
theYearSumOfExpenditureMoney float(40),
theYearSumOfEarningMoney float(40),
primary key(theYear)
);

create table monthMoney(
yearOfMonth int(2),
theMonth int(2),
theMonthSumOfMoney float(40),
theMonthSumOfExpenditureMoney float(40),
theMonthSumOfEarningMoney float(40),
primary key(yearOfMonth,theMonth),
foreign key (yearOfMonth) references annualMoney (theYear)
);

create table monthExpenditureTagRate(
yearOfMonth int(2),
theMonth int(2),
expenditureTag varchar(40),
theSumMoneyOfExpenditureTag float(40),
theExpenditureTagRate float(10),
foreign key (yearOfMonth,theMonth) references monthMoney (yearOfMonth,theMonth),
foreign key (expenditureTag) references Tags (Tag)
);

create table monthEarningTagRate(
yearOfMonth int(2),
theMonth int(2),
earningTag varchar(40),
theSumMoneyOfEarningTag float(40),
theEarningTagRate float(10),
foreign key (yearOfMonth,theMonth) references monthMoney(yearOfMonth,theMonth),
foreign key (earningTag) references Tags (Tag)

);