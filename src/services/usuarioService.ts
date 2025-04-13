import { Usuario } from "@prisma/client";

export function formatDate(fecha: Date | string): string {
  const date = new Date(fecha);

  const dia = date.getDate().toString().padStart(2, "0");
  const mes = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 porque los meses empiezan en 0
  const anio = date.getFullYear();

  const hora = date.getHours().toString().padStart(2, "0");
  const minutos = date.getMinutes().toString().padStart(2, "0");

  return `${dia}/${mes}/${anio} ${hora}:${minutos}`;
}

export function UsuarioDTOTabla(
  usuario: Usuario & {
    rol: { nombre: string; createdAt: Date; updatedAt: Date };
  }
) {
  const { password, createdAt, updatedAt, ...resto } = usuario;

  return {
    ...resto,
    createdAt: formatDate(createdAt),
    updatedAt: formatDate(updatedAt),
    rol: {
      ...usuario.rol,
      createdAt: formatDate(usuario.rol.createdAt),
      updatedAt: formatDate(usuario.rol.updatedAt),
    },
  };
}


