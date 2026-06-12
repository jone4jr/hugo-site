(function () {
  var scaleLabels = ["Rarely", "Sometimes", "Often", "Usually", "Almost always"];

  var resources = {
    accountability: [
      { kind: "System path", title: "Standards and Accountability", url: "/leadership-system/standards-and-accountability/", description: "Make ownership, expectations, and follow-through visible." },
      { kind: "Tool", title: "Accountability Map Worksheet", url: "/tools/accountability-map-worksheet/", description: "Map the owner, checkpoint, support, and consequence." },
      { kind: "Article", title: "The Accountability Map", url: "/posts/the-accountability-map/", description: "Replace vague ownership with visible commitments." }
    ],
    supervisors: [
      { kind: "System path", title: "Supervisor Development", url: "/leadership-system/supervisor-development/", description: "Develop supervisors through real leadership moments." },
      { kind: "Tool", title: "Supervisor Standard Work Template", url: "/tools/supervisor-standard-work-template/", description: "Define the daily and weekly leadership habits to coach." },
      { kind: "Article", title: "Supervisor Standard Work That Actually Works", url: "/posts/supervisor-standard-work-that-actually-works/", description: "Build a supervisor routine that supports judgment." }
    ],
    meetings: [
      { kind: "System path", title: "Communication Cadence", url: "/leadership-system/communication-cadence/", description: "Keep priorities, decisions, and owners clear across shifts." },
      { kind: "Tool", title: "Meeting Health Scorecard", url: "/tools/meeting-health-scorecard/", description: "Score meetings on purpose, ownership, and follow-through." },
      { kind: "Article", title: "How to Run a Shift-Start Meeting", url: "/posts/how-to-run-a-shift-start-meeting/", description: "Run shift starts that create action instead of noise." }
    ],
    retention: [
      { kind: "System path", title: "Retention and Trust", url: "/leadership-system/retention-and-trust/", description: "Review trust, workload, growth, and friction as leadership signals." },
      { kind: "Tool", title: "Retention Risk Review", url: "/tools/retention-risk-review/", description: "Spot retention risk while leaders can still act." },
      { kind: "Article", title: "How to Build Trust After a Bad Week", url: "/posts/how-to-build-trust-after-a-bad-week/", description: "Repair credibility after pressure, confusion, or misses." }
    ]
  };

  var assessments = {
    "accountability-system": {
      intro: "This scan measures whether accountability is built into the system or carried by reminders and pressure.",
      labels: { expectations: "Expectations", ownership: "Ownership", visibility: "Visibility", consequences: "Consequences" },
      recommendations: resources.accountability,
      questions: [
        { text: "People can describe the standard in observable behavior.", dimension: "expectations" },
        { text: "Important commitments leave meetings with one named owner.", dimension: "ownership" },
        { text: "Progress is visible before the due date arrives.", dimension: "visibility" },
        { text: "Missed commitments are addressed consistently and fairly.", dimension: "consequences" },
        { text: "Leaders separate a preference from a true standard.", dimension: "expectations" },
        { text: "Owners know what support or resources are available.", dimension: "ownership" },
        { text: "Follow-up points are scheduled before work drifts.", dimension: "visibility" },
        { text: "The team understands what happens when a standard is missed.", dimension: "consequences" },
        { text: "Accountability conversations focus on facts before frustration.", dimension: "expectations" },
        { text: "People do not need repeated reminders to know what they own.", dimension: "ownership" },
        { text: "Leaders can see weak signals before failure is obvious.", dimension: "visibility" },
        { text: "The same standard applies regardless of who misses it.", dimension: "consequences" }
      ]
    },
    "supervisor-readiness": {
      intro: "This check looks at whether supervisors are ready for the leadership moments that shape the shift.",
      labels: { rhythm: "Daily rhythm", judgment: "Judgment", coaching: "Coaching", communication: "Communication" },
      recommendations: resources.supervisors,
      questions: [
        { text: "The supervisor starts the shift with priorities, risks, and standards clear.", dimension: "rhythm" },
        { text: "The supervisor checks the process instead of only reacting to problems.", dimension: "rhythm" },
        { text: "The supervisor can explain why a decision was made.", dimension: "judgment" },
        { text: "The supervisor escalates with facts, owner clarity, and urgency.", dimension: "judgment" },
        { text: "The supervisor gives feedback close to the moment.", dimension: "coaching" },
        { text: "The supervisor follows up after coaching conversations.", dimension: "coaching" },
        { text: "The supervisor communicates changes in plain language.", dimension: "communication" },
        { text: "The supervisor confirms understanding instead of assuming it.", dimension: "communication" },
        { text: "The supervisor protects the same core habits during hard shifts.", dimension: "rhythm" },
        { text: "The supervisor asks for help before the issue becomes hidden rework.", dimension: "judgment" },
        { text: "The supervisor develops people instead of only assigning tasks.", dimension: "coaching" },
        { text: "The team hears a consistent message from this supervisor.", dimension: "communication" }
      ]
    },
    "meeting-health": {
      intro: "This audit measures whether recurring meetings create clarity, ownership, and action.",
      labels: { purpose: "Purpose", signal: "Signal quality", ownership: "Ownership", followThrough: "Follow-through" },
      recommendations: resources.meetings,
      questions: [
        { text: "The meeting has a clear reason to exist.", dimension: "purpose" },
        { text: "People know what decisions belong in the meeting.", dimension: "purpose" },
        { text: "The meeting uses current facts instead of general updates.", dimension: "signal" },
        { text: "Risks and blockers are visible early enough to act.", dimension: "signal" },
        { text: "Actions leave the meeting with one named owner.", dimension: "ownership" },
        { text: "Owners know the next checkpoint before the meeting ends.", dimension: "ownership" },
        { text: "Old commitments are reviewed before new ones are added.", dimension: "followThrough" },
        { text: "Escalated items are closed or advanced, not carried forever.", dimension: "followThrough" },
        { text: "The meeting is short enough to maintain attention.", dimension: "purpose" },
        { text: "The team can repeat the priority after the meeting.", dimension: "signal" },
        { text: "Leaders do not allow group awareness to replace ownership.", dimension: "ownership" },
        { text: "The meeting creates visible action within the next work cycle.", dimension: "followThrough" }
      ]
    },
    "retention-risk": {
      intro: "This pulse looks for leadership signals that often appear before good people disengage.",
      labels: { trust: "Trust", workload: "Workload", growth: "Growth", friction: "Friction" },
      recommendations: resources.retention,
      questions: [
        { text: "Leaders close the loop on commitments made to the team.", dimension: "trust" },
        { text: "Employees can raise concerns without being dismissed.", dimension: "trust" },
        { text: "Workload pressure is visible before people burn out.", dimension: "workload" },
        { text: "Leaders can explain why work is distributed the way it is.", dimension: "workload" },
        { text: "Good employees see a path to learn or contribute more.", dimension: "growth" },
        { text: "Coaching conversations include development, not only correction.", dimension: "growth" },
        { text: "Repeated blockers are reviewed instead of accepted as normal.", dimension: "friction" },
        { text: "The team sees leaders remove friction after feedback.", dimension: "friction" },
        { text: "Recognition is specific enough that people know what to repeat.", dimension: "trust" },
        { text: "High performers are protected from becoming permanent rescuers.", dimension: "workload" },
        { text: "Leaders know which people are at risk before resignation is likely.", dimension: "growth" },
        { text: "Small irritations are fixed before they become the culture.", dimension: "friction" }
      ]
    }
  };

  function hasSubscriber() {
    return !!(window.FiveAmShift && window.FiveAmShift.getSubscriber && window.FiveAmShift.getSubscriber());
  }

  function renderGate(root, title) {
    root.innerHTML = "<div class='assessment-gate'><div class='assessment-gate__card'><p class='eyebrow'>Subscriber unlock</p><h2>Subscribe to open " + title + "</h2><p>The free assessment library opens after you join the leadership list. Once you do, your access stays open on this device.</p><form class='newsletter-form js-newsletter-form' data-source='assessment-gate' data-success='Assessment unlocked. You can start now.'><label class='sr-only' for='system-assessment-email'>Email address</label><input id='system-assessment-email' name='email' type='email' placeholder='Enter your email' autocomplete='email' required><button class='button button-primary' type='submit'>Subscribe and unlock</button><p class='newsletter-note'>Join the leadership list for practical updates and new resources.</p><p class='form-message js-form-message' aria-live='polite'></p></form></div></div>";

    if (window.FiveAmShift && window.FiveAmShift.bindNewsletterForms) {
      window.FiveAmShift.bindNewsletterForms(root);
      window.FiveAmShift.syncSubscriberUi(root);
    }
  }

  function scoreDimensions(config, answers) {
    var scores = {};
    var maxScores = {};
    config.questions.forEach(function (question, index) {
      scores[question.dimension] = scores[question.dimension] || 0;
      maxScores[question.dimension] = maxScores[question.dimension] || 0;
      scores[question.dimension] += answers[index] || 0;
      maxScores[question.dimension] += 5;
    });
    var normalized = {};
    Object.keys(scores).forEach(function (key) {
      normalized[key] = Math.round((scores[key] / maxScores[key]) * 100);
    });
    return normalized;
  }

  function sortedEntries(scores) {
    return Object.keys(scores).map(function (key) {
      return { key: key, value: scores[key] };
    }).sort(function (left, right) {
      return right.value - left.value;
    });
  }

  function renderScoreCards(scores, labels) {
    return "<div class='score-grid'>" + sortedEntries(scores).map(function (entry) {
      return "<div class='score-card'><strong>" + labels[entry.key] + "</strong><div class='score-bar'><span style='width:" + entry.value + "%'></span></div><p>" + entry.value + "%</p></div>";
    }).join("") + "</div>";
  }

  function renderLinks(items) {
    return "<div class='result-links'>" + items.map(function (item) {
      return "<a class='result-link' href='" + item.url + "'><span class='result-link__eyebrow'>" + item.kind + "</span><strong>" + item.title + "</strong><span>" + item.description + "</span></a>";
    }).join("") + "</div>";
  }

  function renderResults(config, scores) {
    var entries = sortedEntries(scores);
    var average = Math.round(entries.reduce(function (sum, entry) { return sum + entry.value; }, 0) / entries.length);
    var strongest = entries[0];
    var weakest = entries[entries.length - 1];
    var label = average >= 82 ? "System strength" : average >= 65 ? "Usable but uneven" : "Needs leadership focus";

    return "<div class='assessment-results'><div class='result-hero'><p class='eyebrow'>Assessment result</p><h2>" + label + "</h2><p>Your overall score is " + average + "%. Your strongest signal is " + config.labels[strongest.key] + "; the best place to improve next is " + config.labels[weakest.key] + ".</p></div>" + renderScoreCards(scores, config.labels) + "<div class='result-grid'><div class='result-card'><strong>What to protect</strong><p>Keep using " + config.labels[strongest.key] + " as a stabilizing habit while you improve the weak spot.</p></div><div class='result-card'><strong>What to tighten</strong><p>Start with " + config.labels[weakest.key] + ". Pick one visible behavior that can change this week.</p></div><div class='result-card'><strong>Leadership move</strong><p>Name the owner, the next checkpoint, and the evidence you will review before the week ends.</p></div><div class='result-card'><strong>Best use</strong><p>Retake the assessment after two weeks of practice and compare the weakest dimension.</p></div></div><div class='recommendation-panel'><div class='recommendation-panel__copy'><p class='eyebrow'>Recommended next steps</p><h3>Turn the result into practice.</h3><p>Use one system path, one tool, and one article to move from reflection to visible behavior.</p></div>" + renderLinks(config.recommendations) + "</div></div>";
  }

  function makeChoices(selectedValue) {
    return "<div class='choice-grid'>" + scaleLabels.map(function (label, index) {
      var value = index + 1;
      var className = value === selectedValue ? "choice-button is-selected" : "choice-button";
      return "<button type='button' class='" + className + "' data-value='" + value + "'><span>" + value + "</span><span>" + label + "</span></button>";
    }).join("") + "</div>";
  }

  function mountAssessment(root) {
    var key = root.getAttribute("data-assessment");
    var config = assessments[key];
    if (!config) {
      return;
    }

    var state = { index: 0, answers: new Array(config.questions.length).fill(null), done: false };

    function refresh() {
      if (!hasSubscriber()) {
        renderGate(root, root.getAttribute("data-title") || "this assessment");
        return;
      }
      if (state.done) {
        var scores = scoreDimensions(config, state.answers);
        root.innerHTML = renderResults(config, scores) + "<div class='result-actions'><button type='button' class='button button-secondary js-retake'>Retake assessment</button><a class='button button-primary' href='/library/'>Open the library</a></div>";
        var retake = root.querySelector(".js-retake");
        if (retake) {
          retake.addEventListener("click", function () {
            state.index = 0;
            state.answers = new Array(config.questions.length).fill(null);
            state.done = false;
            refresh();
          });
        }
        return;
      }

      var question = config.questions[state.index];
      var selectedValue = state.answers[state.index];
      var progress = Math.round((state.index / config.questions.length) * 100);
      root.innerHTML = "<div class='assessment-stage'><div class='assessment-progress'><div class='article-meta'><span class='pill'>Question " + (state.index + 1) + " of " + config.questions.length + "</span></div><div class='assessment-progress__bar'><span style='width:" + progress + "%'></span></div><p>" + config.intro + "</p></div><div class='question-card'><h2>" + question.text + "</h2><p class='question-card__prompt'>Choose the response that best matches what happens in normal weeks, not ideal weeks.</p>" + makeChoices(selectedValue) + "</div><div class='assessment-actions'><button type='button' class='button button-subtle js-back'" + (state.index === 0 ? " disabled" : "") + ">Back</button><p>" + (selectedValue ? "Selected: " + scaleLabels[selectedValue - 1] : "Choose one option to continue.") + "</p></div></div>";

      root.querySelectorAll(".choice-button").forEach(function (button) {
        button.addEventListener("click", function () {
          state.answers[state.index] = parseInt(button.getAttribute("data-value"), 10);
          if (state.index === config.questions.length - 1) {
            state.done = true;
          } else {
            state.index += 1;
          }
          refresh();
        });
      });

      var backButton = root.querySelector(".js-back");
      if (backButton) {
        backButton.addEventListener("click", function () {
          if (state.index > 0) {
            state.index -= 1;
            refresh();
          }
        });
      }
    }

    document.addEventListener("subscriber:updated", refresh);
    refresh();
  }

  document.querySelectorAll(".js-assessment").forEach(function (root) {
    mountAssessment(root);
  });
})();