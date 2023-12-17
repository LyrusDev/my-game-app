export function emailValidator (email: any) {
  const re = /\S+@\S+\.\S+/
  if (!email) return 'El correo no puede estar vacío.'
  if (!re.test(email)) return 'Ooops! Se necesita un correo válido.'
  return ''
}
