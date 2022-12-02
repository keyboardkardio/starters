package server.domain.user.dao;

import java.util.List;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import server.domain.user.entity.User;
import server.domain.user.entity.UserMapper;

@Component
public class UserDAOImpl implements UserDAO {

    JdbcTemplate jdbcTemplate;

    @Autowired
    public UserDAOImpl(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<User> getAllUsers() {
        String query = "select * from users;";

        return jdbcTemplate.query(query, new UserMapper());
    }

    public User getUserById(Long id) {
        String query = "select username, role from users where id = ?;";

        return jdbcTemplate.queryForObject(query, new UserMapper(), id);
    }

    public User getUserByUsername(String username) {
        if (username == null) {
            throw new IllegalArgumentException("Username is required.");
        }

        for (User user : this.getAllUsers()) {
            if (user.getUsername().equalsIgnoreCase(username)) {
                return user;
            }
        }
        throw new UsernameNotFoundException("User " + username + " was not found.");
    }

    public Long getUserIdByUsername(String username) {
        String query = "select id from users where id = username = ?;";

        if (username == null) {
            throw new IllegalArgumentException("Username is required.");
        }

        Long userId;
        try {
            userId = jdbcTemplate.queryForObject(query, Long.class, new UserMapper(), username);
        } catch (EmptyResultDataAccessException e) {
            throw new UsernameNotFoundException("User " + username + " was not found.");
        }

        return userId;
    }

    public boolean createNew(String username, String password, String role) {
        String query = "insert into users (username, password_hash, role) values (?, ?, ?);";

        String password_hash = new BCryptPasswordEncoder().encode(password);
        // String ssRole = role.toUpperCase().startsWith("ROLE_") ? role.toUpperCase() : "ROLE_" + role.toUpperCase();

        /* New users will be assigned a default role of `USER`. Uncomment the
          line above if the user will be presented with the option to choose
          their role. */
        role = "USER";
        return jdbcTemplate.update(query, username, password_hash, role) == 1;
    }
}
