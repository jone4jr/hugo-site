(function () {
  var scaleLabels = ["Rarely", "Sometimes", "Often", "Usually", "Almost always"];

  var assessments = {
    disc: {
      intro: "This profile estimates the leadership style you are most likely to show when the pressure rises.",
      questions: [
        { text: "When direction is unclear, I naturally step in and take control.", dimension: "D" },
        { text: "I am comfortable making a call before every detail is perfect.", dimension: "D" },
        { text: "I push hard when I believe a result matters.", dimension: "D" },
        { text: "I prefer direct conversations over slow consensus.", dimension: "D" },
        { text: "I naturally energize a room when morale is flat.", dimension: "I" },
        { text: "I enjoy persuading others around a new idea.", dimension: "I" },
        { text: "People often describe me as expressive or encouraging.", dimension: "I" },
        { text: "I build momentum by talking things through with others.", dimension: "I" },
        { text: "I value steadiness and predictability in how work gets done.", dimension: "S" },
        { text: "I stay patient when others need more time or reassurance.", dimension: "S" },
        { text: "I try to reduce friction before I push for a decision.", dimension: "S" },
        { text: "I care deeply about the emotional tone of the team.", dimension: "S" },
        { text: "I look for precision before I feel ready to finalize a decision.", dimension: "C" },
        { text: "I notice gaps, inconsistencies, or weak logic quickly.", dimension: "C" },
        { text: "I prefer well-defined expectations and clear standards.", dimension: "C" },
        { text: "I hold myself and others to a high level of detail.", dimension: "C" }
      ],
      profiles: {
        D: {
          label: "Driver",
          summary: "You likely create pace, pressure, and direction quickly. Teams often feel momentum from you.",
          strengths: ["decisive under pressure", "comfortable with ownership", "pushes for movement"],
          watchouts: ["can sound abrupt", "may skip buy-in", "can outrun detail"]
        },
        I: {
          label: "Influencer",
          summary: "You likely build energy through communication, encouragement, and visible optimism.",
          strengths: ["energizes people", "sells ideas well", "builds connection fast"],
          watchouts: ["can overtalk", "may avoid hard edges", "can move on before details stick"]
        },
        S: {
          label: "Steady Builder",
          summary: "You likely create trust through consistency, calm presence, and reliability.",
          strengths: ["patient with people", "creates stability", "builds durable trust"],
          watchouts: ["can delay conflict", "may tolerate drift too long", "can underplay urgency"]
        },
        C: {
          label: "Precision Leader",
          summary: "You likely bring rigor, standards, and careful thinking to the work.",
          strengths: ["protects quality", "thinks clearly", "spots risk early"],
          watchouts: ["can overanalyze", "may sound critical", "can slow pace when certainty is low"]
        }
      },
      blends: {
        DI: "Catalyst blend: strong pace plus strong influence.",
        DS: "Resolute blend: clear standards with steady follow-through.",
        DC: "Command blend: forceful direction backed by rigor.",
        ID: "Mobilizer blend: persuasive, visible, and action oriented.",
        IS: "Connector blend: relational, encouraging, and people aware.",
        IC: "Presenter blend: expressive but thoughtful about message and quality.",
        SD: "Guardian blend: calm on the surface, strong once committed.",
        SI: "Anchor blend: dependable, supportive, and steadying in groups.",
        SC: "Stabilizer blend: reliable, precise, and careful with change.",
        CD: "Standards blend: exacting and direct when stakes are high.",
        CI: "Strategist blend: analytical but effective at communicating ideas.",
        CS: "Steward blend: measured, loyal, and disciplined."
      }
    },
    delegation: {
      intro: "This diagnostic looks at whether your delegation creates ownership or keeps you as the bottleneck.",
      questions: [
        { text: "When I delegate, I define what success looks like clearly.", dimension: "clarity" },
        { text: "I explain why the work matters, not just what needs done.", dimension: "clarity" },
        { text: "I give people room to solve problems without hovering.", dimension: "trust" },
        { text: "I resist pulling the task back the moment it gets messy.", dimension: "trust" },
        { text: "I coach during the work instead of only correcting after it.", dimension: "coaching" },
        { text: "I check understanding before I assume someone is ready.", dimension: "coaching" },
        { text: "I set follow-up points so delegated work stays visible.", dimension: "followThrough" },
        { text: "I revisit commitments instead of hoping they happen.", dimension: "followThrough" },
        { text: "I tailor delegation to the capability of the person receiving it.", dimension: "coaching" },
        { text: "People usually know whether they own the task or are just helping.", dimension: "clarity" },
        { text: "I can tolerate a different path to the result if the standard is met.", dimension: "trust" },
        { text: "Delegation in my area builds confidence instead of confusion.", dimension: "followThrough" }
      ],
      labels: {
        clarity: "Clarity",
        trust: "Trust",
        coaching: "Coaching",
        followThrough: "Follow-through"
      }
    },
    change: {
      intro: "This pulse measures how your leadership habits shape the team experience during change.",
      questions: [
        { text: "I explain what is changing in concrete, plain language.", dimension: "clarity" },
        { text: "I connect change to the bigger reason behind it.", dimension: "clarity" },
        { text: "I repeat key messages often enough for them to stick.", dimension: "cadence" },
        { text: "I keep visible checkpoints so change does not drift.", dimension: "cadence" },
        { text: "I make room for concerns without letting the team stall out.", dimension: "empathy" },
        { text: "People can raise friction points to me without being shut down.", dimension: "empathy" },
        { text: "I assign ownership clearly during transitions.", dimension: "ownership" },
        { text: "I reinforce new behavior after the launch moment is over.", dimension: "ownership" },
        { text: "I keep pace without pretending uncertainty does not exist.", dimension: "cadence" },
        { text: "My team usually understands what will stay the same and what will change.", dimension: "clarity" },
        { text: "I notice resistance early enough to address it well.", dimension: "empathy" },
        { text: "I make it obvious what success looks like after the change lands.", dimension: "ownership" }
      ],
      labels: {
        clarity: "Clarity",
        cadence: "Cadence",
        empathy: "Empathy",
        ownership: "Ownership"
      }
    }
  };

  var resources = {
    guides: {
      accountability: {
        kind: "Start here guide",
        title: "How to Improve Accountability Without Micromanaging",
        url: "/start-here/improve-accountability-without-micromanaging/",
        description: "Build clearer ownership, steadier follow-through, and less hovering."
      },
      retention: {
        kind: "Start here guide",
        title: "How to Retain Good Employees",
        url: "/start-here/retain-good-employees/",
        description: "Keep strong people by improving the environment they work inside."
      },
      firefighting: {
        kind: "Start here guide",
        title: "How to Stop Firefighting in Operations",
        url: "/start-here/stop-firefighting-in-operations/",
        description: "Reduce reactive work and build calmer execution across shifts."
      },
      supervisors: {
        kind: "Start here guide",
        title: "How to Develop Stronger Supervisors",
        url: "/start-here/develop-stronger-supervisors/",
        description: "Coach supervisors on feedback, delegation, and leadership under pressure."
      }
    },
    tools: {
      oneOnOne: {
        kind: "Free tool",
        title: "Supervisor 1:1 Template",
        url: "/tools/supervisor-1-on-1-template/",
        description: "Use a better rhythm for coaching, clarity, and follow-through."
      },
      conversation: {
        kind: "Free tool",
        title: "Difficult Conversation Prep Sheet",
        url: "/tools/difficult-conversation-prep-sheet/",
        description: "Prepare for a hard conversation without delaying or overcomplicating it."
      },
      handoff: {
        kind: "Free tool",
        title: "Shift Handoff Checklist",
        url: "/tools/shift-handoff-checklist/",
        description: "Tighten shift-to-shift communication and reduce avoidable surprises."
      },
      changeMessage: {
        kind: "Free tool",
        title: "Change Message Checklist",
        url: "/tools/change-message-checklist/",
        description: "Communicate what is changing, why it matters, and what happens next."
      }
    },
    articles: {
      accountability: {
        kind: "Article",
        title: "How to Hold Your Team Accountable Without Micromanaging",
        url: "/how-to-hold-your-team-accountable/",
        description: "The core article for clear ownership without turning into a checker."
      },
      poster: {
        kind: "Article",
        title: "A Goal Nobody Owns at the Floor Is Just a Poster",
        url: "/a-goal-nobody-owns-at-the-floor-is-just-a-poster/",
        description: "Turn big goals into lead measures someone can actually move."
      },
      whyQuit: {
        kind: "Article",
        title: "Why Good Employees Quit",
        url: "/why-good-employees-quit/",
        description: "See the real reasons capable people leave before they finally do."
      },
      meetings: {
        kind: "Article",
        title: "What Your Team Learns From Your Meetings",
        url: "/posts/meetings-teach-culture/",
        description: "Meetings teach culture every week, whether you mean them to or not."
      },
      firefighting: {
        kind: "Article",
        title: "How to Stop Firefighting and Build a Proactive Culture",
        url: "/how-to-stop-firefighting/",
        description: "The clearest starting point for replacing reaction with prevention."
      },
      underPressure: {
        kind: "Article",
        title: "Under Pressure, People Default to Their Primary Job. Plan For It.",
        url: "/under-pressure-people-default-to-their-primary-job/",
        description: "See why preventive work disappears under pressure and how to protect it."
      },
      first90: {
        kind: "Article",
        title: "The First 90 Days as a New Leader: A Proven Playbook",
        url: "/first-90-days-as-a-new-leader/",
        description: "A strong starting point for supervisors or leaders stepping into a new role."
      },
      difficult: {
        kind: "Article",
        title: "Difficult Conversations on the Floor Get Easier When You Stop Delaying Them",
        url: "/posts/difficult-conversations-floor/",
        description: "Address the issue while it is still workable instead of letting it harden."
      },
      badLeader: {
        kind: "Article",
        title: "I Was Trained to Be a Bad Leader. Leaving Was the Best Thing That Ever Happened to Me.",
        url: "/i-was-trained-to-be-a-bad-leader/",
        description: "A first-hand story about unlearning blame, control, and hero leadership."
      },
      oee: {
        kind: "Article",
        title: "When OEE Lies to You",
        url: "/posts/oee-lies/",
        description: "A sharper look at what the number is hiding and how leaders should respond."
      }
    }
  };

  var discRecommendations = {
    D: {
      title: "Best next move for a high-drive style",
      intro: "Use your pace to create clarity, not just urgency.",
      items: [resources.guides.accountability, resources.tools.conversation, resources.articles.accountability]
    },
    I: {
      title: "Best next move for a high-influence style",
      intro: "Turn your energy into a steadier coaching rhythm people can keep using after the meeting ends.",
      items: [resources.guides.supervisors, resources.tools.oneOnOne, resources.articles.meetings]
    },
    S: {
      title: "Best next move for a steady style",
      intro: "Protect the trust you create by addressing disengagement and growth needs before strong people go quiet.",
      items: [resources.guides.retention, resources.tools.oneOnOne, resources.articles.whyQuit]
    },
    C: {
      title: "Best next move for a precision style",
      intro: "Use your rigor to build stronger systems, not just better analysis.",
      items: [resources.guides.firefighting, resources.tools.handoff, resources.articles.oee]
    }
  };

  function scoreDimensions(config, answers) {
    var scores = {};
    var maxScores = {};

    config.questions.forEach(function (question, index) {
      var dimension = question.dimension;
      scores[dimension] = scores[dimension] || 0;
      maxScores[dimension] = maxScores[dimension] || 0;
      scores[dimension] += answers[index] || 0;
      maxScores[dimension] += 5;
    });

    var normalized = {};
    Object.keys(scores).forEach(function (key) {
      normalized[key] = Math.round((scores[key] / maxScores[key]) * 100);
    });

    return normalized;
  }

  function sortedEntries(scores) {
    return Object.keys(scores)
      .map(function (key) {
        return { key: key, value: scores[key] };
      })
      .sort(function (left, right) {
        return right.value - left.value;
      });
  }

  function renderScoreCards(scores, labels) {
    return (
      "<div class='score-grid'>" +
      sortedEntries(scores)
        .map(function (entry) {
          return (
            "<div class='score-card'>" +
            "<strong>" + labels[entry.key] + "</strong>" +
            "<div class='score-bar'><span style='width:" + entry.value + "%'></span></div>" +
            "<p>" + entry.value + "%</p>" +
            "</div>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderRecommendationLinks(items) {
    return (
      "<div class='result-links'>" +
      items
        .map(function (item) {
          return (
            "<a class='result-link' href='" + item.url + "'>" +
            "<span class='result-link__eyebrow'>" + item.kind + "</span>" +
            "<strong>" + item.title + "</strong>" +
            "<span>" + item.description + "</span>" +
            "</a>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderRecommendationPanel(title, intro, items) {
    return (
      "<div class='recommendation-panel'>" +
      "<div class='recommendation-panel__copy'>" +
      "<p class='eyebrow'>Recommended next steps</p>" +
      "<h3>" + title + "</h3>" +
      "<p>" + intro + "</p>" +
      "</div>" +
      renderRecommendationLinks(items) +
      "</div>"
    );
  }

  function getDelegationRecommendation(lowestKey) {
    if (lowestKey === "clarity") {
      return {
        title: "Tighten clarity before you tighten pressure",
        intro: "When delegation feels messy, the first fix is usually clearer ownership, clearer standards, and a clearer finish line.",
        items: [resources.guides.accountability, resources.tools.oneOnOne, resources.articles.poster]
      };
    }
    if (lowestKey === "trust") {
      return {
        title: "Build trust so you do not become the bottleneck",
        intro: "If you keep retaking the work, development slows and dependence grows.",
        items: [resources.guides.supervisors, resources.tools.conversation, resources.articles.badLeader]
      };
    }
    if (lowestKey === "coaching") {
      return {
        title: "Turn delegation into development",
        intro: "The work should build the person, not just get completed this once.",
        items: [resources.guides.supervisors, resources.tools.oneOnOne, resources.articles.difficult]
      };
    }
    return {
      title: "Protect follow-through with visible rhythm",
      intro: "A lot of delegated work fails because the next checkpoint never becomes real enough to hold.",
      items: [resources.guides.accountability, resources.tools.oneOnOne, resources.articles.underPressure]
    };
  }

  function getChangeRecommendation(weakestKey) {
    if (weakestKey === "clarity") {
      return {
        title: "Sharpen the message before you push harder",
        intro: "When people are unclear, more urgency usually creates more confusion, not more movement.",
        items: [resources.guides.firefighting, resources.tools.changeMessage, resources.articles.meetings]
      };
    }
    if (weakestKey === "cadence") {
      return {
        title: "Give the change a steadier rhythm",
        intro: "Teams need repetition, checkpoints, and follow-through or the message disappears into the week.",
        items: [resources.guides.firefighting, resources.tools.handoff, resources.articles.firefighting]
      };
    }
    if (weakestKey === "empathy") {
      return {
        title: "Make more room for what the team is carrying",
        intro: "People accept hard changes faster when they feel seen, coached, and respected in the middle of them.",
        items: [resources.guides.retention, resources.tools.oneOnOne, resources.articles.whyQuit]
      };
    }
    return {
      title: "Make ownership impossible to miss",
      intro: "Change drifts when people hear the message but cannot name what they own next.",
      items: [resources.guides.accountability, resources.tools.changeMessage, resources.articles.accountability]
    };
  }

  function renderDiscResults(scores) {
    var entries = sortedEntries(scores);
    var primary = entries[0];
    var secondary = entries[1];
    var primaryProfile = assessments.disc.profiles[primary.key];
    var blendKey = primary.key + secondary.key;
    var blend = assessments.disc.blends[blendKey] || "A blended style that shifts depending on context.";
    var recommendation = discRecommendations[primary.key];

    return (
      "<div class='assessment-results'>" +
      "<div class='result-hero'>" +
      "<p class='eyebrow'>Your likely pattern</p>" +
      "<h2>" + primaryProfile.label + "</h2>" +
      "<p>" + primaryProfile.summary + "</p>" +
      "<p><strong>Secondary signal:</strong> " + assessments.disc.profiles[secondary.key].label + ". " + blend + "</p>" +
      "</div>" +
      renderScoreCards(scores, {
        D: "Drive",
        I: "Influence",
        S: "Steadiness",
        C: "Conscientiousness"
      }) +
      "<div class='result-grid'>" +
      "<div class='result-card'><strong>Strengths your team may feel</strong><p>" + primaryProfile.strengths.join(", ") + ".</p></div>" +
      "<div class='result-card'><strong>Watch-outs to manage</strong><p>" + primaryProfile.watchouts.join(", ") + ".</p></div>" +
      "<div class='result-card'><strong>Leadership move</strong><p>Ask one trusted person where your style creates clarity and where it creates friction. Use that answer to adjust how you communicate this week.</p></div>" +
      "<div class='result-card'><strong>Use this well</strong><p>Your style is not the problem. The work is to keep its strengths while reducing the friction it can create under pressure.</p></div>" +
      "</div>" +
      renderRecommendationPanel(recommendation.title, recommendation.intro, recommendation.items) +
      "</div>"
    );
  }

  function renderDelegationResults(scores) {
    var entries = sortedEntries(scores);
    var average = Math.round(entries.reduce(function (sum, entry) {
      return sum + entry.value;
    }, 0) / entries.length);
    var label = average >= 82 ? "Ownership Builder" : average >= 65 ? "Capable but uneven" : "Bottleneck risk";
    var lowest = entries[entries.length - 1];
    var labels = assessments.delegation.labels;
    var recommendation = getDelegationRecommendation(lowest.key);

    return (
      "<div class='assessment-results'>" +
      "<div class='result-hero'>" +
      "<p class='eyebrow'>Delegation pattern</p>" +
      "<h2>" + label + "</h2>" +
      "<p>Your overall delegation score is " + average + "%. The strongest delegation systems balance clarity, trust, coaching, and follow-through.</p>" +
      "</div>" +
      renderScoreCards(scores, labels) +
      "<div class='result-grid'>" +
      "<div class='result-card'><strong>Your biggest gap</strong><p>" + labels[lowest.key] + " is the lowest-scoring area. That is the first place to simplify and improve.</p></div>" +
      "<div class='result-card'><strong>Leadership move</strong><p>Choose one task you usually keep too close. Delegate it this week with a success definition, a checkpoint, and a clear owner.</p></div>" +
      "<div class='result-card'><strong>If your score felt low</strong><p>That usually means the system around delegation is unclear, not that you lack work ethic. Fix the process before you judge yourself.</p></div>" +
      "<div class='result-card'><strong>What changes results</strong><p>Delegation gets stronger when the other person can see the outcome, the owner, and the next checkpoint without needing you to rescue it.</p></div>" +
      "</div>" +
      renderRecommendationPanel(recommendation.title, recommendation.intro, recommendation.items) +
      "</div>"
    );
  }

  function renderChangeResults(scores) {
    var entries = sortedEntries(scores);
    var average = Math.round(entries.reduce(function (sum, entry) {
      return sum + entry.value;
    }, 0) / entries.length);
    var label = average >= 82 ? "Mobilizer" : average >= 65 ? "Translator" : "Signal is breaking down";
    var strongest = entries[0];
    var weakest = entries[entries.length - 1];
    var labels = assessments.change.labels;
    var recommendation = getChangeRecommendation(weakest.key);

    return (
      "<div class='assessment-results'>" +
      "<div class='result-hero'>" +
      "<p class='eyebrow'>Change leadership pulse</p>" +
      "<h2>" + label + "</h2>" +
      "<p>Your change leadership score is " + average + "%. The team likely experiences the strongest signal through " + labels[strongest.key] + " and the weakest signal through " + labels[weakest.key] + ".</p>" +
      "</div>" +
      renderScoreCards(scores, labels) +
      "<div class='result-grid'>" +
      "<div class='result-card'><strong>What to protect</strong><p>" + labels[strongest.key] + " is helping you create movement. Keep that visible as change continues.</p></div>" +
      "<div class='result-card'><strong>What to tighten</strong><p>" + labels[weakest.key] + " is the best place to improve next. That is often where quiet resistance begins.</p></div>" +
      "<div class='result-card'><strong>Leadership move</strong><p>Restate the change in plain language, name the owner, and confirm the next checkpoint with the team this week.</p></div>" +
      "<div class='result-card'><strong>What changes results</strong><p>Change gets easier when the team can repeat back what is happening, what stays the same, and what they own next.</p></div>" +
      "</div>" +
      renderRecommendationPanel(recommendation.title, recommendation.intro, recommendation.items) +
      "</div>"
    );
  }

  function renderResults(configKey, scores) {
    if (configKey === "disc") {
      return renderDiscResults(scores);
    }
    if (configKey === "delegation") {
      return renderDelegationResults(scores);
    }
    return renderChangeResults(scores);
  }

  function makeChoices(selectedValue) {
    return (
      "<div class='choice-grid'>" +
      scaleLabels
        .map(function (label, index) {
          var value = index + 1;
          var className = value === selectedValue ? "choice-button is-selected" : "choice-button";
          return (
            "<button type='button' class='" + className + "' data-value='" + value + "'>" +
            "<span>" + value + "</span>" +
            "<span>" + label + "</span>" +
            "</button>"
          );
        })
        .join("") +
      "</div>"
    );
  }

  function renderGate(root, title) {
    root.innerHTML =
      "<div class='assessment-gate'>" +
      "<div class='assessment-gate__card'>" +
      "<p class='eyebrow'>Subscriber unlock</p>" +
      "<h2>Subscribe to open " + title + "</h2>" +
      "<p>The free assessment library is unlocked after you subscribe to the weekly leadership note. Once you do, your access stays open on this device.</p>" +
      "<form class='newsletter-form js-newsletter-form' data-source='assessment-gate' data-success='Assessment unlocked. You can start now.'>" +
      "<label class='sr-only' for='assessment-gate-email'>Email address</label>" +
      "<input id='assessment-gate-email' name='email' type='email' placeholder='Enter your email' autocomplete='email' required>" +
      "<button class='button button-primary' type='submit'>Subscribe and unlock</button>" +
      "<p class='newsletter-note'>You will also get the weekly leadership note.</p>" +
      "<p class='form-message js-form-message' aria-live='polite'></p>" +
      "</form>" +
      "</div>" +
      "</div>";

    if (window.FiveAmShift && window.FiveAmShift.bindNewsletterForms) {
      window.FiveAmShift.bindNewsletterForms(root);
      window.FiveAmShift.syncSubscriberUi(root);
    }
  }

  function mountAssessment(root) {
    var key = root.getAttribute("data-assessment");
    var config = assessments[key];
    if (!config) {
      return;
    }

    var state = {
      index: 0,
      answers: new Array(config.questions.length).fill(null),
      done: false
    };

    function hasSubscriber() {
      return !!(window.FiveAmShift && window.FiveAmShift.getSubscriber && window.FiveAmShift.getSubscriber());
    }

    function refresh() {
      if (!hasSubscriber()) {
        renderGate(root, root.getAttribute("data-title") || "this assessment");
        return;
      }

      if (state.done) {
        var scores = scoreDimensions(config, state.answers);
        root.innerHTML =
          renderResults(key, scores) +
          "<div class='result-actions'>" +
          "<button type='button' class='button button-secondary js-retake'>Retake assessment</button>" +
          "<a class='button button-primary' href='/start-here/'>Browse start-here guides</a>" +
          "</div>";

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

      root.innerHTML =
        "<div class='assessment-stage'>" +
        "<div class='assessment-progress'>" +
        "<div class='article-meta'><span class='pill'>Question " + (state.index + 1) + " of " + config.questions.length + "</span></div>" +
        "<div class='assessment-progress__bar'><span style='width:" + progress + "%'></span></div>" +
        "<p>" + config.intro + "</p>" +
        "</div>" +
        "<div class='question-card'>" +
        "<h2>" + question.text + "</h2>" +
        "<p class='question-card__prompt'>Choose the response that sounds most like you in real leadership situations.</p>" +
        makeChoices(selectedValue) +
        "</div>" +
        "<div class='assessment-actions'>" +
        "<button type='button' class='button button-subtle js-back'" + (state.index === 0 ? " disabled" : "") + ">Back</button>" +
        "<p>" + (selectedValue ? "Selected: " + scaleLabels[selectedValue - 1] : "Choose one option to continue.") + "</p>" +
        "</div>" +
        "</div>";

      root.querySelectorAll(".choice-button").forEach(function (button) {
        button.addEventListener("click", function () {
          var value = parseInt(button.getAttribute("data-value"), 10);
          state.answers[state.index] = value;
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
