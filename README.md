The database.db tables are set up as so:

For tables the columns are as follows:
cid | name | type| notnull | dflt_value | pk

Users:
0|id|INTEGER|0||1
1|email|TEXT|1||0
2|password|TEXT|1||0


Cars:
0|id|INTEGER|0||1
1|year|INTEGER|1||0
2|size|TEXT|1||0
3|make|TEXT|1||0
4|model|TEXT|1||0
5|availability|INTEGER|1||0
6|seats|INTEGER|1||0
7|price|INTEGER|1||0

Reservations:
0|id|INTEGER|0||1
1|startDate|TEXT|1||0
2|endDate|TEXT|1||0
3|status|INTEGER|1||0
4|carId|INTEGER|1||0

carId is a foreign key which links to Cars.id. 

Admins:
0|userID|INTEGER|0||1

userId is also foreign, links to users.id

Customers
0|userID|INTEGER|0||1
1|driversLicenseNumber|INTEGER|1||0

userID also links to users.id, same as admin