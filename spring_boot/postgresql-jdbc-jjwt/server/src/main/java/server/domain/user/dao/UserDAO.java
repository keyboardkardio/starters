package server.domain.user.dao;

import java.util.List;

import server.domain.user.entity.User;

public interface UserDAO {

    List<User> getAllUsers();

    User getUserById(Long id);

    User getUserByUsername(String username);

    Long getUserIdByUsername(String username);

    boolean createNew(String username, String password, String role);
}
