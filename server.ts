import express from "express";
import path from "path";
import fs from "fs";
// @ts-expect-error: @types/archiver exposes export=; esbuild supports its ESM default import.
import archiver from "archiver";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", version: "14.6.0" });
  });

  // Download Magisk Module ZIP
  app.get("/api/download-module", (req, res) => {
    res.attachment("Axeron_Pro_Performance.zip");
    
    const archive = archiver("zip", { zlib: { level: 9 } });

    archive.on("error", (err) => {
      res.status(500).send({ error: err.message });
    });

    archive.pipe(res);

    // List of files to include in the ZIP
    const files = [
      "module.prop",
      "service.sh",
      "action.sh",
      "uninstall.sh",
      "customize.sh"
    ];

    files.forEach(file => {
      const filePath = path.join(process.cwd(), file);
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: file });
      }
    });

    archive.finalize();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Axeron Backend Running on http://localhost:${PORT}`);
  });
}

startServer();
