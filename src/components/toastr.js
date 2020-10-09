import toastr from 'toastr'

toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

export function showMessage(title, message, type) {
   toastr[type](message, title)
}

export function successMessage(message) {
    showMessage('Sucesso', message, 'success')
}

export function alertMessage(message) {
    showMessage('Alerta', message, 'warning')
}

export function errorMessage(message) {
    showMessage('Erro', message, 'error')
}