import { HttpStatus } from '@nestjs/common';

export const statusMessages: Record<keyof typeof HttpStatus, string> = {
  CONTINUE: 'La solicitud ha sido recibida, por favor continúe',
  SWITCHING_PROTOCOLS:
    'El servidor está cambiando de protocolo según lo solicitado',
  OK: 'La solicitud fue exitosa',
  CREATED: 'El recurso fue creado exitosamente',
  ACCEPTED: 'La solicitud ha sido aceptada para su procesamiento',
  NON_AUTHORITATIVE_INFORMATION:
    'La información devuelta proviene de un tercero',
  NO_CONTENT: 'No hay contenido para devolver, pero la solicitud fue exitosa',
  RESET_CONTENT:
    'Contenido reiniciado, borre el formulario para ingresar más información',
  PARTIAL_CONTENT: 'Se ha proporcionado contenido parcial',
  MOVED_PERMANENTLY: 'El recurso se ha movido permanentemente',
  FOUND: 'Se encontró el recurso',
  SEE_OTHER: 'Consulte otra URI para la respuesta',
  NOT_MODIFIED: 'El recurso no ha sido modificado',
  TEMPORARY_REDIRECT:
    'El recurso se ha movido temporalmente, use la URI proporcionada',
  BAD_REQUEST: 'La solicitud no pudo ser entendida por el servidor',
  UNAUTHORIZED: 'Se requiere autenticación para acceder al recurso',
  PAYMENT_REQUIRED: 'Se requiere pago',
  FORBIDDEN: 'El servidor se niega a cumplir con la solicitud',
  NOT_FOUND: 'No se pudo encontrar el recurso solicitado',
  METHOD_NOT_ALLOWED: 'El método de solicitud no está permitido',
  NOT_ACCEPTABLE:
    'El servidor no puede producir una respuesta que coincida con la lista de valores aceptables',
  PROXY_AUTHENTICATION_REQUIRED: 'El cliente debe autenticarse con el proxy',
  REQUEST_TIMEOUT:
    'Tiempo de espera del servidor agotado esperando la solicitud',
  CONFLICT: 'La solicitud no se pudo completar debido a un conflicto',
  GONE: 'El recurso solicitado ya no está disponible y no estará disponible nuevamente',
  LENGTH_REQUIRED: 'La solicitud no especificó la longitud de su contenido',
  PRECONDITION_FAILED:
    'El servidor no cumple con una de las condiciones previas establecidas por el solicitante en la solicitud',
  PAYLOAD_TOO_LARGE: 'La carga útil de la solicitud es demasiado grande',
  URI_TOO_LONG: 'La URI proporcionada era demasiado larga para procesar',
  UNSUPPORTED_MEDIA_TYPE:
    'La entidad de la solicitud tiene un tipo de medio que el servidor o recurso no admite',
  EXPECTATION_FAILED:
    'El servidor no pudo cumplir con la expectativa dada en el campo de encabezado de solicitud Expect',
  INTERNAL_SERVER_ERROR: 'El servidor encontró un error interno',
  NOT_IMPLEMENTED:
    'El servidor no admite la funcionalidad requerida para cumplir con la solicitud',
  BAD_GATEWAY:
    'El servidor recibió una respuesta no válida mientras actuaba como puerta de enlace o proxy',
  SERVICE_UNAVAILABLE: 'El servidor no está disponible actualmente',
  GATEWAY_TIMEOUT:
    'El servidor no recibió una respuesta oportuna del servidor ascendente',
  HTTP_VERSION_NOT_SUPPORTED:
    'El servidor no admite la versión del protocolo HTTP utilizada en la solicitud',
  AMBIGUOUS: 'La solicitud podría procesarse de varias maneras',
  EARLYHINTS: 'Indicaciones tempranas sobre la próxima respuesta',
  FAILED_DEPENDENCY: 'Dependencia fallida, la operación no se pudo completar',
  I_AM_A_TEAPOT: 'Soy una tetera, la solicitud no se puede procesar',
  MISDIRECTED:
    'La solicitud se envió a un servidor que no puede producir una respuesta',
  PERMANENT_REDIRECT: 'El recurso se ha movido permanentemente a una nueva URL',
  PRECONDITION_REQUIRED:
    'Precondición requerida, por favor cumpla con las precondiciones primero',
  PROCESSING: 'Procesando la solicitud, espere',
  REQUESTED_RANGE_NOT_SATISFIABLE:
    'El rango solicitado no se puede satisfacer, por favor solicite un rango válido',
  TOO_MANY_REQUESTS: 'Demasiadas solicitudes, disminuya la velocidad',
  UNPROCESSABLE_ENTITY:
    'Entidad no procesable, la solicitud no se puede procesar debido a errores semánticos',
    
};
