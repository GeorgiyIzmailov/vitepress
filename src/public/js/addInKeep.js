const inkeepDiv = document.createElement("div");

// Assign it an id of 'inkeep'
inkeepDiv.id = "inkeep";

const isCurrentlyDark = document.documentElement.classList.contains("dark");

// Append it to the body of the document
document.body.appendChild(inkeepDiv);

const inkeepWidget = Inkeep().embed({
  componentType: "ChatButton", // required, options: 'ChatButton', 'EmbeddedChat', 'SearchBar', 'CustomTrigger'
  targetElement: document.getElementById("inkeep"), // required, HTML element to render the widget into
  properties: {
    chatButtonType: "ICON_TEXT", // <-- switch between "Pill" and hot-key rectangular variations
    baseSettings: {
      integrationId: "integrationId", // required
      apiKey: "apiKey", // required
      organizationId: "organizationId", // required
      organizationDisplayName: "VitePress", // your brand display name
      primaryBrandColor: "#000000", // your brand color
      theme: {
        primaryColors: {
          textColorOnPrimary: "#ffffff",
        },
        colorMode: {
          forcedColorMode: isCurrentlyDark ? "dark" : "light",
        },
      },
      //... optional base settings
    },
    aiChatSettings: {
      chatSubjectName: "VitePress", // <-- name of the bot
      botAvatarSrcUrl: "/img/vitepress-logo.svg", // insert your own bot avatar, in public folder or hosted elsewhere.
      quickQuestions: [
        "Can I use rate limiting to avoid filling up the mailbox?",
        "How to logically isolate multiple product lines?",
        "How do I bi-directionally bridge two brokers?",
      ],
      getHelpCallToActions: [
        {
          icon: { builtIn: "IoChatbubblesOutline" },
          name: "Forum",
          url: "https://www.your.io/forum",
        },
        {
          icon: { builtIn: "FaDiscord" },
          name: "Discord",
          url: "https://discord.com",
        },
        {
          icon: { builtIn: "FaSlack" },
          name: "Slack",
          url: "https://your.slack.com",
        },
      ],
    },
    searchSettings: {
      // optional
    },
    modalSettings: {
      // optional
      // openShortcutKey: "L", // <- if you want to chat the trigger button
      areOpenHotKeysDisabled: true, // <- turn of hot key (default to 'k')
      isModeSwitchingEnabled: false, // <- turn off the search mode
    },
  },
});

// <!-- DARK MODE LISTENER -->

// Create a MutationObserver instance
const observer = new MutationObserver((mutationsList, observer) => {
  // Look through all mutations that just occured
  for (let mutation of mutationsList) {
    // If the class attribute was modified
    if (mutation.attributeName === "class") {
      const isDark = mutation.target.classList.contains("dark");
      inkeepWidget.render({
        baseSettings: {
          theme: {
            colorMode: {
              forcedColorMode: isDark ? "dark" : "light",
            },
          },
        },
      });
    }
  }
});

// Start observing the document with the configured parameters
observer.observe(document.documentElement, { attributes: true });
