// src/shared/alerts/notify.ts
import Swal from "sweetalert2";

export function notifySuccess(title: string, text?: string) {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText: "Aceptar",
  });
}

export function notifyError(title: string, text?: string) {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText: "Aceptar",
  });
}
