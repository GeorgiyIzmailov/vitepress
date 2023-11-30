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
    chatButtonType: "ICON_TEXT", // <-- the "Pill" variation
    baseSettings: {
      integrationId: "integrationId", // required
      apiKey: "apiKey", // required
      organizationId: "organizationId", // required
      primaryBrandColor: "#000000", // your brand color, color scheme is derived from this
      theme: {
        primaryColors: {
          textColorOnPrimary: "#ffffff", // the text color used when the background is the primary color
        },
        colorMode: {
          forcedColorMode: isCurrentlyDark ? "dark" : "light",
        },
      },
      //... optional base settings
    },
    aiChatSettings: {
      chatSubjectName: "VitePress", // <-- name of the subject of the chat
      botAvatarSrcUrl: "/img/vitepress-logo.svg", // insert your own bot avatar, in public folder or an absolutely url for externally hosted image
      quickQuestions: [
        "Example question 1?",
        "Example question 2?",
        "Example question 3?",
      ],
      getHelpCallToActions: [
        {
          icon: { builtIn: 'FaSlack' },
          name: 'Slack',
          url: 'https://myorg.slack.com/C010101010',
        },
        {
          icon: { builtIn: 'FaDiscord' },
          name: 'Discord',
          url: 'https://discord.com/invite/invidecode123',
        },
        {
          icon: { builtIn: 'FaGithub' },
          name: 'GitHub',
          url: 'https://github.com/myorg/myrepo/discussions',
        },
      ],
    },
    searchSettings: {
      // optional
    },
    modalSettings: {
      // optional
      // openShortcutKey: "L", // <- if you want to chat the trigger button
      areOpenHotKeysDisabled: true, // <- turn off hot key (default to 'k')
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