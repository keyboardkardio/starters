package server.domain.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotEmpty;

public class RegisterDTO {

    @NotEmpty
    private String username;

    @NotEmpty
    @JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotEmpty
    @JsonProperty(access=JsonProperty.Access.WRITE_ONLY)
    private String passwordConfirmation;

    private String role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPasswordConfirmation() {
        return passwordConfirmation;
    }

    public void setPasswordConfirmation(String passwordConfirmation) {
        this.passwordConfirmation = passwordConfirmation;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
