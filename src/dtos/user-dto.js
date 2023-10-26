function createUserDto(user) {
  return {
    id: user.id,
    email: user.email,
    isActivated: user.isActivated,
  };
}

module.exports = createUserDto;
