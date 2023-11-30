export default {
    head: [
      [
        "script",
        {
          src: "https://unpkg.com/@inkeep/widgets-embed@0.2.226/dist/embed.js",
          type: "module",
          defer: true,
        },
      ],
      ["script", { src: "js/addInKeep.js", type: "module", defer: true }],
    ],
  };
  