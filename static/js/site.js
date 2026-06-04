(function () {
  var STORAGE_KEY = "fiveamshift_subscriber_v1";
  var PENDING_KEY = "fiveamshift_pending_subscriber_v1";

  function safeParse(value) {
    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  }

  function getSubscriber() {
    if (!window.localStorage) {
      return null;
    }
    return safeParse(window.localStorage.getItem(STORAGE_KEY));
  }

  function getPendingSubscriber() {
    if (!window.sessionStorage) {
      return null;
    }
    return safeParse(window.sessionStorage.getItem(PENDING_KEY));
  }

  function setPendingSubscriber(payload) {
    if (!window.sessionStorage) {
      return;
    }
    window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(payload));
  }

  function clearPendingSubscriber() {
    if (!window.sessionStorage) {
      return;
    }
    window.sessionStorage.removeItem(PENDING_KEY);
  }

  function setSubscriber(payload) {
    if (!window.localStorage) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    document.documentElement.setAttribute("data-subscriber", "true");
    document.dispatchEvent(new CustomEvent("subscriber:updated", { detail: payload }));
  }

  function syncSubscriberUi(scope) {
    var root = scope || document;
    var subscriber = getSubscriber();
    if (subscriber) {
      document.documentElement.setAttribute("data-subscriber", "true");
    }
    var forms = root.querySelectorAll(".js-newsletter-form");
    forms.forEach(function (form) {
      if (!subscriber) {
        return;
      }
      var input = form.querySelector("input[type='email']");
      var message = form.querySelector(".js-form-message");
      var button = form.querySelector("button");
      if (input) {
        input.value = subscriber.email || "";
      }
      if (message) {
        message.textContent = form.getAttribute("data-success") || "You are subscribed.";
      }
      if (button) {
        button.textContent = "Unlocked";
        button.disabled = true;
      }
      if (input) {
        input.readOnly = true;
      }
    });
  }

  function buildNewsletterEndpoint(form) {
    var action = form.getAttribute("action") || document.body.getAttribute("data-newsletter-action");
    if (action) {
      return action;
    }

    var provider = form.getAttribute("data-newsletter-provider") || document.body.getAttribute("data-newsletter-provider");
    var recipient = document.body.getAttribute("data-newsletter-recipient");
    if (provider === "formsubmit" && recipient) {
      return "https://formsubmit.co/" + recipient;
    }

    return "";
  }

  function upsertHiddenField(form, name, value) {
    var field = form.querySelector("input[name='" + name + "']");
    if (!field) {
      field = document.createElement("input");
      field.type = "hidden";
      field.name = name;
      form.appendChild(field);
    }
    field.value = value;
  }

  function buildReturnUrl() {
    var url = new URL(window.location.href);
    url.searchParams.set("newsletter", "success");
    return url.toString();
  }

  function hydrateSubscriberFromReturn() {
    var url = new URL(window.location.href);
    if (url.searchParams.get("newsletter") !== "success") {
      return;
    }

    var pending = getPendingSubscriber();
    if (pending && pending.email) {
      setSubscriber({
        email: pending.email,
        source: pending.source || "unknown",
        subscribedAt: pending.subscribedAt || new Date().toISOString()
      });
    }

    clearPendingSubscriber();
    url.searchParams.delete("newsletter");
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, document.title, url.toString());
    }
  }

  function bindNewsletterForms(scope) {
    var root = scope || document;
    var forms = root.querySelectorAll(".js-newsletter-form:not([data-bound='true'])");
    forms.forEach(function (form) {
      form.setAttribute("data-bound", "true");
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        var input = form.querySelector("input[type='email']");
        var message = form.querySelector(".js-form-message");
        var button = form.querySelector("button");
        var email = input ? input.value.trim() : "";
        if (!email || email.indexOf("@") === -1) {
          if (message) {
            message.textContent = "Please enter a valid email address.";
          }
          return;
        }

        var endpoint = buildNewsletterEndpoint(form);
        if (!endpoint) {
          if (message) {
            message.textContent = "Signup is not connected yet. Please try again soon.";
          }
          return;
        }

        form.setAttribute("action", endpoint);
        upsertHiddenField(form, "_next", buildReturnUrl());
        upsertHiddenField(form, "source", form.getAttribute("data-source") || "unknown");
        upsertHiddenField(form, "page", window.location.pathname + window.location.search);
        upsertHiddenField(form, "page_title", document.title);
        upsertHiddenField(form, "submitted_at", new Date().toISOString());
        setPendingSubscriber({
          email: email,
          source: form.getAttribute("data-source") || "unknown",
          subscribedAt: new Date().toISOString()
        });
        if (message) {
          message.textContent = "Sending you through now...";
        }
        if (button) {
          button.disabled = true;
          button.textContent = "Submitting...";
        }

        form.submit();
      });
    });
  }

  function initNav() {
    var toggle = document.querySelector(".js-nav-toggle");
    var nav = document.querySelector(".js-site-nav");
    if (!toggle || !nav) {
      return;
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function initReveals() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach(function (item) {
        item.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initFilters() {
    document.querySelectorAll(".js-filter-bar").forEach(function (bar) {
      var buttons = bar.querySelectorAll("button");
      var targetSelector = bar.getAttribute("data-target") || ".article-card";
      var cards = document.querySelectorAll(targetSelector);

      buttons.forEach(function (button) {
        button.addEventListener("click", function () {
          var filter = button.getAttribute("data-filter");
          buttons.forEach(function (item) {
            item.classList.remove("is-active");
          });
          button.classList.add("is-active");

          cards.forEach(function (card) {
            var cardFilter = card.getAttribute("data-category");
            var shouldShow = filter === "all" || filter === cardFilter;
            card.classList.toggle("is-hidden", !shouldShow);
          });
        });
      });
    });
  }

  document.addEventListener("subscriber:updated", function () {
    syncSubscriberUi(document);
  });

  window.FiveAmShift = {
    getSubscriber: getSubscriber,
    setSubscriber: setSubscriber,
    bindNewsletterForms: bindNewsletterForms,
    syncSubscriberUi: syncSubscriberUi
  };

  hydrateSubscriberFromReturn();
  bindNewsletterForms(document);
  syncSubscriberUi(document);
  initNav();
  initReveals();
  initFilters();
})();
