"use client";

import { useState } from "react";
import styles from "./page.module.css";

type Settings = { provider: string; providers: string[] };
type Status = { kind: "idle" | "ok" | "error"; text: string };

const ENDPOINT = "/api/settings/email";

export default function EmailSettingsPage() {
  const [token, setToken] = useState("");
  const [settings, setSettings] = useState<Settings | null>(null);
  const [selected, setSelected] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });

  async function call(init?: RequestInit): Promise<Settings | null> {
    setBusy(true);
    try {
      const res = await fetch(ENDPOINT, {
        ...init,
        headers: {
          "content-type": "application/json",
          "x-admin-token": token,
        },
      });
      const body = await res.json();
      if (!res.ok) {
        setStatus({ kind: "error", text: body.error ?? `Error ${res.status}` });
        return null;
      }
      return body as Settings;
    } catch {
      setStatus({ kind: "error", text: "Could not reach the backend." });
      return null;
    } finally {
      setBusy(false);
    }
  }

  async function connect(e: React.FormEvent) {
    e.preventDefault();
    const data = await call();
    if (!data) return;
    setSettings(data);
    setSelected(data.provider);
    setStatus({ kind: "idle", text: "" });
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const data = await call({
      method: "PUT",
      body: JSON.stringify({ provider: selected }),
    });
    if (!data) return;
    setSettings(data);
    setStatus({ kind: "ok", text: `Saved. Emails now go through ${data.provider}.` });
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="title">
        <p className={styles.eyebrow}>Settings / Email</p>
        <h1 id="title" className={styles.title}>
          Email provider
        </h1>

        {!settings ? (
          <form onSubmit={connect} className={styles.form}>
            <label htmlFor="token" className={styles.label}>
              Admin token
            </label>
            <input
              id="token"
              type="password"
              autoComplete="off"
              className={styles.input}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
            <button className={styles.button} disabled={busy || !token}>
              {busy ? "Connecting…" : "Load settings"}
            </button>
          </form>
        ) : (
          <form onSubmit={save} className={styles.form}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.label}>Active provider</legend>
              {settings.providers.map((p) => (
                <label key={p} className={styles.option}>
                  <input
                    type="radio"
                    name="provider"
                    value={p}
                    checked={selected === p}
                    onChange={() => setSelected(p)}
                  />
                  <span>{p}</span>
                  {settings.provider === p && (
                    <span className={styles.badge}>active</span>
                  )}
                </label>
              ))}
            </fieldset>
            <button
              className={styles.button}
              disabled={busy || selected === settings.provider}
            >
              {busy ? "Saving…" : "Save"}
            </button>
          </form>
        )}

        <p
          role="status"
          className={`${styles.status} ${status.kind === "error" ? styles.error : ""} ${status.kind === "ok" ? styles.ok : ""}`}
        >
          {status.text}
        </p>
      </section>
    </main>
  );
}
