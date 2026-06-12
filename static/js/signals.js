(function () {
  function isNumber(value) {
    return typeof value === "number" && isFinite(value);
  }

  function pick() {
    for (var index = 0; index < arguments.length; index += 1) {
      if (arguments[index] !== null && arguments[index] !== undefined && arguments[index] !== "") {
        return arguments[index];
      }
    }
    return null;
  }

  function display(value, fallback) {
    if (value === null || value === undefined || value === "") {
      return fallback || "N/A";
    }
    return String(value);
  }

  function numberValue(value) {
    if (isNumber(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "") {
      var parsed = Number(value);
      if (isNumber(parsed)) {
        return parsed;
      }
    }
    return null;
  }

  function formatMoney(value) {
    var number = numberValue(value);
    if (number === null) {
      return display(value);
    }
    return "$" + number.toFixed(2);
  }

  function formatPercent(value) {
    var number = numberValue(value);
    if (number === null) {
      return display(value);
    }
    return number.toFixed(1) + "%";
  }

  function formatZone(value) {
    if (Array.isArray(value) && value.length >= 2) {
      return formatMoney(value[0]) + " - " + formatMoney(value[1]);
    }
    return display(value);
  }

  function formatTimestamp(value) {
    if (!value) {
      return "Awaiting first automated run";
    }
    var date = new Date(value);
    if (isNaN(date.getTime())) {
      return String(value);
    }
    return date.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short"
    });
  }

  function ratingFor(item, side) {
    if (side === "buys") {
      return display(pick(item.long_rating, item.rating));
    }
    return display(pick(item.short_rating, item.rating));
  }

  function labelFor(item, side) {
    if (side === "buys") {
      return display(pick(item.long_label, item.label));
    }
    return display(pick(item.short_label, item.label));
  }

  function detailUrlFor(item) {
    if (item.detail_url) {
      return item.detail_url;
    }
    var ticker = display(item.ticker, "").toLowerCase().replace(/[^a-z0-9-]/g, "");
    return ticker ? "/signals/" + ticker + "/" : "/signals/";
  }

  function clearNode(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }

  function appendCell(row, value, className) {
    var cell = document.createElement("td");
    if (className) {
      cell.className = className;
    }
    cell.textContent = display(value);
    row.appendChild(cell);
    return cell;
  }

  function appendEmptyRow(body, message) {
    clearNode(body);
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    cell.colSpan = 8;
    cell.className = "signals-empty-cell";
    cell.textContent = message;
    row.appendChild(cell);
    body.appendChild(row);
  }

  function renderRows(body, rows, side) {
    if (!body) {
      return;
    }
    if (!rows || !rows.length) {
      appendEmptyRow(body, "No published " + (side === "buys" ? "buy" : "sell") + " signals yet.");
      return;
    }

    clearNode(body);
    rows.slice(0, 10).forEach(function (item) {
      var row = document.createElement("tr");
      var tickerCell = document.createElement("td");
      var link = document.createElement("a");
      var company = document.createElement("span");
      var tradePlan = item.trade_plan || {};

      link.className = "signals-ticker";
      link.href = detailUrlFor(item);
      link.textContent = display(item.ticker);
      tickerCell.appendChild(link);

      if (item.company) {
        company.className = "signals-company";
        company.textContent = item.company;
        tickerCell.appendChild(company);
      }
      row.appendChild(tickerCell);

      appendCell(row, ratingFor(item, side), "signals-rating");
      appendCell(row, labelFor(item, side));
      appendCell(row, formatMoney(item.price));
      appendCell(row, formatPercent(pick(item.upside_pct, item.downside_pct)));
      appendCell(row, formatZone(pick(item.entry_zone, tradePlan.entry_zone)));
      appendCell(row, formatMoney(pick(item.target, tradePlan.target)));
      appendCell(row, formatMoney(pick(item.stop, tradePlan.stop)));
      body.appendChild(row);
    });
  }

  function renderStatus(data) {
    var panels = document.querySelectorAll("[data-signals-status]");
    panels.forEach(function (panel) {
      var title = panel.querySelector("h2");
      var body = panel.querySelector("p:not(.eyebrow)");
      if (title) {
        title.textContent = data && data.status === "published" ? "Latest run published" : "Awaiting first automated run";
      }
      if (body) {
        body.textContent = data && data.message ? data.message : "The dashboard is ready for the nightly JSON output, but no live signal run has been published yet.";
      }
    });
  }

  function renderDashboard(root, data) {
    var asOf = root.querySelector(".js-signals-as-of");
    if (asOf) {
      if (data && data.status === "published") {
        asOf.textContent = "Data as of " + formatTimestamp(data.as_of) + " for market date " + display(data.market_date) + ".";
      } else {
        asOf.textContent = data && data.message ? data.message : "Awaiting first automated run.";
      }
    }

    renderRows(root.querySelector("[data-signal-list='buys']"), data && data.buys, "buys");
    renderRows(root.querySelector("[data-signal-list='sells']"), data && data.sells, "sells");
  }

  function renderArchive(root, data) {
    var list = root.querySelector("[data-signals-archive-list]");
    var runs = data && data.runs ? data.runs : [];
    if (!list) {
      return;
    }

    clearNode(list);
    if (!runs.length) {
      var empty = document.createElement("p");
      empty.className = "signals-empty-message";
      empty.textContent = "No archived signal runs have been published yet.";
      list.appendChild(empty);
      return;
    }

    runs.forEach(function (run) {
      var item = document.createElement("a");
      var date = document.createElement("strong");
      var meta = document.createElement("span");
      item.className = "signals-archive-item";
      item.href = run.url || "/signals/archive/";
      date.textContent = display(run.market_date, "Unknown market date");
      meta.textContent = display(run.summary, "Top 10 Buy and Top 10 Sell run") + " - " + formatTimestamp(run.as_of);
      item.appendChild(date);
      item.appendChild(meta);
      list.appendChild(item);
    });
  }

  function fetchJson(url) {
    if (!url || !window.fetch) {
      return Promise.resolve(null);
    }
    return fetch(url, { cache: "no-store" }).then(function (response) {
      if (!response.ok) {
        throw new Error("Could not load signals data");
      }
      return response.json();
    }).catch(function () {
      return null;
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var dashboard = document.querySelector("[data-signals-dashboard]");
    if (dashboard) {
      fetchJson(dashboard.getAttribute("data-latest-url")).then(function (data) {
        renderStatus(data);
        renderDashboard(dashboard, data);
      });
    }

    var archive = document.querySelector("[data-signals-archive]");
    if (archive) {
      fetchJson(archive.getAttribute("data-archive-url")).then(function (data) {
        renderArchive(archive, data);
      });
    }
  });
}());
