# Spring Boot 3.0 and PostgreSQL with JJWT Authentication

## How to Use This Starter

1. Clone/download this repository

2. Open the project in your IDE of choice

3. Navigate to `server/src/main/resources`

4. Create a PostgreSQL database if you haven't already and edit the `database.properties` file

5. Create a secret key to sign the JWT (I used OpenSSL; if you're on Linux, you can generate one using the command below):
```
$ openssl genrsa
```

6. Open `application.properties` and paste your secret key into its respective field, configuring the other properties as needed

6. Run the SQL script, `schema.sql`, to create the `users` table

7. Going back to the root folder, build the project with `build.gradle.kts`

8. Finally, run the project and test with CURL or Postman

<br>

https://github.com/jwtk/jjwt <br>
https://github.com/spring-projects/spring-boot