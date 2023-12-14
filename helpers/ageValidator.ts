export function ageValidator(age: any) {
  if (!age) return "La edad no puede estar vacía o ser negativa.";
  if (age < 5) return "Se requiere al menos 5 años para poder jugar.";
  return "";
}
