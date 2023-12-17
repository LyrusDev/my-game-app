export function passwordValidator (password: any) {
  if (!password) return 'La contraseña no puede estar vacía.'
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.'
  return ''
}
