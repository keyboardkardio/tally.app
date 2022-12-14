package server.user.dto;

public record UserRegistrationDTO(String username, String password, String passwordConfirmation) {
}
