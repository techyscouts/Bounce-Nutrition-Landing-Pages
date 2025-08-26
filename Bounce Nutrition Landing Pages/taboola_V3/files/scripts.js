// NEWSLETTER SUBMIT SCRIPT
const allNewsletters = [
    ...document.querySelectorAll('[data-gjs-type="newsletter"]'),
  ];
  if (allNewsletters.length) {
    allNewsletters.forEach((newsletter) => {
      newsletter.addEventListener('submit', async (e) => {
        e.preventDefault();
        
         /* Close All Modals */
        const visibleModals = document.querySelectorAll(
          '[data-gjs-type="modalWrapper"].visible'
        );
        if (visibleModals.length)
          visibleModals.forEach((modal) => modal.classList.remove('visible'));
  
  
        const message =
          newsletter.getAttribute('newsletter-submit-msg') || 'Thank You!';
        const redirectUrl = newsletter.getAttribute('newsletter-redirect-url');
           const description = newsletter.getAttribute(
          'newsletter-submit-description'
        );
  
        const submitPopUp = document.createElement('div');
        submitPopUp.setAttribute('ll-submit-popup', 'true');
        submitPopUp.innerHTML = `
        <div>
        <svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <circle cx="73" cy="73" r="54" stroke="#CEFFDB" stroke-width="38" />
            <path
              d="M73 15C105.033 15 131 40.9675 131 73C131 105.033 105.033 131 73 131C40.9675 131 15 105.033 15 73C15 40.9675 40.9675 15 73 15ZM98.0383 54.4867C96.717 53.1655 94.6295 53.0774 93.2061 54.2225L92.9117 54.4867L63.575 83.8235L53.0883 73.3367C51.6726 71.9211 49.3774 71.9211 47.9617 73.3367C46.6405 74.658 46.5524 76.7455 47.6975 78.1689L47.9617 78.4633L61.0117 91.5133C62.333 92.8345 64.4205 92.9226 65.8439 91.7775L66.1383 91.5133L98.0383 59.6133C99.4539 58.1976 99.4539 55.9024 98.0383 54.4867Z"
              fill="#34A853"
            />
        </svg>
          <h3>${message}</h3>
          ${description ? `<p>${description}</p>` : ''}
        </div>`;
        
        setTimeout(() => {
          submitPopUp.classList.add('visible');
        });
  
        document.body.insertAdjacentElement('beforeend', submitPopUp);
  
        setTimeout(() => {
          submitPopUp.classList.remove('visible');
          setTimeout(() => {
            submitPopUp.remove();
            if (redirectUrl) window.open(redirectUrl, '_self');
          }, 500);
        }, 1500);
  
        const payload = {
          formToken: newsletter.getAttribute('ll-newsletter-id'),
          variantId: window.LL_VARIANT_ID,
          landerId: window.LL_LANDER_ID,
          userId: window.LL_USER_ID,
          data: [],
        };
  
        const field = newsletter.querySelector('input');
  
        const data = {
          key: field.id,
          value: field.value,
          label: field.name,
        };
  
        payload.data.push(data);
  
        field.value = '';
        // console.log(JSON.stringify(payload));
        try {
          const response = await fetch(
            'https://backend-v2.landerlab.workers.dev/api/v2/leads/create',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          );
        } catch (err) {
          console.error(err);
        }
      });
    });
  }
  
  // NAV-BAR SCRIPT
  // NAV-BAR SCRIPT
  const ll_navbars = document.querySelectorAll('nav[ll-navbar-container]')
  
  window.addEventListener("resize", (event) => {
    if ((event.target.innerWidth > 993) && ll_navbars.length) {
      ll_navbars.forEach(nav => {
        if (nav.getAttribute('expanded')) {
          nav.removeAttribute('expanded')
          document.body.style.overflowY = 'unset'
        }
      })
    }
  })
  
  
  
  const navToggle = document.querySelector('[ll-navbar-toggler]');
  const everyLink = [...document.querySelectorAll('[ll-navbar-link]')];
  
  if (navToggle) {
    const toggleNavbar = (el) => {
      const container = el.closest('[ll-navbar-container]');
      if (container.getAttribute('expanded')) {
        container.removeAttribute('expanded');
        document.body.style.overflow = 'auto';
      } else {
        container.setAttribute('expanded', true);
        document.body.style.overflow = 'hidden';
      }
    };
  
    navToggle.addEventListener('click', (e) => toggleNavbar(e.target));
  
    if (window.innerWidth <= 992) {
      everyLink.forEach((link) => {
        link.addEventListener('click', (e) => {
          toggleNavbar(link);
        });
      });
    }
  }
  
  // OPEN MODAL ON LOAD SCRIPT
  window.addEventListener('DOMContentLoaded', () => {
    const modals = [...document.querySelectorAll('[ll-modal-name]')];
  
    if (!modals.length) return;
  
    modals.forEach((modal) => {
      const modalWithTimer = modal.querySelector('[open-on-load]');
      if (!modalWithTimer) return;
      const time = +modalWithTimer.getAttribute('open-on-load');
  
      setTimeout(() => {
        modal.classList.add('visible');
      }, time * 1000);
    });
  });
  
  // OPEN AND CLOSE COLLAPSE SCRIPT
  const ll_collapses = document.querySelectorAll('[data-gjs-type="collapse"]');
  
  ll_collapses.forEach((ll_collapse) => {
    const ll_collapse_header = ll_collapse.querySelector('.ll-collapse-header');
  
    ll_collapse_header.addEventListener('click', (e) => {
      e.preventDefault();
      ll_collapse.classList.toggle('expanded');
    });
  });
  
  /* NEW FORM SUBMIT SCRIPT */
  /* NEW FORM SUBMIT SCRIPT */
  /* NEW FORM SUBMIT SCRIPT */
  const ll__forms = [...document.querySelectorAll('[data-ll-form]')];
  const hasTelInput = document.querySelector('[data-ll-form] input[type="tel"]');

  function getCountryCodeFromCookie() {
    const match = document.cookie.match(/llRequestData=({.*?})/);
    if (match) {
      const data = JSON.parse(decodeURIComponent(match[1]));
      return data.countrycode || 'US';
    }
    return 'US';
  }

  if (hasTelInput) {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute(
      'src',
      'https://cdn-landerlab.com/landerlab-assets/js/intlTelInput.min.js'
    );
    document.body.appendChild(scriptEl);
    document.head.insertAdjacentHTML(
      'beforeend',
      `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@20.3.0/build/css/intlTelInput.css" />`
    );
  
    scriptEl.onload = function () {
      // Cleanup onload handler
      scriptEl.onload = null;
      ll__forms.forEach((form) => {
        const telTypes = form.querySelectorAll('input[type="tel"]');
        telTypes.forEach((telType) => {
          window.intlTelInput(telType, {
            strictMode: true,
            initialCountry: getCountryCodeFromCookie(),
            utilsScript: 'https://cdn-landerlab.com/landerlab-assets/js/utils.js',
          });
        });
      });
    };
  }

  if (ll__forms.length) {
    ll__forms.forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        /* Close All Popups */
        const visiblePopups = document.querySelectorAll(
          '[data-gjs-type="modalWrapper"].visible'
        );
        if (visiblePopups.length)
          visiblePopups.forEach((p) => p.classList.remove('visible'));

        const message = form.dataset.llFormMessage || 'Submited Succesfully!';
        const description = form.dataset.llFormDescription || '';
        const redirectUrl = form.dataset.llFormRedirect;
        const appendUrlParameters = form.dataset.llFormAppendParameters || false;
        const popupDuration = Number(form.dataset.llFormPopupDuration) || 2000;
        const trustedFormCertUrl = document.querySelector('[name="xxTrustedFormCertUrl"]')?.value || '';
        const jornayaLeadId = window.LeadiD?.token || '';
        let recaptchaScore = '';

        if(window.RECAPTCHA_V3_SITE_KEY) {
          recaptchaScore = await new Promise(resolve => 
            grecaptcha.ready(() => grecaptcha.execute(window.RECAPTCHA_V3_SITE_KEY, {action:'submit'}).then(resolve))
          );
        }

        // if (redirectUrl) { 
        //   setTimeout(() => {
        //     window.open(redirectUrl, form.getAttribute('target') === '_blank' ? '_blank' : '_self'); 
        //   }, 300);
        // } else {
        //   const submitPopUp = document.createElement('div');
        //   submitPopUp.setAttribute('ll-submit-popup', 'true');
        //   submitPopUp.innerHTML = `
        //   <div>
        //   <svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg" >
        //       <circle cx="73" cy="73" r="54" stroke="#CEFFDB" stroke-width="38" />
        //       <path
        //         d="M73 15C105.033 15 131 40.9675 131 73C131 105.033 105.033 131 73 131C40.9675 131 15 105.033 15 73C15 40.9675 40.9675 15 73 15ZM98.0383 54.4867C96.717 53.1655 94.6295 53.0774 93.2061 54.2225L92.9117 54.4867L63.575 83.8235L53.0883 73.3367C51.6726 71.9211 49.3774 71.9211 47.9617 73.3367C46.6405 74.658 46.5524 76.7455 47.6975 78.1689L47.9617 78.4633L61.0117 91.5133C62.333 92.8345 64.4205 92.9226 65.8439 91.7775L66.1383 91.5133L98.0383 59.6133C99.4539 58.1976 99.4539 55.9024 98.0383 54.4867Z"
        //         fill="#34A853"
        //       />
        //   </svg>
        //     <h3>${message}</h3>
        //     ${description ? `<p>${description}</p>` : ''}
        //   </div>`;
        //   setTimeout(() => {
        //     submitPopUp.classList.add('visible');
        //   });
        //   document.body.insertAdjacentElement('beforeend', submitPopUp);
        //   setTimeout(() => {
        //     submitPopUp.classList.remove('visible');
        //     setTimeout(() => submitPopUp.remove(), 500);
        //   }, 1500);
        // }

        
        if(!redirectUrl || form.dataset.llFormPopupDuration) {
          const submitPopUp = document.createElement('div');
          submitPopUp.setAttribute('ll-submit-popup', 'true');
          submitPopUp.innerHTML = `
          <div>
          <svg width="146" height="146" viewBox="0 0 146 146" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <circle cx="73" cy="73" r="54" stroke="#CEFFDB" stroke-width="38" />
              <path
                d="M73 15C105.033 15 131 40.9675 131 73C131 105.033 105.033 131 73 131C40.9675 131 15 105.033 15 73C15 40.9675 40.9675 15 73 15ZM98.0383 54.4867C96.717 53.1655 94.6295 53.0774 93.2061 54.2225L92.9117 54.4867L63.575 83.8235L53.0883 73.3367C51.6726 71.9211 49.3774 71.9211 47.9617 73.3367C46.6405 74.658 46.5524 76.7455 47.6975 78.1689L47.9617 78.4633L61.0117 91.5133C62.333 92.8345 64.4205 92.9226 65.8439 91.7775L66.1383 91.5133L98.0383 59.6133C99.4539 58.1976 99.4539 55.9024 98.0383 54.4867Z"
                fill="#34A853"
              />
          </svg>
            <h3>${message}</h3>
            ${description ? `<p>${description}</p>` : ''}
          </div>`;
          setTimeout(() => {
            submitPopUp.classList.add('visible');
          });
          document.body.insertAdjacentElement('beforeend', submitPopUp);
          setTimeout(() => {
            submitPopUp.classList.remove('visible');
            setTimeout(() => submitPopUp.remove(), 500);
          }, popupDuration);
        }

        const payload = {
          formToken: form.dataset.llFormId,
          variantId: window.LL_VARIANT_ID,
          landerId: window.LL_LANDER_ID,
          userId: window.LL_USER_ID,
          data: [],
        };

        const fields = form.querySelectorAll('[data-input-wrapper]');

        fields.forEach((field) => {
          const { inputWrapper } = field.dataset;
          if (inputWrapper === 'html') return;

          const input = field.querySelector('input');
          const select = field.querySelector('select');
          const textarea = field.querySelector('textarea');

          const data = {
            key: field.dataset.inputId,
            value: input ? input.value : '',
            label: field.dataset.inputLabel,
          };

          if (inputWrapper === 'tel') {
            const isIntlInput = !!field.querySelector('[data-intl-tel-input-id]');
            if (isIntlInput) {
              const telInput = field.querySelector('[type="tel"]');
              const countryCodeEl = field.querySelector('.iti__a11y-text');
              const countryCode = countryCodeEl?.textContent.split('+').pop();
              data.value = `+${countryCode} ${telInput.value.replace(`+${countryCode}`, '')}`.replace(/[-\s()]/g, '').replace('+Nocountryselected', '');
              telInput.value = '';
            }
          }

          if (input) {
            // if (input.type === 'email') data.label = 'Email';
            if (input.type === 'datetime-local') data.value = data.value.replace('T', ' ');
            if (input.type === 'checkbox' && inputWrapper === 'checkbox-group') {
              const inputs = [...field.querySelectorAll('input')];
              const checkedInput = inputs.filter((i) => i.checked);
              if (checkedInput.length)
                data.value = checkedInput.map((i) => i.value).join(', ');
              else data.value = '';
              inputs.forEach((input) => (input.checked = false));
            } else if (input.type === 'checkbox') {
              data.value = input.checked ? 'Yes' : 'No';
              input.checked = false;
            } else if (input.type === 'radio') {
              const inputs = [...field.querySelectorAll('input')];
              const checkedInput = inputs.find((i) => i.checked);
              if (checkedInput) data.value = checkedInput.value;
              else data.value = '';
              inputs.forEach((input) => (input.checked = false));
            } else {
              input.value = '';
            }
          }

          if (select) {
            data.value = select.value || '';
            const options = [...field.querySelectorAll('option')];
            select.value = options[0].value;
          }
          if (textarea) {
            data.value = textarea.value || '';
            textarea.value = '';
          } 

          payload.data.push(data);
        });

        if (trustedFormCertUrl) payload.data.push({ key: Math.random().toString(36).substring(2), value: trustedFormCertUrl, label: 'Trusted Form Cert Url' });
        if (jornayaLeadId) payload.data.push({ key: Math.random().toString(36).substring(2), value: jornayaLeadId, label: 'Jornaya Lead Id' });
        if (recaptchaScore) payload.data.push({ key: Math.random().toString(36).substring(2), value: recaptchaScore, label: 'Recaptcha V3 Score' });

        try {
          const response = await fetch(
            'https://backend-v2.landerlab.workers.dev/api/v2/leads/create',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            }
          );
        } catch (err) {
          console.error(err);
        } finally { 
          if (redirectUrl) { 
            setTimeout(() => {
              if (appendUrlParameters) {
                const separator = redirectUrl.includes('?') ? '&' : '?';
                const params = payload.data.map(item => `${item.label}=${item.value}`).join('&');
                const newUrl = redirectUrl + separator + params;
                window.open(newUrl, form.getAttribute('target') === '_blank' ? '_blank' : '_self'); 
              } else {
                window.open(redirectUrl, form.getAttribute('target') === '_blank' ? '_blank' : '_self'); 
              }
            }, form.dataset.llFormPopupDuration ? popupDuration : 300);
          }
        }
      });
    });
  }
  
  /* UPDATED CLICK EVENT SCRIPT */
  /* UPDATED CLICK EVENT SCRIPT */
  /* UPDATED CLICK EVENT SCRIPT */
  const ll_event_elmenets = document.querySelectorAll('[data-ll-event]');
  
  ll_event_elmenets.forEach((el) => {
    const type = el.dataset.llEvent;
    let href = el.getAttribute('href');
    let target = el.getAttribute('target');
  
    ll_run_event(el, href, target, type);
  });
  
  const addUrlQueryParams = (href, target) => {
    let url =
      href +
      (href.split('?')[1] ? '&' : '?') +
      window.location.search.replace('?', '');
  
    url =
      url.endsWith('?') || url.endsWith('&') ? url.slice(0, url.length - 1) : url;
    window.open(url, target ? '_blank' : '_self');
  };
  
  function ll_run_event(el, href, target, type, event = 'click') {
    if (type === 'popup') {
      const openedPopups = document.querySelectorAll('[ll-modal-name]');
      openedPopups.forEach((modal) => modal.classList.remove('visibility'));
  
      const modalId = el.dataset.llModal;
      el.addEventListener(event, (e) => {
        e.preventDefault();
        const modal = document.querySelector(`[ll-modal-id="${modalId}"]`);
        const countdowns = modal.querySelectorAll('[data-countdown-id]');
        countdowns.forEach((countdown) => {
          triggerCountdown(countdown);
        });    
        modal.classList.add('visible');
      });
  
      return;
    }
  
    el.addEventListener(event, (e) => {
      e.preventDefault();
  
      if (type === 'redirect') {
        const passBtnTextToUrl = el.dataset.passBtnText;
        
        if (passBtnTextToUrl) {
          const buttonText = el.innerText;
          href = `${href}${href.includes('?') ? '&' : '?'}${passBtnTextToUrl}=${buttonText}`;
        }
        
        if (el.dataset.llUrlQueryParams) addUrlQueryParams(parseHref(href), target);
        else window.open(parseHref(href), target ? '_blank' : '_self');
      }
      if (type === 'id') {
        const closestModal = el.closest('[data-gjs-type="modalWrapper"].visible');
        if (closestModal) closestModal.classList.remove('visible');
        document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
      }
      if (type === 'email') window.location.href = href;
      if (type === 'phone') window.open(href);
    });
  }
  
  /* MODAL SCRIPT */
  const ll_popup_elments = document.querySelectorAll('[ll-modal-id]');
  
  ll_popup_elments.forEach((popup) => {
    popup.querySelector('[ll-modal-backdrop]').addEventListener('click', () => {
      popup.classList.remove('visible');
    });
    popup.querySelector('[ll-modal-close]').addEventListener('click', () => {
      popup.classList.remove('visible');
    });
  });
  
  /* LINKS WITH URL QUERY PARAMS */
  const ll_links_with_query_params = document.querySelectorAll(
    'a[data-ll-url-query-params]'
  );
  
  ll_links_with_query_params.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      addUrlQueryParams(link.href, !!link.target);
    });
  });
  
  /* STICKY BAR */
  /* STICKY BAR */
  /* STICKY BAR */
  /* STICKY BAR */
  const ll_sticky_bar_function = () => {
    const ll_sticky_bars = [
      ...document.querySelectorAll('[data-gjs-type="sticky-bar"]'),
    ];
  
    const ll_top_bars = ll_sticky_bars.filter(
      (el) =>
        el.dataset.stickyBarVertical === 'top' && !el.dataset.stickyBarScroll
    );
    const ll_bottom_bars = ll_sticky_bars.filter(
      (el) => el.dataset.stickyBarVertical === 'bottom'
    );
  
    const ll_top_full_bars = ll_top_bars.filter((el) => el.dataset.stickyBarFull);
    const ll_bottom_full_bars = ll_bottom_bars.filter(
      (el) => el.dataset.stickyBarFull
    );
  
    const ll_sticky_bar_event = (topBars, bottomBars) => {
      const ll_top_bar_height = topBars.map(
        (el) => el.getBoundingClientRect().height
      );
      const ll_bottom_bar_height = bottomBars.map(
        (el) => el.getBoundingClientRect().height
      );
  
      const addPaddingToBody = () => {
        if (ll_top_bar_height.length) {
          document.body.style.paddingTop = Math.max(...ll_top_bar_height) + 'px';
        } else document.body.style.paddingTop = 0;
  
        if (ll_bottom_bar_height.length) {
          document.body.style.paddingBottom =
            Math.max(...ll_bottom_bar_height) + 'px';
        } else document.body.style.paddingBottom = 0;
      };
  
      addPaddingToBody();
    };
  
    if (window.innerWidth > 992)
      ll_sticky_bar_event(ll_top_full_bars, ll_bottom_full_bars);
    else ll_sticky_bar_event(ll_top_bars, ll_bottom_bars);
  
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992)
        ll_sticky_bar_event(ll_top_full_bars, ll_bottom_full_bars);
      else ll_sticky_bar_event(ll_top_bars, ll_bottom_bars);
    });
  };
  
  ll_sticky_bar_function();
  const ll_sticky_bar_on_scroll = document.querySelectorAll(
    '[data-sticky-bar-scroll]'
  );
  
  const showStickyBarOnScroll = () => {
    ll_sticky_bar_on_scroll.forEach((stickyBar) => {
      const stickyBarScroll = stickyBar.dataset.stickyBarScroll.split(',');
      const innerWidth = window.innerWidth;
  
      let scrollBarScrollValue = stickyBarScroll[0];
  
      if (innerWidth <= 576) scrollBarScrollValue = stickyBarScroll[2];
      else if (innerWidth <= 992) scrollBarScrollValue = stickyBarScroll[1];
  
      const body = document.body;
      const scrollableHeight = body.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrollPercentage = (scrollY / scrollableHeight) * 100;
  
      if (scrollPercentage >= scrollBarScrollValue) {
        stickyBar.classList.add('visible');
      } else {
        stickyBar.classList.remove('visible');
      }
    });
  };
  
  window.addEventListener('scroll', showStickyBarOnScroll);
  
  /* POPUP SCRIPT */
  /* POPUP SCRIPT*/
  /* POPUP SCRIPT*/
  /* POPUP SCRIPT*/
  window.addEventListener('DOMContentLoaded', () => {
      const ll_popups_triggers_script = () => {
    const llPopups = document.querySelectorAll('[ll-modal-wrapper="true"]');
  
    llPopups.forEach((popup) => {
      const countdowns = popup.querySelectorAll('[data-countdown-id]');
      const { llTimeSpent, llExitIntent } = popup.dataset;

      /* Time spent on the website */
      if (llTimeSpent >= 0) {
        setTimeout(
          () => {
            popup.classList.add('visible')
            countdowns.forEach((countdown) => {
              triggerCountdown(countdown);
            });  
          },
          Number(llTimeSpent) * 1000
        );
      }
  
      if (llExitIntent) {
        /* Exit Intent */
        window.addEventListener('mouseout', (event) => {
          const { llExitModalShown } = popup.dataset;
          if (llExitModalShown || event.relatedTarget || event.clientY > 0) return;
          popup.classList.add('visible');
          countdowns.forEach((countdown) => {
            triggerCountdown(countdown);
          });  
          popup.setAttribute('data-ll-exit-modal-shown', true);
        });

        // document.addEventListener('mouseleave', () => {
        //   const { llExitModalShown } = popup.dataset;
        //   if (llExitModalShown) return;
        //   // if (llExitModalShown) return;
        //   popup.classList.add('visible');
        //   popup.setAttribute('data-ll-exit-modal-shown', true);
        // });
      }
    });
      
       const showModalOnScroll = () => {
         
         llPopups.forEach((popup) => {
        const countdowns = popup.querySelectorAll('[data-countdown-id]');
        const { llScrollModalShown, llScrollDepth } = popup.dataset;
  
        if (!llScrollDepth || llScrollModalShown) return;
  
        const llScrollDepthArr = popup.dataset.llScrollDepth.split(',');
        const innerWidth = window.innerWidth;
  
        let popupScrollvalue = llScrollDepthArr[0];
        if (innerWidth <= 576) popupScrollvalue = llScrollDepthArr[2];
        else if (innerWidth <= 992) popupScrollvalue = llScrollDepthArr[1];
  
        const body = document.body;
        const scrollableHeight = body.scrollHeight - window.innerHeight;
        const scrollY = window.scrollY;
        const scrollPercentage = (scrollY / scrollableHeight) * 100;
  
        if (scrollPercentage >= popupScrollvalue) {
          popup.classList.add('visible');
          popup.setAttribute('data-ll-scroll-modal-shown', true);
          countdowns.forEach((countdown) => {
            triggerCountdown(countdown);
          });    
        }
      });
    };
  
    window.addEventListener('scroll', showModalOnScroll);
  };
  
  ll_popups_triggers_script();
  });
  
  
  /* REPLACE EVERY HREF WITH // */
  /* REPLACE EVERY HREF WITH // */
  /* REPLACE EVERY HREF WITH // */
  const ll_links_for_replace = document.querySelectorAll('a');
  
  ll_links_for_replace.forEach((el) => {
    let { href } = el;
    if (!href) {
      return;
    } else if (
      el.dataset.llEvent ||
      href.startsWith('//') ||
      href.startsWith('#') ||
      href.includes('tel:') ||
      href.includes('mailto:')
    ) {
      return;
    } else {
      el.href = parseHref(href);
    }
  });
  
  function parseHref(href) {
    const replacedLink = href.replace(/^https?:\/\//, '');
    return `https://${replacedLink}`;
  }
  
  /* DAY PICKER SCRIPT */
  /* DAY PICKER SCRIPT */
  /* DAY PICKER SCRIPT */
  /* DAY PICKER SCRIPT */
  /* DAY PICKER SCRIPT */
  const ll_day_pickers = document.querySelectorAll('[data-gjs-type="date-picker"]');
  
  ll_day_pickers.forEach((el) => {
    const { dateDaysBefore, dateFormat } = el.dataset;
    const dateSpan = el.querySelector('[data-date-text-date]');
    const setdate = new Date();
    setdate.setDate(setdate.getDate() - Number(dateDaysBefore));
      
    if(dateFormat === 'year') dateSpan.innerText =  new Date().getFullYear();
    else dateSpan.innerText = setdate.toLocaleString('en-us', { dateStyle: dateFormat,});
  });
  
  /* COUNTDOWN SCRIPT */
  /* COUNTDOWN SCRIPT */
  /* COUNTDOWN SCRIPT */
  /* COUNTDOWN SCRIPT */
  /* COUNTDOWN SCRIPT */
  const LLCountdowns = document.querySelectorAll('[data-countdown-id]');
  const LLCountdownsCookie = getLLCountdownCookie();
  
  LLCountdowns.forEach((countdown) => {
    if (countdown.closest('[ll-modal-wrapper="true"]')) return;
    triggerCountdown(countdown);
  });

  function triggerCountdown(countdown) {
    const { countdownId, countdownTime } = countdown.dataset;
  
    if (
      !LLCountdownsCookie[countdownId] ||
      Number(countdownTime) !== LLCountdownsCookie[countdownId].time
    ) {
      LLCountdownsCookie[countdownId] = {
        time: Number(countdownTime),
        date: Date.now(),
      };
    }
  
    const interval = setInterval(() => {
      const time =
        LLCountdownsCookie[countdownId].date +
        LLCountdownsCookie[countdownId].time -
        Date.now();
  
      if (!countdown.classList.contains('ll-countdown-visible'))
        countdown.classList.add('ll-countdown-visible');
  
      if (time <= 0) {
        clearInterval(interval);
        updateLLCountdownTime(countdown, 0);
      } else updateLLCountdownTime(countdown, time);
    }, 500);
  };

  setLLCountdownCookie(LLCountdownsCookie);
  /* Update LL Countdown DOM */
  function updateLLCountdownTime(element, time) {
    const dayMs = Math.floor(time / (1000 * 60 * 60 * 24));
    const hourMs = Math.floor(time / (1000 * 60 * 60));
    const minMs = Math.floor(time / (1000 * 60));
    const secMs = Math.floor(time / 1000);
  
    const day = dayMs.toString().padStart(2, '0');
    const hour = (hourMs - dayMs * 24).toString().padStart(2, '0');
    const min = (minMs - hourMs * 60).toString().padStart(2, '0');
    const sec = (secMs - minMs * 60).toString().padStart(2, '0');
  
    element.querySelector(
      '[data-countdown-group="day"] [data-countdown-value]'
    ).innerText = day;
    element.querySelector(
      '[data-countdown-group="hour"] [data-countdown-value]'
    ).innerText = hour;
    element.querySelector(
      '[data-countdown-group="min"] [data-countdown-value]'
    ).innerText = min;
    element.querySelector(
      '[data-countdown-group="sec"] [data-countdown-value]'
    ).innerText = sec;
  }
  /* Get Coutndown Cookie Function */
  function getLLCountdownCookie() {
    const llCountdownCookie = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('llCountdown='));
    if (llCountdownCookie) {
      const llCountdownValue = llCountdownCookie.split('=')[1];
      try {
        return JSON.parse(llCountdownValue);
      } catch (error) {
        return {};
      }
    }
    return {};
  }
  /* Set Countdown Cookie Function */
  function setLLCountdownCookie(value) {
    document.cookie = 'llCountdown=' + JSON.stringify(value);
  }

  /* SPINNER SCRIPT */
  /* SPINNER SCRIPT */
  /* SPINNER SCRIPT */
  /* SPINNER SCRIPT */
  const ll_spiners = document.querySelectorAll('[data-gjs-type="spinner"]');

  ll_spiners.forEach((spinner) => {
    const ll_spinner_img = spinner.querySelector('img');
    ll_spinner_img.style.transform = 'translate(-50%, -50%) rotate(0deg)';

    spinner.addEventListener('click', () => {
      if (spinner.classList.contains('ll-spinner--spin')) return;
      const { spinDeg, spinnerLossDeg } = spinner.dataset;
      const type = spinner.dataset.spinnerEvent;
      let href = spinner.getAttribute('href');
      let target = spinner.getAttribute('target');

      if (spinnerLossDeg) {
        ll_spinner_add_spin(spinner, ll_spinner_img, +spinnerLossDeg + 720);

        setTimeout(() => {
          const startingDegree = 360 - +spinnerLossDeg;
          const endDegree =
            +spinnerLossDeg + 720 + startingDegree + +spinDeg + 720;
            
          spinner.classList.remove('ll-spinner--spin');
          ll_spinner_add_spin(spinner, ll_spinner_img, endDegree);

          /* After spinning is completed */
          setTimeout(
            () => ll_spinner_run_event(spinner, href, target, type),
            6000
          );
        }, 6000);

        console.log(360 - +spinnerLossDeg);
        return;
      }

      /* Add Rotation in Styles */
      ll_spinner_img.style.transform = `translate(-50%, -50%) rotate(${
        +spinDeg + 720
      }deg)`;
      /* Add spinning class */
      spinner.classList.add('ll-spinner--spin');

      /* After spinning is completed */
      setTimeout(() => ll_spinner_run_event(spinner, href, target, type), 6000);
    });
  });

  function ll_spinner_add_spin(spinner, img, degree) {
    img.style.transform = `translate(-50%, -50%) rotate(${degree}deg)`;
    spinner.classList.add('ll-spinner--spin');
  }

  function ll_spinner_run_event(el, href, target, type) {
    if (type === 'popup') {
      const openedPopups = document.querySelectorAll('[ll-modal-name]');
      openedPopups.forEach((modal) => modal.classList.remove('visibility'));
      const modalId = el.dataset.llModal;
      const modal = document.querySelector(`[ll-modal-id="${modalId}"]`);
      modal.classList.add('visible');
      return;
    }
    if (type === 'redirect')
      window.open(parseHref(href), target ? '_blank' : '_self');
    if (type === 'id') {
      const targetEl = document.querySelector(href);
      targetEl.style.display = 'unset';
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  }


/* VIDEO SCRIPT */
/* VIDEO SCRIPT */
/* VIDEO SCRIPT */
/* VIDEO SCRIPT */
const ll_video_elements = document.querySelectorAll('[data-gjs-type="ll-video"]');

ll_video_elements.forEach((el) => {
  const { videoType, videoAutoplay, videoLoop, videoControls, videoMute, videoSrc } = el.dataset;
  const muteString = videoType === 'vimeo' ? 'muted=1' : 'mute=1';
  const srcString = `${videoSrc}&${videoAutoplay ? 'autoplay=1&' : ''}${videoControls ? '' : 'controls=0&'}${videoLoop ? 'loop=1&' : ''}${videoMute ? muteString : ''}`;

  if (videoType === 'video') {
    el.innerHTML = `<video src="${videoSrc}" ${videoControls ? 'controls' : ''}${videoMute ? 'muted' : ''} ${videoLoop ? 'loop' : ''} ${videoAutoplay ? 'autoplay' : ''}> </video>`;
  } else if (videoType === 'youtube') {
    el.innerHTML = `<iframe src="${srcString}" title="YouTube video player" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  } else if (videoType === 'vimeo') {
    el.innerHTML = `<iframe src="${srcString}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }
});
