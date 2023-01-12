# Tally

## Please visit the [Super Set](https://github.com/keyboardkardio/superset) repository for the redesigned application.

## Installation

Clone this repository onto your computer.

### Postgres

1. Create a new Postgres database by running `createdb tally` in your terminal.

### Server-side

1. Right click on the `server` folder and open with IntelliJ.
2. Rename the `ex.application.properties` to `application.properties`.
3. Generate a secret key for JWT authentication. <br>
      (You can generate one if you have OpenSSL by executing `openssl genrsa` in your terminal.)
3. Edit the remaining application properties as you see fit. <br>
      (If Spring JPA is throwing a lazy-loading error, remove or comment out the `spring.jpa.open-in-view` line.)
4. Run the `build.gradle.kts` file that is located in the root directory.
5. Navigate to `src/main/java/server` and run the main application.

### Client-side

1. Open the `client` folder with VS Code.
2. Execute the `npm install` command in your terminal.
3. Start the client app with `npm start`.
