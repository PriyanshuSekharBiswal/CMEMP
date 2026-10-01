import { useState } from "react";
import { api } from "../lib/api";
import { Modal, Field } from "./UI";
export function AuthModal({
  onClose,
  onSuccess,
  demoAuth,
}: {
  onClose: () => void;
  onSuccess: () => Promise<void>;
  demoAuth: boolean;
}) {
  const [admin, setAdmin] = useState(false),
    [phone, setPhone] = useState(""),
    [name, setName] = useState(""),
    [password, setPassword] = useState(""),
    [code, setCode] = useState(""),
    [sent, setSent] = useState(false),
    [demoCode, setDemoCode] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      if (admin) {
        await api("/auth/admin", "POST", { phone, password });
        await onSuccess();
        onClose();
      } else if (!sent) {
        const result = await api<{ demoCode: string }>(
          "/auth/otp/request",
          "POST",
          { phone },
        );
        setDemoCode(result.demoCode);
        setSent(true);
      } else {
        await api("/auth/otp/verify", "POST", { phone, name, code });
        await onSuccess();
        onClose();
      }
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal
      title={admin ? "Operations sign in" : "Welcome to CMEMP"}
      onClose={onClose}
    >
      <div className="tabs">
        <button
          className={!admin ? "active" : ""}
          onClick={() => {
            setAdmin(false);
            setError("");
          }}
        >
          Customer
        </button>
        <button
          className={admin ? "active" : ""}
          onClick={() => {
            setAdmin(true);
            setError("");
          }}
        >
          Operations
        </button>
      </div>
      <p className="muted">
        {admin
          ? "Use the admin credentials configured on your server."
          : "Save requests, compare quotations, and follow every delivery."}
      </p>
      <form onSubmit={submit} className="stack">
        <Field label="Mobile number">
          <input
            aria-label="Mobile number"
            inputMode="numeric"
            pattern="[6-9][0-9]{9}"
            maxLength={10}
            required
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setSent(false);
            }}
            placeholder="10-digit mobile number"
            autoComplete="tel-national"
          />
        </Field>
        {!admin && (
          <Field label="Your name">
            <input
              required
              minLength={2}
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Full name"
            />
          </Field>
        )}
        {admin ? (
          <Field label="Password">
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </Field>
        ) : (
          sent && (
            <>
              <div className="notice">
                Local testing: use <strong>{demoCode}</strong>. No SMS was sent.
                This code expires in five minutes.
              </div>
              <Field label="One-time code">
                <input
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Field>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setSent(false);
                  setCode("");
                }}
              >
                Request a new code
              </button>
            </>
          )
        )}
        {!admin && !demoAuth && (
          <div className="notice">
            SMS login is not configured. Enable local OTP testing in the server
            environment to try this MVP.
          </div>
        )}
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <button
          className="button primary"
          disabled={busy || (!admin && !demoAuth)}
        >
          {busy
            ? "Please wait…"
            : admin
              ? "Sign in to operations"
              : sent
                ? "Verify & sign in"
                : "Get a test code"}
        </button>
      </form>
    </Modal>
  );
}
