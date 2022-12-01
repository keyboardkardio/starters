drop table if exists users;

create table
    users (
        id serial not null primary key,
        username varchar(50) not null unique,
        password_hash varchar(256) not null,
        role varchar(25) not null default 'USER'
    );