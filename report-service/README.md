- Copy paste the commands from database/db.psql in the postgresql terminal, this create all the tables we need

- Grant privileges to the psql user on the tables (GRANT ALL ON incident TO user)
- Grant privileges on sequences on each table
GRANT ALL ON SEQUENCE incident_id_seq TO user;
GRANT ALL ON SEQUENCE basicdetails_id_seq TO user;
GRANT ALL ON SEQUENCE moredetails_id_seq TO user;
GRANT ALL ON SEQUENCE site_id_seq TO user;

- Insert some data eg:
INSERT INTO incident(id, date, time, details, basicDetails, moreDetails)
VALUES(1, "test", "test", "test", 1, 1)
Note: basicDetails with id 1 and moreDetails with id 1 have to exist too, insert it

- Configure the service, either by editing defaults on env/env.go or using environement variables