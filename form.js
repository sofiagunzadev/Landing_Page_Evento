// form.js — Validação do formulário de inscrição

(function () {
  'use strict';

  const form = document.getElementById('inscricao-form');
  const formFields = document.getElementById('form-fields');
  const formSuccess = document.getElementById('form-success');
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');

  // Configuração dos campos: id, label, tipo de validação
  const fields = [
    {
      id: 'nome',
      label: 'Nome completo',
      validate: function (val) {
        if (!val.trim()) return 'O nome completo é obrigatório.';
        if (val.trim().split(' ').length < 2) return 'Por favor, insira o nome e apelido.';
        if (val.trim().length < 3) return 'O nome deve ter pelo menos 3 caracteres.';
        return '';
      }
    },
    {
      id: 'empresa',
      label: 'Empresa',
      validate: function (val) {
        if (!val.trim()) return 'O nome da empresa é obrigatório.';
        if (val.trim().length < 2) return 'O nome da empresa deve ter pelo menos 2 caracteres.';
        return '';
      }
    },
    {
      id: 'cargo',
      label: 'Cargo',
      validate: function (val) {
        if (!val.trim()) return 'O cargo é obrigatório.';
        if (val.trim().length < 2) return 'O cargo deve ter pelo menos 2 caracteres.';
        return '';
      }
    },
    {
      id: 'email',
      label: 'E-mail',
      validate: function (val) {
        if (!val.trim()) return 'O e-mail é obrigatório.';
        // Expressão regular simples para e-mail
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val.trim())) return 'Insira um e-mail válido (ex: nome@empresa.ao).';
        return '';
      }
    },
    {
      id: 'telefone',
      label: 'Telefone',
      validate: function (val) {
        if (!val.trim()) return 'O telefone é obrigatório.';
        // Aceita formatos angolanos: +244 9XX XXX XXX ou 9XX XXX XXX
        var telRegex = /^(\+244\s?)?[9][0-9]{8}$/;
        var cleaned = val.replace(/[\s\-]/g, '');
        if (!telRegex.test(cleaned)) return 'Insira um número angolano válido (ex: +244 923 456 789).';
        return '';
      }
    }
  ];

  // Mostra erro num campo
  function showError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + '-error');
    if (!input || !errorEl) return;
    input.classList.add('error');
    input.classList.remove('valid');
    input.setAttribute('aria-describedby', fieldId + '-error');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
  }

  // Limpa erro num campo
  function clearError(fieldId) {
    var input = document.getElementById(fieldId);
    var errorEl = document.getElementById(fieldId + '-error');
    if (!input || !errorEl) return;
    input.classList.remove('error');
    errorEl.textContent = '';
    input.removeAttribute('aria-invalid');
  }

  // Marca campo como válido
  function markValid(fieldId) {
    var input = document.getElementById(fieldId);
    if (!input) return;
    input.classList.remove('error');
    input.classList.add('valid');
    input.setAttribute('aria-invalid', 'false');
  }

  // Valida um único campo
  function validateField(fieldConfig) {
    var input = document.getElementById(fieldConfig.id);
    if (!input) return true;
    var error = fieldConfig.validate(input.value);
    if (error) {
      showError(fieldConfig.id, error);
      return false;
    } else {
      clearError(fieldConfig.id);
      markValid(fieldConfig.id);
      return true;
    }
  }

  // Valida checkbox de termos
  function validateTermos() {
    var checkbox = document.getElementById('termos');
    var errorEl = document.getElementById('termos-error');
    if (!checkbox.checked) {
      errorEl.textContent = 'Deve aceitar os Termos e Condições para continuar.';
      return false;
    }
    errorEl.textContent = '';
    return true;
  }

  // Validação em tempo real ao sair do campo (blur)
  fields.forEach(function (fieldConfig) {
    var input = document.getElementById(fieldConfig.id);
    if (!input) return;

    input.addEventListener('blur', function () {
      validateField(fieldConfig);
    });

    // Limpa erro ao começar a digitar
    input.addEventListener('input', function () {
      if (input.classList.contains('error')) {
        clearError(fieldConfig.id);
      }
    });
  });

  // Submissão do formulário
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var isValid = true;
    var firstError = null;

    // Valida todos os campos
    fields.forEach(function (fieldConfig) {
      var valid = validateField(fieldConfig);
      if (!valid && !firstError) {
        firstError = document.getElementById(fieldConfig.id);
      }
      isValid = isValid && valid;
    });

    // Valida termos
    var termosValid = validateTermos();
    if (!termosValid && !firstError) {
      firstError = document.getElementById('termos');
    }
    isValid = isValid && termosValid;

    // Se há erros, foca o primeiro
    if (!isValid) {
      if (firstError) {
        firstError.focus();
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Simula envio
    submitBtn.disabled = true;
    btnText.setAttribute('hidden', '');
    btnLoading.removeAttribute('hidden');

    setTimeout(function () {
      // Esconde o formulário, mostra sucesso
      formFields.style.display = 'none';
      formSuccess.removeAttribute('hidden');
      formSuccess.focus();

      // Reset
      submitBtn.disabled = false;
      btnText.removeAttribute('hidden');
      btnLoading.setAttribute('hidden', '');
    }, 1800);
  });

})();
