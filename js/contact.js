/**
 * Interactive Contact & Inquiry Assistant
 * Pre-crafts customized WhatsApp/Email outreach links and handles clipboard actions
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactBuilder();
  initContactForm();
});

function initContactBuilder() {
  const chips = document.querySelectorAll('.inquiry-chip');
  const selectedServices = new Set();
  const whatsappBtn = document.getElementById('whatsapp-inquiry-btn');
  const emailBtn = document.getElementById('email-inquiry-btn');
  const phoneVal = '+2348165203680';
  const emailVal = 'oladejipeter80@gmail.com';

  // Default selection
  selectedServices.add('Brand & Content Strategy');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const service = chip.getAttribute('data-service');
      if (selectedServices.has(service)) {
        if (selectedServices.size > 1) { // keep at least one
          selectedServices.delete(service);
          chip.classList.remove('selected');
        }
      } else {
        selectedServices.add(service);
        chip.classList.add('selected');
      }
      updateActionLinks();
    });
  });

  function updateActionLinks() {
    const list = Array.from(selectedServices).join(', ');
    const greeting = `Hello Peter Oladeji, I came across your portfolio and I would love to discuss working together on: ${list}.`;

    if (whatsappBtn) {
      whatsappBtn.href = `https://wa.me/2348165203680?text=${encodeURIComponent(greeting)}`;
    }
    if (emailBtn) {
      emailBtn.href = `mailto:${emailVal}?subject=${encodeURIComponent('Project Inquiry: ' + list)}&body=${encodeURIComponent(greeting + '\n\nBest regards,')}`;
    }
  }

  updateActionLinks();

  // Copy buttons
  document.querySelectorAll('[data-copy-text]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy-text');
      const label = btn.getAttribute('data-copy-label') || 'Copied to clipboard!';
      
      navigator.clipboard.writeText(text).then(() => {
        showToast(label);
      }).catch(() => {
        // Fallback
        const temp = document.createElement('textarea');
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        document.body.removeChild(temp);
        showToast(label);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('clipboard-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'clipboard-toast';
    toast.className = 'toast-notice';
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span class="toast-message"></span>
    `;
    document.body.appendChild(toast);
  }

  toast.querySelector('.toast-message').textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const alertBox = document.getElementById('form-status-alert');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Check honeypot
    const honeypot = form.querySelector('input[name="_honey"]');
    if (honeypot && honeypot.value) return;

    const originalBtnText = submitBtn.textContent;
    submitBtn.classList.add('btn-loading');
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;

    if (alertBox) {
      alertBox.className = 'form-status-alert';
      alertBox.style.display = 'none';
      alertBox.innerHTML = '';
    }

    const formData = new FormData(form);

    try {
      const response = await fetch('https://formsubmit.co/ajax/oladejipeter80@gmail.com', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        form.reset();
        if (alertBox) {
          alertBox.className = 'form-status-alert status-success';
          alertBox.innerHTML = `
            <span style="font-size: 1.25rem;">✅</span>
            <div>
              <strong>Message Sent Successfully!</strong>
              <p style="margin-top: 4px; font-size: 0.88rem;">Thank you! Your inquiry has been delivered directly to Peter Oladeji's inbox (oladejipeter80@gmail.com). I will review your requirements and reply within 24 hours.</p>
            </div>
          `;
          alertBox.style.display = 'flex';
        }
      } else {
        throw new Error(result.message || 'Form submission failed');
      }
    } catch (err) {
      if (alertBox) {
        alertBox.className = 'form-status-alert status-error';
        alertBox.innerHTML = `
          <span style="font-size: 1.25rem;">⚠️</span>
          <div>
            <strong>Unable to deliver automatically.</strong>
            <p style="margin-top: 4px; font-size: 0.88rem;">Please email me directly at <a href="mailto:oladejipeter80@gmail.com" style="text-decoration: underline; font-weight: bold;">oladejipeter80@gmail.com</a> or click the WhatsApp button on the bottom left for an instant response.</p>
          </div>
        `;
        alertBox.style.display = 'flex';
      }
    } finally {
      submitBtn.classList.remove('btn-loading');
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

